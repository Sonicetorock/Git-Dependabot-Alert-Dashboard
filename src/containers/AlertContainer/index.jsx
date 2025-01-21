import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Flex, Spinner, Button, Text } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { AlertTable, DetailsModal, TimelineModal } from '../../components/index';
import { FilterModal } from '../index';

export const AlertContainer = () => {
  const [alerts, setAlerts] = useState([]);
  const [filteredAlerts, setFilteredAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNum, setPageNum] = useState(1);
  const [lastElement, setLastElement] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);
  const [isMetaDataOpen, setIsMetaDataOpen] = useState(false);
  const [isDismissedOpen, setIsDismissedOpen] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);

  const getUniqueValues = (key) => {
    if (key === 'scope') {
      return [...new Set(alerts.map(alert => alert.dependency[key]))];
    } else {
      return [...new Set(alerts.map(alert => alert.dependency.package[key]))];
    }
  };

  const filterOptions = {
    severities: [...new Set(alerts.map(alert => alert.security_advisory.severity))],
    ecosystems: getUniqueValues('ecosystem'),
    names: getUniqueValues('name'),
    scopes: getUniqueValues('scope'),
    states: [...new Set(alerts.map(alert => alert.state))]
  };

  const [tempFilters, setTempFilters] = useState({
    severities: [],
    ecosystems: [],
    names: [],
    scopes: [],
    states: []
  });

  const [activeFilters, setActiveFilters] = useState({
    severities: [],
    ecosystems: [],
    names: [],
    scopes: [],
    states: []
  });

  const observer = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting && hasMore) {
        setPageNum((no) => no + 1);
      }
    })
  );

  const fetchAlerts = async (filters = {}, page = 1) => {
    setLoading(true);
    try {
      const params = {
        page,
        per_page: 10,
        ...filters
      };

      const response = await axios.get(
        `https://api.github.com/repos/${import.meta.env.VITE_GITHUB_REPO_OWNER}/${import.meta.env.VITE_GITHUB_REPO_NAME}/dependabot/alerts`,
        {
          headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN_DEV}`,
            "X-GitHub-Api-Version": "2022-11-28"
          },
          params
        }
      );

      if (page === 1) {
        setAlerts(response.data);
        setFilteredAlerts(response.data);
      } else {
        setAlerts(prev => [...prev, ...response.data]);
        setFilteredAlerts(prev => [...prev, ...response.data]);
      }

      if (response.data.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching alerts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts(activeFilters, pageNum);
  }, [pageNum, activeFilters]);

  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement]);

  const openFilterModal = () => {
    setTempFilters({ ...activeFilters });
    setIsFilterModalOpen(true);
  };

  const applyFilters = () => {
    setActiveFilters({ ...tempFilters });
    setPageNum(1);
    setHasMore(true);
    setIsFilterModalOpen(false);
  };

  const handleFilterChange = (filterType, value) => {
    setTempFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
    }));
  };

  return (
    <Flex direction="column" w="full" p={4}>
      <Flex justify="end" mb={4}>
        <Button 
          onClick={openFilterModal}
          leftIcon={<Search2Icon className="w-4 h-4" />}
          bgColor="teal.200"
          _hover={{ bg: 'teal.300' }}
        >
          Filters
        </Button>
      </Flex>

      {/* {loading && pageNum === 1 ? (
        <Flex justify="center" align="center" w="100%" h="100%">
          <Spinner size="xl" color="teal.200" emptyColor="teal.600"/>
        </Flex>
      ) : ( */}
        <>
          <AlertTable 
            loading={loading}
            pageNum={pageNum}
            alerts={filteredAlerts} 
            setLastElement={setLastElement}
            setSelectedAlert={setSelectedAlert}
            setIsMetaDataOpen={setIsMetaDataOpen}
            setIsTimelineOpen={setIsTimelineOpen}
            setIsDismissedOpen={setIsDismissedOpen}
          />

          <FilterModal
            isOpen={isFilterModalOpen}
            onClose={() => setIsFilterModalOpen(false)}
            filterOptions={filterOptions}
            tempFilters={tempFilters}
            handleFilterChange={handleFilterChange}
            applyFilters={applyFilters}
          />

          <DetailsModal
            isMetaDataOpen={isMetaDataOpen}
            setIsMetaDataOpen={() => setIsMetaDataOpen(false)}
            selectedAlert={selectedAlert}
          />

          <TimelineModal 
            isTimelineOpen={isTimelineOpen}
            setIsTimelineOpen={setIsTimelineOpen}
            selectedAlert={selectedAlert}
          />
        </>
      {/* )} */}
      {loading && pageNum > 1 && (
        <Text textAlign="center">Loading more alerts...</Text>
      )}
    </Flex>
  );
};