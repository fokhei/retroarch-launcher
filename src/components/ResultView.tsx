import React from "react";
import styled from "styled-components";
import { ContextMenuTrigger } from "react-contextmenu";
import { ResultLayout } from "../interfaces/ResultLayout";
import { ContextMenuId } from "../contextMenus/ContextMenuId";
import { ExplorerState } from "../states/explorerState";
import { GameItemState } from "../states/gameItemState";
import { Dispatch } from "redux";
import { setExplorerConfig } from "../actions/setExplorerConfig";
import { getComputedItem } from "../libs/getComputedItem";
import ResultList from "./ResultList";
import ResultGrid from "./ResultGrid";
import ThumbnailDownloader from "./ThumbnailDownloader";
import { GameNameTriggerProps } from "../contextMenus/GameNameContextMenu";
import { setPlayerPicker } from "../actions/setPlayerPicker";
import { clipboard } from "electron";
import { getCategory } from "../libs/getCategory";
import { AppConfigState } from "../states/appConfigState";
import { play } from "../externalApps/play";
import { FavourState } from "../states/favourState";
import { SearchResultTriggerProps } from "../contextMenus/SearchResultContextMenu";

const _ResultView = (props: ResultViewProps) => {
  const { className, dispatch, explorer, gameItem, appConfig, favour } = props;
  const { explorerConfig } = explorer;
  const { layout, gridSize, selectedItemId } = explorerConfig;

  const { itemsMap, itemFilter, searchResults } = gameItem;
  const { categoryName } = itemFilter;
  const item = getComputedItem(itemsMap, selectedItemId);

  const onLayoutChange = (evt: any) => {
    const layout = evt.target.value as ResultLayout;
    const config = {
      ...explorerConfig,
      layout,
    };
    dispatch(setExplorerConfig(config));
  };

  const onSliderChange = (evt: any) => {
    const gridSize = Number(evt.target.value);
    const config = {
      ...explorerConfig,
      gridSize,
    };
    dispatch(setExplorerConfig(config));
  };

  const onItemIdChange = (selectedItemId: number) => {
    const config = {
      ...explorerConfig,
      selectedItemId,
    };
    dispatch(setExplorerConfig(config));
  };

  const onPlay = () => {
    const category = getCategory(appConfig, item.categoryName);
    if (category.hasOwnProperty("players")) {
      if (category.players.length == 1) {
        play(appConfig, item, category.players[0]);
        return;
      }
    }
    dispatch(setPlayerPicker(true));
  };

  const onGameNameClick = () => {
    clipboard.writeText(item.gameName, "selection");
  };

  const renderGameName = () => {
    if (item) {
      const collect = (): GameNameTriggerProps => {
        return {
          gameName: item.gameName,
        };
      };
      return (
        <ContextMenuTrigger id={ContextMenuId.GAME_NAME} collect={collect}>
          <div className="gameName" onClick={onGameNameClick}>
            {item.gameName}
          </div>
        </ContextMenuTrigger>
      );
    }
    return null;
  };

  const renderResultLength = () => {
    const { length } = searchResults;
    const collect = (): SearchResultTriggerProps => {
      return {
        categoryName,
        searchResults,
      };
    };
    return (
      <ContextMenuTrigger id={ContextMenuId.SEARCH_RESULT} collect={collect}>
        <div className="length">
          <span>{length}</span>
          <span> item(s)</span>
        </div>
      </ContextMenuTrigger>
    );
  };

  const renderLayoutSwitch = () => {
    return (
      <div className="options">
        <select value={layout} onChange={onLayoutChange}>
          <option value={ResultLayout.BOXART}>BoxArt</option>
          <option value={ResultLayout.SNAPSHOT}>Snapshot</option>
          <option value={ResultLayout.TITLE_SCREEN}>Title Screen</option>
          <option value={ResultLayout.GAME_TITLE}>Game Title</option>
          <option value={ResultLayout.FILE_NAME}>File Name</option>
        </select>
      </div>
    );
  };

  const renderSlider = () => {
    if (
      [
        ResultLayout.BOXART,
        ResultLayout.TITLE_SCREEN,
        ResultLayout.SNAPSHOT,
      ].includes(layout)
    ) {
      return (
        <div>
          <input
            className="slider"
            type="range"
            min="160"
            max="640"
            value={gridSize}
            onChange={onSliderChange}
          />
        </div>
      );
    }
    return null;
  };

  const renderContent = () => {
    if ([ResultLayout.GAME_TITLE, ResultLayout.FILE_NAME].includes(layout)) {
      return (
        <ResultList
          categoryName={categoryName}
          results={searchResults}
          favour={favour}
          itemId={selectedItemId}
          setItemId={onItemIdChange}
          playHandler={onPlay}
          layout={layout}
        />
      );
    } else if (
      [
        ResultLayout.BOXART,
        ResultLayout.TITLE_SCREEN,
        ResultLayout.SNAPSHOT,
      ].includes(layout)
    ) {
      return (
        <ResultGrid
          categoryName={categoryName}
          results={searchResults}
          favour={favour}
          itemId={selectedItemId}
          setItemId={onItemIdChange}
          playHandler={onPlay}
          gridSize={gridSize}
          layout={layout}
        />
      );
    }
    return null;
  };

  const renderThumbnailDownloader = () => {
    return <ThumbnailDownloader dispatch={dispatch} gameItem={gameItem} />;
  };

  return (
    <div className={className}>
      <div className="head">
        {renderResultLength()}
        {renderThumbnailDownloader()}
        <div className="right">
          {renderSlider()}
          {renderLayoutSwitch()}
        </div>
      </div>
      <div className="subHead">{renderGameName()}</div>
      <div className="body">{renderContent()}</div>
    </div>
  );
};

const ResultView = styled(_ResultView)`
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  > .head {
    height: 32px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    color: #555;
    background-color: rgba(0, 0, 0, 0.3);
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    .length {
      user-select: none;
    }
    .right {
      display: flex;
    }
    .options {
      padding-left: 10px;
    }

    .slider {
      appearance: none;
      outline: none;
      width: 80px;
      height: 8px;
      background: rgba(150, 150, 150, 0.2);
      margin-top: 8px;
      &::-webkit-slider-thumb {
        appearance: none;
        appearance: none;
        width: 25px;
        height: 8px;
        background: rgba(150, 150, 150, 0.3);
        cursor: pointer;
        &:hover {
          background-color: #17bbaf;
        }
      }
    }
  }

  > .subHead {
    height: 32px;
    background-color: rgba(0, 0, 0, 0.3);
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    user-select: none;

    .gameName {
      display: inline-block;
      line-height: 32px;
      padding: 0 10px;
      width: 100%;
      font-size: 15px;
      color: #17bbaf;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  > .body {
    flex: 1;
    overflow: hidden;
    padding: 10px;
  }

  select {
    border: none;
    background-color: transparent;
    color: #555;
    padding: 5px;
    font-size: 12px;
    cursor: pointer;
  }
`;

interface ResultViewProps {
  className?: string;
  dispatch: Dispatch<any>;
  explorer: ExplorerState;
  gameItem: GameItemState;
  appConfig: AppConfigState;
  favour: FavourState;
}

export default ResultView;
