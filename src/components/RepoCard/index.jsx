import { ArrowRightIcon } from '@chakra-ui/icons'
import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

export const RepoCard = ({repo, index, activeRepoNumber, setActiveRepoNumber}) => {
  return (
    <>
       <Box
                key={index}
                margin={{ base: "2% 3%", md: "3% 4%" }}
                padding={{ base: "2%", md: "3%" }}
                cursor="pointer"
                bgColor={"teal.200"}
                _hover={{ bg: "teal.500", color: "black" }}
                rounded={5}
                boxShadow="md"
                onClick={() => setActiveRepoNumber(index)}
              >
                <Flex align="center">
                  <Text
                    w="90%"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    color="black.500"
                    fontSize={{ base: "sm", md: "md", lg: "lg" }}
                    fontFamily="Georgia"
                  >
                    Repo {index}
                  </Text>
                  {index === activeRepoNumber ? <ArrowRightIcon marginLeft="2%" /> : null}
                </Flex>
              </Box>
    </>
  )
}


