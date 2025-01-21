import React from "react";
import { Flex } from "@chakra-ui/react";

import { AlertContainer ,HeaderContainer} from "../../containers/index";

export const MainView = ({activeRepoNumber, repo}) => {
  return (
    <>
      <Flex
        w={{ base: "100%", md: "85%" }}
        h="100vh"
        bg="gray.200"
        flexDirection="column"
        alignItems="start"
        p={{ base: 2, md: 4 }}
      >
        <HeaderContainer/>
        <AlertContainer activeRepoNumber={activeRepoNumber}
            repo={repo}/>
      </Flex>
    </>
  );
};
