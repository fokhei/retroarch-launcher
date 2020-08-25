import React from "react";
import styled from "styled-components";
const svg = require("../assets/busy.svg").default;

const _BusyIcon = (props: BusyIconProps) => {
  let className = `BusyIcon ${props.className}`;
  return <img className={className} src={svg} />;
};

const BusyIcon = styled(_BusyIcon)`
  width: 32px;
  height: 32px;
  opacity: 0.3;
`;

interface BusyIconProps {
  className?: string;
}

export default BusyIcon;
