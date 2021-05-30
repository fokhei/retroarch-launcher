import React from "react";
import styled from "styled-components";
import { ExplorerState } from "../states/explorerState";
import { Dispatch } from "redux";

const _SlideBar = (props: SlideBarProps) => {
  const { className } = props;
  return <div className={className}></div>;
};

const SlideBar = styled(_SlideBar)`
  /* display: flex; */
  display: none;
  border-right: 1px solid rgba(0, 0, 0, 0.5);
  width: 48px;
  flex-direction: column;
  align-items: center;
  padding: 10px 5px;
  background-color: rgba(0, 0, 0, 0.3);

`;

interface SlideBarProps {
  className?: string;
  dispatch: Dispatch<any>;
  explorer: ExplorerState;
}

export default SlideBar;
