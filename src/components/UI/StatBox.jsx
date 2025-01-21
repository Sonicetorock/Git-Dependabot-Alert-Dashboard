import { Stat, StatLabel,StatNumber,StatHelpText,StatArrow,StatGroup,} from "@chakra-ui/react";

import React from "react";

const StatBox = (props) => {
    // requires statLabel, statVal, statIncPercent inside props
  return (
    <>
      {/* <StatGroup> */}
        <Stat margin={5} fontFamily={"Georgia"} fontSize={30} border={1} p={5} borderRadius={10}  bgColor='white' borderColor={"gray.200"}>
          <StatLabel fontSize={18}>{`${props.statLabel}`}</StatLabel>
          <StatNumber>{`${props.statVal}`} </StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            {`${props.statIncPercent}`}%
          </StatHelpText>
        </Stat>

        
      {/* </StatGroup> */}
    </>
  );
};

export default StatBox;
