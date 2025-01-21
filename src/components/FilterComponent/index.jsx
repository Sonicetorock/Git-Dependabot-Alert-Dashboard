import React from 'react';
import { Box, Checkbox, Divider, Text, Wrap, WrapItem, Badge } from "@chakra-ui/react";

export const FilterComponent = ({ title, options, selectedOptions, handleChange, getColor }) => (
  <>
  <Box>
    <Text fontWeight="semibold" mb={2} fontSize={{ base: "sm", md: "md" }}>{title}</Text>
    <Wrap spacing={4}>
      {options.map((option) => (
        <WrapItem key={option}>
          <Checkbox
            isChecked={selectedOptions.includes(option)}
            onChange={() => handleChange(option)}
          >
            {getColor ? (
              <Badge colorScheme={getColor(option)} fontSize={{ base: "xs", md: "sm" }}>
                {option.toUpperCase()}
              </Badge>
            ) : (
              option
            )}
          </Checkbox>
        </WrapItem>
      ))}
    </Wrap>
  </Box>
    <Divider />
  </>
);

