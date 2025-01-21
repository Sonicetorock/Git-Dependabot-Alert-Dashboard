import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

import React from "react";

const CircularProgress = ({props}) => {
    // requires value, color, thickness, size, label of circular bar inside props
  return (
    <>
      <CircularProgress value={`${props.value }`} color={`${props.color}`} thickness={`${props.thickness}`} size={`${props.size}`}>
        <CircularProgressLabel>{`${props.label}`}%</CircularProgressLabel>
      </CircularProgress>
    </>
  );
};

export default CircularProgress;
