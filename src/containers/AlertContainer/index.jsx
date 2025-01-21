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
  // for infite scrolling
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

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${import.meta.env.VITE_GITHUB_REPO_OWNER}/${import.meta.env.VITE_GITHUB_REPO_NAME}/dependabot/alerts`,
        {
          headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN_DEV}`,
            "X-GitHub-Api-Version": "2022-11-28"
          },
          params: {
            page: pageNum,
            per_page: 7
          }
        }
      );
      
      if (pageNum === 1) {
        // For first page, just set the data
        setAlerts(response.data);
        setFilteredAlerts(response.data);
      } else {
        // For subsequent pages, append data
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
    fetchAlerts();
  }, [pageNum]);

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

  useEffect(() => {
    const filtered = alerts.filter(alert => {
      return (
        (activeFilters.severities.length === 0 || activeFilters.severities.includes(alert.security_advisory.severity)) &&
        (activeFilters.ecosystems.length === 0 || activeFilters.ecosystems.includes(alert.dependency.package.ecosystem)) &&
        (activeFilters.names.length === 0 || activeFilters.names.includes(alert.dependency.package.name)) &&
        (activeFilters.scopes.length === 0 || activeFilters.scopes.includes(alert.dependency.scope)) &&
        (activeFilters.states.length === 0 || activeFilters.states.includes(alert.state))
      );
    });
    setFilteredAlerts(filtered);
  }, [activeFilters, alerts]);

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

      {loading && pageNum === 1 ? (
        <Flex justify="center" align="center" w="100%" h="100%">
          <Spinner size="xl" color="teal.200" emptyColor="teal.600"/>
        </Flex>
      ) : (
        <>
          <AlertTable 
            alerts={filteredAlerts} 
            setLastElement={setLastElement}
            setSelectedAlert={setSelectedAlert}
            setIsMetaDataOpen={setIsMetaDataOpen}
            setIsTimelineOpen={setIsTimelineOpen}
            setIsDismissedOpen={setIsDismissedOpen}
            pageNum={pageNum}
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
      )}
      {loading && pageNum > 1 && (
        <Text textAlign="center">Loading more alerts...</Text>
      )}
    </Flex>
  );
};