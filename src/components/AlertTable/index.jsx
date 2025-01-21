import React from 'react';
import { 
  Table, 
  TableContainer, 
  Tbody, 
  Td, 
  Th, 
  Thead, 
  Tr, 
  Badge, 
  Button, 
  Tooltip 
} from "@chakra-ui/react";
import { ViewIcon, CalendarIcon } from "@chakra-ui/icons";

export const AlertTable = ({
  alerts,
  setLastElement,
  setSelectedAlert,
  setIsMetaDataOpen,
  setIsTimelineOpen,
  pageNum
}) => {
  const getSeverityColor = (severity) => {
    const colors = {
      high: "red",
      medium: "orange",
      low: "green"
    };
    return colors[severity] || "gray";
  };

  return (
    <TableContainer bg="white" rounded="xl" shadow="lg" overflowY="auto" maxH="70vh">
      <Table variant="striped" size={{ base: "xs", md: "sm", lg: "md" }}>
        <Thead>
          <Tr>
            <Th>Severity</Th>
            <Th>Ecosystem</Th>
            <Th>Package</Th>
            <Th>Scope</Th>
            <Th>State</Th>
            <Th>Details</Th>
            <Th>Timeline</Th>
          </Tr>
        </Thead>
        <Tbody>
          {alerts.map((alert, index) => (
            <Tr 
              key={index} 
              ref={index === alerts.length - 1 ? setLastElement : null}
            >
              <Td>
                <Badge colorScheme={getSeverityColor(alert.security_advisory.severity)}>
                  {alert.security_advisory.severity.toUpperCase()}
                </Badge>
              </Td>
              <Td>{alert.dependency.package.ecosystem.toUpperCase()}</Td>
              <Td>{alert.dependency.package.name}</Td>
              <Td>{alert.dependency.scope}</Td>
              <Td>
                <Badge
                  colorScheme={
                    alert.state === 'open' ? 'red' :
                    alert.state === 'fixed' ? 'green' : 'gray'
                  }
                >
                  {alert.state.toUpperCase()}
                </Badge>
              </Td>
              <Td>
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
              <Td>
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
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};