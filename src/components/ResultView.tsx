import React from "react";
import styled from "styled-components";
import { ContextMenuTrigger } from "react-contextmenu";
import { ResultLayout } from "../interfaces/ResultLayout";
import { ContextMenuId } from "../contextMenus/ContextMenuId";
import { ExplorerState } from "../states/explorerState";
import { GameItemState } from "../states/gameItemState";
import { ThumbnailType } from "../interfaces/ThumbnailType";
import { Dispatch } from "redux";
import { setLayout } from "../actions/setLayout";
import { setThumbnailType } from "../actions/setThumbnailType";
import { setGridSize } from "../actions/setGridSize";
import { setItemId } from "../actions/setItemId";
import { getComputedItem } from "../libs/getComputedItem";
import ResultList from "./ResultList";
import ResultGrid from "./ResultGrid";
import ThumbnailDownloader from "./ThumbnailDownloader";
import { GameNameTriggerProps } from "../contextMenus/GameNameContextMenu";
import { setPlayerPicker } from "../actions/setPlayerPicker";
import { clipboard } from "electron";
import { getCategory } from "../libs/getCategory";
import { AppConfigState } from "../states/appConfigState";
import { play } from '../externalApps/play';

const _ResultView = (props: ResultViewProps) => {
  const { className, dispatch, explorer, gameItem, appConfig } = props;

  const {
    categoryName,
    layout,
    gridSize,
    thumbnailType,
    selectedItemId,
  } = explorer;
  const { itemsMap, searchResults } = gameItem;
  const item = getComputedItem(itemsMap, selectedItemId);

  const onLayoutChange = (evt: any) => {
    const layout = evt.target.value as ResultLayout;
    dispatch(setLayout(layout));
  };

  const onThumbnailTypeChange = (evt: any) => {
    const thumbnailType = evt.target.value as ThumbnailType;
    dispatch(setThumbnailType(thumbnailType));
  };

  const onSliderChange = (evt: any) => {
    const gridSize = Number(evt.target.value);
    dispatch(setGridSize(gridSize));
  };

  const onItemIdChange = (itemId: number) => {
    dispatch(setItemId(itemId));
  };

  const onPlay = () => {
    const category = getCategory(appConfig, categoryName);
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
    return (
      <div className="length">
        <span>{length}</span>
        <span> item(s)</span>
      </div>
    );
  };

  const renderLayoutSwitch = () => {
    return (
      <div className="options">
        <select value={layout} onChange={onLayoutChange}>
          <option value={ResultLayout.GRID}>Grid</option>
          <option value={ResultLayout.LIST}>List</option>
        </select>
      </div>
    );
  };

  const renderThumbnailSwitch = () => {
    if (layout == ResultLayout.GRID) {
      return (
        <div className="options">
          <select value={thumbnailType} onChange={onThumbnailTypeChange}>
            <option value={ThumbnailType.BOX}>Box</option>
            <option value={ThumbnailType.TITLE}>Title</option>
            <option value={ThumbnailType.SNAP}>Snap</option>
          </select>
        </div>
      );
    }
    return null;
  };

  const renderSlider = () => {
    if (layout == ResultLayout.GRID) {
      return (
        <div>
          <input
            className="slider"
            type="range"
            min="60"
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
    if (layout == ResultLayout.LIST) {
      return (
        <ResultList
          categoryName={categoryName}
          results={searchResults}
          itemId={selectedItemId}
          setItemId={onItemIdChange}
          playHandler={onPlay}
        />
      );
    } else if (layout == ResultLayout.GRID) {
      return (
        <ResultGrid
          categoryName={categoryName}
          results={searchResults}
          itemId={selectedItemId}
          setItemId={onItemIdChange}
          playHandler={onPlay}
          gridSize={gridSize}
          thumbnailType={thumbnailType}
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
      <div className="head">{renderGameName()}</div>
      <div className="body">{renderContent()}</div>

      <div className="foot">
        {renderResultLength()}
        {renderThumbnailDownloader()}
        <div className="right">
          {renderSlider()}
          {renderThumbnailSwitch()}
          {renderLayoutSwitch()}
        </div>
      </div>
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
  > .foot {
    height: 32px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    color: #555;
    background-color: rgba(0, 0, 0, 0.3);
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
}

export default ResultView;
