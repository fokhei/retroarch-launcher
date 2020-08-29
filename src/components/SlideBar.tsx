import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { ExplorerState } from "../states/explorerState";
import { setExplorerConfig } from "../actions/setExplorerConfig";
import { Dispatch } from "redux";

const _SlideBar = (props: SlideBarProps) => {
  const { className, dispatch, explorer } = props;
  const { explorerConfig } = explorer;

  const toggleCategory = () => {
    const next = !explorerConfig.showCategory;
    const config = {
      ...explorerConfig,
      showCategory: next,
    };
    dispatch(setExplorerConfig(config));
  };

  return (
    <div className={className}>
      <a onClick={toggleCategory}>
        <FontAwesomeIcon icon={faBars} />
      </a>
    </div>
  );
};

const SlideBar = styled(_SlideBar)`
  border-right: 1px solid rgba(0, 0, 0, 0.5);
  width: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 5px;
  background-color: rgba(0, 0, 0, 0.3);
  a {
    width: 32px;
    height: 32px;
    text-align: center;
    line-height: 32px;
    color: #666;
    cursor: pointer;
    &:hover {
      color: #17bbaf;
      background-color: rgba(0, 0, 0, 0.3);
    }
  }
`;

interface SlideBarProps {
  className?: string;
  dispatch: Dispatch<any>;
  explorer: ExplorerState;
}

export default SlideBar;
