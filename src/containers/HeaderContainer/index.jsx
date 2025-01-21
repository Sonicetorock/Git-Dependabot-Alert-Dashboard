import { Box, Text } from '@chakra-ui/react'
import React from 'react'

export const HeaderContainer = () => {
  return (
    <Box margin="1%" w="100%">
                <Text
                  color="black"
                  fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                  fontFamily="Georgia"
                  fontWeight={600}
                  margin="1%"
                  textAlign="center"
                >
                  Git Dependabot Alerts for CAI Stack
                </Text>
    </Box>
  )
}

