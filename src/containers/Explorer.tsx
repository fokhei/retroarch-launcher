import React, { useEffect } from "react";
import styled from "styled-components";
import CategoryMenu from "../components/CategoryMenu";
import { ExplorerState } from "../states/explorerState";
import { Dispatch } from "redux";
import { AppConfigState } from "../states/appConfigState";
import { RootState } from "../states";
import { connect } from "react-redux";
import { GameItemState } from "../states/gameItemState";
import { search } from "../actions/search";
import ResultView from "../components/ResultView";
import RightBar from "../components/RightBar";
import { FavourState } from "../states/favourState";
import { ItemFilter } from "../interfaces/itemFilter";

const _Explorer = (props: ExplorerProps) => {
  const { className, dispatch, appConfig, gameItem, explorer, favour } = props;
  const { itemFilter } = gameItem;

  const onSearch = (itemFilter: ItemFilter) => {
    dispatch(search(itemFilter, gameItem, favour));
  };

  const renderCategoryMenu = () => {
    return (
      <CategoryMenu
        appConfig={appConfig}
        gameItem={gameItem}
        searchHandler={onSearch}
      />
    );
  };

  const renderSearchResult = () => {
    return (
      <ResultView
        dispatch={dispatch}
        explorer={explorer}
        gameItem={gameItem}
        appConfig={appConfig}
        favour={favour}
      />
    );
  };

  const renderRightBar = () => {
    return (
      <RightBar
        dispatch={dispatch}
        appConfig={appConfig}
        explorer={explorer}
        gameItem={gameItem}
      />
    );
  };

  const mountEffect = () => {
    dispatch(search(itemFilter, gameItem, favour));
  };

  useEffect(mountEffect, []);

  return (
    <div className={className}>
      {renderCategoryMenu()}
      {renderSearchResult()}
      {renderRightBar()}
    </div>
  );
};

const Explorer = styled(_Explorer)`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: row;
`;

interface ExplorerProps {
  className?: string;
  dispatch: Dispatch<any>;
  appConfig: AppConfigState;
  gameItem: GameItemState;
  explorer: ExplorerState;
  favour: FavourState;
}

const mapStateToProps = (state: RootState) => {
  return {
    appConfig: state.appConfig,
    gameItem: state.gameItem,
    explorer: state.explorer,
    favour: state.favour,
  };
};

export default connect(mapStateToProps)(Explorer);
