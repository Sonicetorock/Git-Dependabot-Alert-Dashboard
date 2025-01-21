import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, Button, VStack } from "@chakra-ui/react";
import { FilterComponent } from '../../components/index';

export const FilterModal = ({ isOpen, onClose, filterOptions, tempFilters, handleFilterChange, applyFilters }) => {
  const getSeverityColor = (severity) => {
    const colors = {
      high: "red",
      medium: "orange",
      low: "green"
    };
    return colors[severity] || "gray";
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={{base : "xs", md: "md", lg: "lg" }} isCentered scrollBehavior='inside'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Filter Security Alerts</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={3} align="stretch">
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
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={applyFilters}>
            Apply Filters
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
