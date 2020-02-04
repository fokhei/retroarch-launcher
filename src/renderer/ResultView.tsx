import React, { useState, useEffect } from "react";
import styled from "styled-components";
import lazy from "lazy.js";
import debounce from "debounce";
import { ComputedPlayListItem } from "../libs/ComputedPlaylistItem";
import ResultList from "./ResultList";
import ResultGrid from "./ResultGrid";
import { ThumbnailType } from "../libs/ThumbnailType";
import { CategoryAll } from "./MainView";
import { ContextMenuTrigger } from "react-contextmenu";
import { ContextMenuId } from "./ContextMenuId";
import { ThumbnailInfo } from "../libs/ThumbnailInfos";
import AppConfig from '../libs/AppConfig';

let _updateResults: any;
let _category: string = "";
let _keyword: string = "";
let _items: Array<ComputedPlayListItem> = [];

enum ResultLayout {
  LIST = "list",
  GRID = "grid"
}

const _ResultView = (props: ResultViewProps) => {
  const {
    className,
    gridSize,
    setGridSize,
    config,
    items,
    lpls,
    category,
    keyword,
    itemId,
    setItemId,
    item,
    executeHandler,
    missingThumbnailInfos,
    renderTime
  } = props;
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<Array<ComputedPlayListItem>>([]);
  const [layout, setLayout] = useState<ResultLayout>(ResultLayout.GRID);
  const [thumbnailType, setThumbnailType] = useState<ThumbnailType>(
    ThumbnailType.SNAP
  );

  const updateResults = () => {
    let seq: any = lazy(_items);
    if (_category != CategoryAll) {
      seq = seq.filter(
        (item: ComputedPlayListItem) => item.category == _category
      );
    }
    if (_keyword != "") {
      seq = seq.filter((item: ComputedPlayListItem) =>
        item.label.toLowerCase().includes(_keyword.toLowerCase())
      );
    }

    seq = seq.sortBy((item: ComputedPlayListItem) => item.label);

    const results: Array<ComputedPlayListItem> = seq.toArray();
    setResults(results);
    setSearching(false);
    if (results.length) {
      const firstItem = results[0];
      setItemId(firstItem.id);
    }
  };

  const onChangeLayout = (evt: any) => {
    const layout = evt.target.value as ResultLayout;
    setLayout(layout);
  };

  const onChangeThumbnail = (evt: any) => {
    const thumbnailType = evt.target.value as ThumbnailType;
    setThumbnailType(thumbnailType);
  };

  const onSliderChange = (evt: any) => {
    setGridSize(Number(evt.target.value));
  };

  const renderInfo = () => {
    if (item) {
      return (
        <ContextMenuTrigger id={ContextMenuId.GAME_NAME}>
          <div className="info">
            <div className="label">{item.label}</div>
          </div>
        </ContextMenuTrigger>
      );
    }
    return undefined;
  };

  const renderResultLength = () => {
    if (searching) {
      return <div className="length">Loading ...</div>;
    }
    const { length } = results;
    return (
      <div className="length">
        <span>{length}</span>
        <span> item(s)</span>
      </div>
    );
  };

  const renderLayoutSwitcher = () => {
    return (
      <div className="options">
        <select value={layout} onChange={onChangeLayout}>
          <option value={ResultLayout.GRID}>Grid</option>
          <option value={ResultLayout.LIST}>List</option>
        </select>
      </div>
    );
  };

  const renderThumbnailSwitcher = () => {
    if (layout == ResultLayout.GRID) {
      return (
        <div className="options">
          <select value={thumbnailType} onChange={onChangeThumbnail}>
            <option value={ThumbnailType.BOX}>Box</option>
            <option value={ThumbnailType.TITLE}>Title</option>
            <option value={ThumbnailType.SNAP}>Snap</option>
          </select>
        </div>
      );
    }
    return undefined;
  };

  const renderSlider = () => {
    if (layout == ResultLayout.GRID) {
      return (
        <div>
          <input
            className="slider"
            type="range"
            min="80"
            max="640"
            value={gridSize}
            onChange={onSliderChange}
          />
        </div>
      );
    }
    return undefined;
  };

  const renderContent = () => {
    if (!searching) {
      if (layout == ResultLayout.LIST) {
        return (
          <ResultList
            results={results}
            itemId={itemId}
            setItemId={setItemId}
            executeHandler={executeHandler}
          />
        );
      } else if (layout == ResultLayout.GRID) {
        return (
          <ResultGrid
            gridSize={gridSize}
            config={config}
            results={results}
            itemId={itemId}
            setItemId={setItemId}
            thumbnailType={thumbnailType}
            executeHandler={executeHandler}
            renderTime={renderTime}
          />
        );
      }
    }

    return undefined;
  };

  const renderStatus = () => {
    const { length } = missingThumbnailInfos;
    if (length) {
      return <div className="status">Downloading...({length})</div>;
    }
    return undefined;
  };

  const mountEffect = () => {
    _updateResults = debounce(updateResults, 300, false);
    return () => {
      _updateResults = null;
      _category = CategoryAll;
      _keyword = "";
      _items = [];
    };
  };

  const changeEffect = () => {
    setSearching(true);
    _category = category;
    _keyword = keyword;
    _items = items;
    _updateResults();
  };

  useEffect(mountEffect, []);
  useEffect(changeEffect, [category, keyword, lpls, items]);

  return (
    <div className={className}>
      <div className="head">{renderInfo()}</div>
      <div className="body">{renderContent()}</div>
      <div className="foot">
        {renderResultLength()}
        {renderStatus()}
        <div className="right">
          {renderSlider()}
          {renderThumbnailSwitcher()}
          {renderLayoutSwitcher()}
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

    .label {
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
        background:  rgba(150, 150, 150, 0.3);
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
  gridSize: number;
  setGridSize: (gridSize: number) => void;
  config: AppConfig;
  items: Array<ComputedPlayListItem>;
  lpls: Array<string>;
  category: string;
  keyword: string;
  itemId: number;
  setItemId: (itemId: number) => void;
  item?: ComputedPlayListItem;
  executeHandler: (itemId: number) => void;
  missingThumbnailInfos: Array<ThumbnailInfo>;
  renderTime: number;
}

export default ResultView;
