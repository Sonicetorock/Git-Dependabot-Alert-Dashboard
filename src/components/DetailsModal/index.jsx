import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  Button,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  Text,
} from "@chakra-ui/react";
import React from "react";

export const DetailsModal = ({
  isMetaDataOpen,
  setIsMetaDataOpen,
  selectedAlert,
}) => {
  return (
    <Modal
      isOpen={isMetaDataOpen}
      onClose={() => setIsMetaDataOpen(false)}
      size={{ base: "xs", md: "md", lg: "lg" }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize={{ base: "md", md: "lg" }}>
          Security Advisory Details
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {selectedAlert && (
            <VStack align="stretch" spacing={4}>
              <Box>
                <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>
                  GHSA ID
                </Text>
                <Text fontSize={{ base: "sm", md: "md" }}>
                  {selectedAlert.security_advisory.ghsa_id}
                </Text>
              </Box>
              <Box>
                <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>
                  CVE ID
                </Text>
                <Text fontSize={{ base: "sm", md: "md" }}>
                  {selectedAlert.security_advisory.cve_id}
                </Text>
              </Box>
              <Box>
                <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>
                  Package
                </Text>
                <Text fontSize={{ base: "sm", md: "md" }}>
                  {selectedAlert.dependency.package.ecosystem}/
                  {selectedAlert.dependency.package.name}
                </Text>
              </Box>
            </VStack>
          )}
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setIsMetaDataOpen(false)}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
