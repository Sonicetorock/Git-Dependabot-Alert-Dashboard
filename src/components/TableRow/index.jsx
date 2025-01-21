import { CalendarIcon, ViewIcon } from '@chakra-ui/icons';
import { Badge, Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Td, Tooltip, Tr, VStack } from '@chakra-ui/react';
import React from 'react'

export const TableRow = ({
    alert,
    index,
    getSeverityColor,
    setIsDismissedOpen,
    setIsMetaDataOpen,
    setIsTimelineOpen,
    setSelectedAlert,
    isDismissedOpen,
    selectedAlert,
}) => {
  return (
    <Tr key={index}>
    <Td fontSize={{ base: "sm", md: "md" }}>
      <Badge colorScheme={getSeverityColor(alert.security_advisory.severity)}>
        {alert.security_advisory.severity.toUpperCase()}
      </Badge>
    </Td>
    <Td fontSize={{ base: "sm", md: "md" }}>{alert.dependency.package.ecosystem.toUpperCase()}</Td>
    <Td fontSize={{ base: "sm", md: "md" }}>{alert.dependency.package.name}</Td>
    <Td fontSize={{ base: "sm", md: "md" }}>{alert.dependency.scope}</Td>
    <Td fontSize={{ base: "sm", md: "md" }}>
      <Badge
        colorScheme={alert.state === 'open' ? 'red' : 
                  alert.state === 'fixed' ? 'green' : 'gray'}
        cursor={alert.state === 'dismissed' ? 'pointer' : 'default'}
        onClick={() => {
          if (alert.state === 'dismissed') {
            setSelectedAlert(alert);
            setIsDismissedOpen(true);
          }
        }}
      >
        {alert.state.toUpperCase()}
      </Badge>
      {/* dismiss model */}
      <Modal isOpen={isDismissedOpen} onClose={() => setIsDismissedOpen(false)} size={{ base: "xs", md: "md", lg: "lg" }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={{ base: "md", md: "lg" }}>Dismissed Alert</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            {selectedAlert && (
              <VStack align="stretch" spacing={4}>
                <Box>
                  <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>Dismissed By</Text>
                  <Text fontSize={{ base: "sm", md: "md" }}>{selectedAlert.dismissed_by?.login}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>Reason</Text>
                  <Text fontSize={{ base: "sm", md: "md" }}>{selectedAlert?.dismissed_reason}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>Comment</Text>
                  <Text fontSize={{ base: "sm", md: "md" }}>{selectedAlert?.dismissed_comment}</Text>
                </Box>
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setIsDismissedOpen(false)}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Td>
    <Td fontSize={{ base: "sm", md: "md" }}>
      <Tooltip label="View Details">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            setSelectedAlert(alert);
            setIsMetaDataOpen(true);
          }}
        >
          <ViewIcon />
        </Button>
      </Tooltip>
    </Td>
    <Td fontSize={{ base: "sm", md: "md" }}>
      <Tooltip label="View Timeline">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            setSelectedAlert(alert);
            setIsTimelineOpen(true);
          }}
        >
          <CalendarIcon />
        </Button>
      </Tooltip>
    </Td>
  </Tr>
)
}

