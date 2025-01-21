import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalFooter, ModalOverlay, VStack, Box, Text } from '@chakra-ui/react';
import React from 'react';

export const TimelineModal = ({ isTimelineOpen, setIsTimelineOpen, selectedAlert }) => {
  return (
    <Modal isOpen={isTimelineOpen} onClose={() => setIsTimelineOpen(false)} size={{ base: "xs", md: "md", lg: "lg" }}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize={{ base: "md", md: "lg" }}>Alert Timeline</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {selectedAlert && (
            <VStack align="stretch" spacing={4}>
              <Box>
                <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>Published</Text>
                <Text fontSize={{ base: "sm", md: "md" }}>{new Date(selectedAlert.security_advisory.published_at).toLocaleDateString()}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>Last Updated</Text>
                <Text fontSize={{ base: "sm", md: "md" }}>{new Date(selectedAlert.security_advisory.updated_at).toLocaleDateString()}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>Fixed</Text>
                <Text fontSize={{ base: "sm", md: "md" }}>{selectedAlert.fixed_at ? new Date(selectedAlert.fixed_at).toLocaleDateString() : 'Not fixed'}</Text>
              </Box>
            </VStack>
          )}
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setIsTimelineOpen(false)}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

