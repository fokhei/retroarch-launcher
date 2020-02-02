import React, { RefObject, createRef, useEffect, useState } from "react";
import styled from "styled-components";
import lazy from "lazy.js";
import {
  AutoSizer,
  List,
  ListRowProps,
  CellMeasurerCache,
  CellMeasurer
} from "react-virtualized";
import { ipcRenderer } from "electron";
import { AppEvent } from "../libs/AppEvent";

const _PlaylistCreator = (props: PlaylistCreatorProps) => {
  const { className, hideHandler, config } = props;
  const listRef: RefObject<any> = createRef();
  const [category, setCategory] = useState("");
  const [started, setStarted] = useState(false);
  const [logs, setLogs] = useState<Array<string>>([]);

  const categories = lazy(Object.keys(config.platforms))
    .sort()
    .toArray();

  const cellMeasurerCache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 22,
    minHeight: 22
  });

  const onCreatePlaylistMessage = (
    _evt: any,
    category: string,
    message: string
  ) => {
    setLogs([...logs, message]);
    ipcRenderer.send(AppEvent.REFRESH_PLAYLIST, category);
  };

  const onStart = () => {
    setStarted(true);
    ipcRenderer.send(AppEvent.CREATE_PLAYLIST, category);
  };

  const onError = (_evt: any, error: any) => {
    setLogs([...logs, JSON.stringify(error)]);
  };

  const onItemClick = (evt: any) => {
    const category = evt.currentTarget.getAttribute("data-category");
    setCategory(category);
  };

  const renderRow = (props: ListRowProps) => {
    const { index, parent, style } = props;
    return (
      <CellMeasurer
        key={index}
        cache={cellMeasurerCache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        {renderItem(style, index)}
      </CellMeasurer>
    );
  };

  const renderItem = (style: any, index: number) => {
    let child: any;
    if (index < categories.length) {
      const item = categories[index];
      let className = "item";
      if (category == item) {
        className += " actived";
      }
      child = (
        <div className={className} onClick={onItemClick} data-category={item}>
          {item}
        </div>
      );
    }
    return (
      <div className="row" style={style}>
        {child}
      </div>
    );
  };

  const renderLeft = () => {
    return (
      <>
        <div className="head">Preset</div>
        <div className="body">
          <AutoSizer>
            {({ width, height }: any) => (
              <List
                ref={listRef}
                className="list"
                width={width}
                height={height}
                deferredMeasurementCache={cellMeasurerCache}
                rowCount={categories.length}
                rowHeight={cellMeasurerCache.rowHeight}
                rowRenderer={renderRow}
                overscanRowCount={1}
              />
            )}
          </AutoSizer>
        </div>
        <div className="foot">
          <button onClick={hideHandler}>Close</button>
        </div>
      </>
    );
  };

  const renderRight = () => {
    if (category) {
      const platform = config.platforms[category];
      return (
        <>
          <div className="head">{category}</div>
          <div className="config">
            <pre>{JSON.stringify(platform, null, 2)}</pre>
          </div>
          {renderStartButton()}
          {renderLogs()}
        </>
      );
    }
    return null;
  };

  const renderStartButton = () => {
    if (!started) {
      return (
        <div className="startButton">
          <button onClick={onStart}>Start</button>
        </div>
      );
    }
    return null;
  };

  const renderLogs = () => {
    if (started) {
      return (
        <div className="logs">
          <pre>{logs.join("/r/n")}</pre>
        </div>
      );
    }
    return null;
  };

  const mountEffect = () => {
    ipcRenderer.on(AppEvent.CREATE_PLAYLIST_MESSAGE, onCreatePlaylistMessage);
    ipcRenderer.on(AppEvent.ERROR, onError);
    return () => {
      ipcRenderer.removeListener(
        AppEvent.CREATE_PLAYLIST_MESSAGE,
        onCreatePlaylistMessage
      );
      ipcRenderer.removeListener(AppEvent.ERROR, onError);
    };
  };

  useEffect(mountEffect, []);

  return (
    <div className={className}>
      <div className="left">{renderLeft()}</div>
      <div className="right">{renderRight()}</div>
    </div>
  );
};

const PlaylistCreator = styled(_PlaylistCreator)`
  position: absolute;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: row;
  > .left {
    background-color: #333;
    display: flex;
    flex-direction: column;
    width: 300px;
    min-width: 300px;
    > .head {
      padding: 20px 20px 0 20px;
      height: 40px;
      color: #666;
      font-size: 16px;
    }
    > .body {
      flex: 1;
      padding-top: 20px;
      .item {
        padding: 10px 20px;
        user-select: none;
        cursor: pointer;
        &:hover {
          background-color: rgba(100, 100, 100, 0.2);
          color: #17bbaf;
        }
        &.actived {
          background-color: rgba(100, 100, 100, 0.5);
          color: orange;
        }
      }
    }
    > .foot {
      padding: 20px 20px 20px 20px;
    }
  }

  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    > .head {
      padding: 20px 20px 0 20px;
      font-size: 18px;
      color: orange;
    }
    > .config {
      padding: 20px 20px 0 20px;
      pre {
        border: 1px solid rgba(100, 100, 100, 0.5);
        border-radius: 5px;
        padding: 5px;
      }
    }
    > .startButton {
      padding: 20px 20px 0 20px;
    }
    > .logs {
      padding: 20px 20px 20px 20px;
    }
  }

  pre {
    font-family: Arial, Helvetica, sans-serif;
  }
`;

interface PlaylistCreatorProps {
  className?: string;
  hideHandler: () => void;
  config: AppConfig;
}

export default PlaylistCreator;
