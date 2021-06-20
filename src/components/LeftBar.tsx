import React from "react";
import styled from "styled-components";
import { ExplorerState } from "../states/explorerState";
import { Dispatch } from "redux";

const _LeftBar = (props: LeftBarProps) => {
  const { className } = props;
  return <div className={className}></div>;
};

const LeftBar = styled(_LeftBar)`
  display: none;
  border-right: 1px solid rgba(0, 0, 0, 0.5);
  width: 48px;
  flex-direction: column;
  align-items: center;
  padding: 10px 5px;
  background-color: rgba(0, 0, 0, 0.3);

`;

interface LeftBarProps {
  className?: string;
  dispatch: Dispatch<any>;
  explorer: ExplorerState;
}

export default LeftBar;
