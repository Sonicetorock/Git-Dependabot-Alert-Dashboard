import React, { useState, useEffect, useRef } from 'react';
import { 
  Box,
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  Badge,
  VStack,
  Divider,
  Wrap,
  WrapItem,
  Spinner,
  Checkbox,
} from "@chakra-ui/react";
import { ViewIcon, CalendarIcon, Search2Icon } from "@chakra-ui/icons";
import { DetailsModal, FilterComponent, TableRow, TimelineModal } from '../index';
import axios from 'axios';

const TOTAL_PAGES = 3;

const Content_repo = () => {
  const [alerts, setAlerts] = useState([]);
  const [filteredAlerts, setFilteredAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNum, setPageNum] = useState(1);
  const [lastElement, setLastElement] = useState(null);

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);
  const [isMetaDataOpen, setIsMetaDataOpen] = useState(false);
  const [isDismissedOpen, setIsDismissedOpen] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);

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
      if (first.isIntersecting) {
        setPageNum((no) => no + 1);
      }
    })
  );

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.github.com/repos/${import.meta.env.VITE_GITHUB_REPO_OWNER}/${import.meta.env.VITE_GITHUB_REPO_NAME}/dependabot/alerts`, {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN_DEV}`,
          "X-GitHub-Api-Version": "2022-11-28"
        },
        params: {
          page: pageNum,
          per_page: 25
        }
      });
      setAlerts((prev) => [...new Set([...prev, ...response.data])]);
      setFilteredAlerts((prev) => [...new Set([...prev, ...response.data])]);
    } catch (error) {
      console.error("Error fetching alerts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (pageNum <= TOTAL_PAGES) {
      fetchAlerts();
    }
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

  // uniques
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

  const openFilterModal = () => {
    setTempFilters({...activeFilters});
    setIsFilterModalOpen(true);
  };

  const applyFilters = () => {
    setActiveFilters({...tempFilters});
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

  const getSeverityColor = (severity) => {
    const colors = {
      high: "red",
      medium: "orange",
      low: "green"
    };
    return colors[severity] || "gray";
  };

  return (
    <Flex
      width={{ base: "100%", md: "100%" }}
      direction="column"
      maxW="1400px"
      justifyContent="center"
      mx="auto"
      h="85vh"
      p={{ base: 2, md: 4 }}
    >
      {/* Header */}
      <Flex justify="space-between" align="center" mb={6}>
        <Text fontSize={{ base: "lg", md: "2xl" }} fontWeight="bold">
          Security Alerts
        </Text>
        <Button
          leftIcon={<Search2Icon />}
          colorScheme="blue"
          onClick={openFilterModal}
        >
          Filters
        </Button>
      </Flex>

      {loading ? (
        <Flex justify="center" align="center" w="100%" h="100%">
          <Spinner size="xl" color='teal.200' emptyColor='teal.600'/>
        </Flex>
      ) : (
        <>
          {/* Filter Modal */}
          <Modal
            isOpen={isFilterModalOpen}
            onClose={() => setIsFilterModalOpen(false)}
            size={{ base: "xs", md: "md", lg: "lg" }}
            blockScrollOnMount //deafult will be blocked
            closeOnOverlayClick //by deafult clicking on overlay closes our modal
            scrollBehavior='inside' //by default it is outside - entire modal will be moving
          >
            <ModalOverlay backdropFilter="blur(5px)" /> {/* backdropFilter is used to blur the background */}
            <ModalContent>
              <ModalHeader fontSize={{ base: "md", md: "lg" }}>Filter Security Alerts</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <VStack spacing={2} align="stretch">
                  <FilterComponent
                    title="Severity"
                    options={filterOptions.severities}
                    selectedOptions={tempFilters.severities}
                    handleChange={(value) => handleFilterChange('severities', value)}
                    getColor={getSeverityColor}
                  />
                  <FilterComponent
                    title="Ecosystem"
                    options={filterOptions.ecosystems}
                    selectedOptions={tempFilters.ecosystems}
                    handleChange={(value) => handleFilterChange('ecosystems', value)}
                  />
                  <FilterComponent
                    title="State"
                    options={filterOptions.states}
                    selectedOptions={tempFilters.states}
                    handleChange={(value) => handleFilterChange('states', value)}
                  />
                  <FilterComponent
                    title="Scope"
                    options={filterOptions.scopes}
                    selectedOptions={tempFilters.scopes}
                    handleChange={(value) => handleFilterChange('scopes', value)}
                  />
                  <FilterComponent
                    title="Name"
                    options={filterOptions.names}
                    selectedOptions={tempFilters.names}
                    handleChange={(value) => handleFilterChange('names', value)}
                  />
                </VStack>
              </ModalBody>
              <ModalFooter>
                <Button variant="ghost" mr={3} onClick={() => setIsFilterModalOpen(false)}>
                  Cancel
                </Button>
                <Button colorScheme="blue" onClick={applyFilters}>
                  Apply Filters
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          {/* Table */}
          <TableContainer bg="white" rounded="xl" shadow="lg" overflowY="auto" minH="70vh" height="80%">
            <Table variant="striped" > 
              <Thead>
                <Tr>
                  <Th fontSize={{ base: "sm", md: "md" }}>Severity</Th>
                  <Th fontSize={{ base: "sm", md: "md" }}>Ecosystem</Th>
                  <Th fontSize={{ base: "sm", md: "md" }}>Package</Th>
                  <Th fontSize={{ base: "sm", md: "md" }}>Scope</Th>
                  <Th fontSize={{ base: "sm", md: "md" }}>State</Th>
                  <Th fontSize={{ base: "sm", md: "md" }}>Details</Th>
                  <Th fontSize={{ base: "sm", md: "md" }}>Timeline</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredAlerts.length > 0 ? (
                  filteredAlerts.map((alert, index) => (
                    index === filteredAlerts.length - 1 && pageNum <= TOTAL_PAGES ? (
                      <div key={index} ref={setLastElement}>
                        <TableRow 
                          alert={alert}
                          index={index}
                          getSeverityColor={getSeverityColor}
                          setIsDismissedOpen={setIsDismissedOpen}
                          setIsMetaDataOpen={setIsMetaDataOpen}
                          setIsTimelineOpen={setIsTimelineOpen}
                          setSelectedAlert={setSelectedAlert}
                          isDismissedOpen={isDismissedOpen}
                          selectedAlert={selectedAlert}
                        />
                      </div>
                    ) : (
                      <TableRow 
                        key={index}
                        alert={alert}
                        index={index}
                        getSeverityColor={getSeverityColor}
                        setIsDismissedOpen={setIsDismissedOpen}
                        setIsMetaDataOpen={setIsMetaDataOpen}
                        setIsTimelineOpen={setIsTimelineOpen}
                        setSelectedAlert={setSelectedAlert}
                        isDismissedOpen={isDismissedOpen}
                        selectedAlert={selectedAlert}
                      />
                    )
                  ))
                ) : (
                  <Flex w="100%" h="100%" align="center" justify="center" m={5} pl={5} bg="gray.100">
                    <Text fontWeight="semibold" color="gray.500">
                      No alerts found
                    </Text>
                  </Flex>
                )}
              </Tbody>
            </Table>
          </TableContainer>

          {/* Details Modal */}
          <DetailsModal
            isMetaDataOpen={isMetaDataOpen}
            setIsMetaDataOpen={setIsMetaDataOpen}
            selectedAlert={selectedAlert}
          />

          {/* Timeline Modal */}
          <TimelineModal 
            isTimelineOpen={isTimelineOpen}
            setIsTimelineOpen={setIsTimelineOpen}
            selectedAlert={selectedAlert}
          />
        </>
      )}
    </Flex>
  );
};

export default Content_repo;