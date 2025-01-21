import React, { useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Content from "./components/content/Content_repo";
import { Box, Flex, Text } from "@chakra-ui/react";
import { AlertContainer } from "./containers/index";
import { MainView, SideView } from "./views";
// import { mainView, sideView } from "./views";

function App() {
  const initialRepoArrState = ["repo1", "repo2", "repo3", "repo4", "repo5"];
  const [activeRepoNumber, setActiveRepoNumber] = useState(0);
  return (
    <>
      <Flex align="center" justify="center" overflow="hidden" h="100vh" w="100%">
        {/* <SideView setActiveRepoNumber={setActiveRepoNumber}
          activeRepoNumber={activeRepoNumber}
          initialRepoArrState={initialRepoArrState}/> */}
        <Sidebar
          setActiveRepoNumber={setActiveRepoNumber}
          activeRepoNumber={activeRepoNumber}
          initialRepoArrState={initialRepoArrState}
        />

        <MainView activeRepoNumber={activeRepoNumber}
            repo={initialRepoArrState[activeRepoNumber]} // may be name or id smtg
        />
      </Flex>
    </>
  );
}

export default App;
