import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from "@chakra-ui/react";
import { FilterComponent } from '../FilterComponent';

export const FilterModal = ({ isOpen, onClose, filterOptions, tempFilters, handleFilterChange, applyFilters }) => {
  const getColor = (option) => {
    const colors = {
      high: "red",
      medium: "orange",
      low: "green",
      critical: "purple"
    };
    return colors[option] || "gray";
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Filter Alerts</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FilterComponent
            title="Severities"
            options={filterOptions.severities}
            selectedOptions={tempFilters.severities}
            handleChange={(value) => handleFilterChange('severities', value)}
            getColor={getColor}
          />
          <FilterComponent
            title="Ecosystems"
            options={filterOptions.ecosystems}
            selectedOptions={tempFilters.ecosystems}
            handleChange={(value) => handleFilterChange('ecosystems', value)}
          />
          <FilterComponent
            title="Names"
            options={filterOptions.names}
            selectedOptions={tempFilters.names}
            handleChange={(value) => handleFilterChange('names', value)}
          />
          <FilterComponent
            title="Scopes"
            options={filterOptions.scopes}
            selectedOptions={tempFilters.scopes}
            handleChange={(value) => handleFilterChange('scopes', value)}
          />
          <FilterComponent
            title="States"
            options={filterOptions.states}
            selectedOptions={tempFilters.states}
            handleChange={(value) => handleFilterChange('states', value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={() => applyFilters(tempFilters)}>
            Apply
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
