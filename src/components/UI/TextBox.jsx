import { Stat, StatLabel,StatNumber,StatHelpText,StatArrow,StatGroup,} from "@chakra-ui/react";

import React from "react";

const TextBox = (props) => {
    // requires statLabel, statVal, statIncPercent inside props
  return (
    <>
      {/* <StatGroup> */}
        <Stat margin={3} fontFamily={"Georgia"} fontSize={20} border={1} p={3} borderRadius={10}  bgColor={"gray.300"} borderColor={"gray.400"} boxShadow={'xs'}>
          <StatLabel fontSize={15}>{`${props.label}`}</StatLabel>
          <StatLabel fontSize={13} fontWeight={700}>{`${props.txt}`} </StatLabel>
        </Stat>

        
      {/* </StatGroup> */}
    </>
  );
};

export default TextBox;
