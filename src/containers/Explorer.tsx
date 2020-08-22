import React, { useEffect } from "react";
import styled from "styled-components";
import CategoryMenu from "../components/CategoryMenu";
import lazy from "lazy.js";
import { ExplorerState } from "../states/explorerState";
import { Dispatch } from "redux";
import { AppConfigState } from "../states/appConfigState";
import { RootState } from "../states";
import { connect } from "react-redux";
import { GameItemState } from "../states/gameItemState";
import { search } from "../actions/search";
import { setCategoryName } from "../actions/setCategoryName";
import { setKeyword } from "../actions/setKeyword";
import ResultView from "../components/ResultView";
import RightBar from "../components/RightBar";

const _Explorer = (props: ExplorerProps) => {
  const { className, dispatch, appConfig, gameItem, explorer } = props;

  const categoryNameHandler = (
    categoryName: string,
    subCategoryName?: string
  ) => {
    dispatch(setCategoryName(categoryName, subCategoryName));
    dispatch(search(categoryName, subCategoryName, explorer.keyword));
  };

  const keywordHandler = (keyword: string) => {
    dispatch(setKeyword(keyword));
    dispatch(search(explorer.categoryName, explorer.subCategoryName, keyword));
  };

  const renderCategoryMenu = () => {
    const categoryNames = lazy(appConfig.categories)
      .sort()
      .pluck("name")
      .toArray();
    return (
      <CategoryMenu
        categoryNames={categoryNames}
        categoryName={explorer.categoryName}
        categoryNameHandler={categoryNameHandler}
        keyword={explorer.keyword}
        keywordHandler={keywordHandler}
        subCategories={gameItem.subCategories}
        subCategoryName={explorer.subCategoryName}
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
    dispatch(
      search(explorer.categoryName, explorer.subCategoryName, explorer.keyword)
    );
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
}

const mapStateToProps = (state: RootState) => {
  return {
    appConfig: state.appConfig,
    gameItem: state.gameItem,
    explorer: state.explorer,
  };
};

export default connect(mapStateToProps)(Explorer);
