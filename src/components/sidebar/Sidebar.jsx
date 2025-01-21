import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import {  HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import BreadCrumb from "../UI/BreadCrumb";
import { RepoCard } from "../RepoCard";

const Sidebar = ({ setActiveRepoNumber, activeRepoNumber, initialRepoArrState }) => {
  const [repoArray, setRepoArray] = useState(initialRepoArrState);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Flex
        flexDir="column"
        w={{ base: isSidebarOpen ? "30%" : "0%", md: "25%" }}
        h="100vh"
        boxShadow="lg"
        p={1}
        opacity={0.9}
        bgColor={"teal.300"}
        position={{ base: "fixed", md: "relative" }}
        zIndex={10}
        transition="width 0.3s ease"
        left={0}
      >
        <IconButton
          icon={ <HamburgerIcon />}
          onClick={() => setIsSidebarOpen(true)}
          display={{ base: isSidebarOpen ? "none" : "block", md: "none" }}
          position="absolute"
          top={1}
          left={2}
          zIndex={20}
        />
        <Box display={{ base: isSidebarOpen ? "block" : "none", md: "block" }} w="100%">
          <BreadCrumb props={['Org', `Repo ${activeRepoNumber}`]} />
          <Text
            color="black"
            fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
            fontFamily="Georgia"
            margin={{ base: "5% 2%", md: "10% 5%" }}
          >
            Repos:
          </Text>
          <Box
            overflowY="auto"
            __css={{
              '&::-webkit-scrollbar': {
                width: '4px',
              },
              '&::-webkit-scrollbar-track': {
                width: '6px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: 'gray',
                borderRadius: '24px',
              },
            }}
          >
            {repoArray.map((repo, index) => (
              <RepoCard 
                  key={repo}
                  repo={repo}
                  index={index} 
                  activeRepoNumber={activeRepoNumber}
                  setActiveRepoNumber={setActiveRepoNumber}
              />
            ))}
          </Box>
          {isSidebarOpen && <IconButton 
            icon={<CloseIcon />}
            onClick={() => setIsSidebarOpen(false)}
            display={
              {
                base: isSidebarOpen ? "block" : "none",
                md: "none"
              }
            }
            >
              Close
          </IconButton>}
        </Box>
      </Flex>
    </>
  );
};

export default Sidebar;
