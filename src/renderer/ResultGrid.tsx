import React, { RefObject, createRef, useState } from "react";
import styled from "styled-components";
import { AutoSizer, Grid, GridCellProps } from "react-virtualized";
import { ComputedPlayListItem } from "../libs/ComputedPlaylistItem";
import { ThumbnailType } from "../libs/ThumbnailType";
import { toRetroArchThumbnail } from "../libs/toRetroArchThumbnail";
import { ContextMenuTrigger } from "react-contextmenu";
import { ContextMenuId } from "./ContextMenuId";
import { ipcRenderer } from "electron";
import { AppEvent } from "../libs/AppEvent";
import { toBackgroundUrl } from "./toBackgroundUrl";

const _ResultGrid = (props: ResultGridProps) => {
  const {
    className,
    gridSize,
    config,
    results,
    thumbnailType,
    itemId,
    setItemId,
    executeHandler
  } = props;
  const gridRef: RefObject<any> = createRef();
  const [columnCount, setColumnCount] = useState(1);
  const thumbnailDir = config.retroArch.dir.thumbnails.replace(/\\/gi, "/");

  const onItemClick = (evt: any) => {
    const itemId = Number(evt.currentTarget.getAttribute("data-item-id"));
    setItemId(itemId);
  };

  const onDoubleClick = (evt: any) => {
    const itemId = Number(evt.currentTarget.getAttribute("data-item-id"));
    executeHandler(itemId);
  };

  const onRightClick = (evt: any) => {
    const itemId = Number(evt.currentTarget.getAttribute("data-item-id"));
    setItemId(itemId);
  };

  const renderCell = (props: GridCellProps) => {
    const { columnIndex, key, rowIndex, style } = props;
    let dataIndex = columnIndex + rowIndex * columnCount;
    let data: ComputedPlayListItem | null = null;
    let item: any;
    if (dataIndex >= 0 && dataIndex <= results.length - 1) {
      data = results[dataIndex];
      if (data) {
        const { label, db_name } = data;
        let img = toRetroArchThumbnail(label);

        const filePath = `${thumbnailDir}\/${db_name}\/${thumbnailType}\/${img}`;
        const fileExists = ipcRenderer.sendSync(
          AppEvent.IS_FILE_EXISTS,
          filePath
        );

        let style: any = {};
        if (fileExists) {
          style.backgroundImage = toBackgroundUrl(filePath);
        }

        let className = "item";
        if (itemId == data.id) {
          className += " actived";
        }
        item = (
          <ContextMenuTrigger id={ContextMenuId.GAME_ITEM}>
            <div
              className={className}
              data-item-id={data.id}
              onClick={onItemClick}
              onDoubleClick={onDoubleClick}
              onContextMenu={onRightClick}
            >
              <div className="thumbnail" style={style}></div>
              <div className="label">{label}</div>
            </div>
          </ContextMenuTrigger>
        );
      }
    }
    return (
      <div key={key} className="cell" style={style}>
        {item}
      </div>
    );
  };

  return (
    <div className={className}>
      <AutoSizer>
        {({ width, height }: any) => {
          const _columnCount = Math.max(1, Math.floor((width - 20) / gridSize));
          const rowCount = Math.ceil(results.length / _columnCount);
          setColumnCount(_columnCount);
          return (
            <Grid
              ref={gridRef}
              className="grid"
              width={width}
              height={height}
              cellRenderer={renderCell}
              columnCount={columnCount}
              rowCount={rowCount}
              columnWidth={gridSize}
              rowHeight={gridSize}
              overscanRowCount={1}
            />
          );
        }}
      </AutoSizer>
    </div>
  );
};

const ResultGrid = styled(_ResultGrid)`
  width: 100%;
  height: 100%;
  overflow: hidden;
  .grid {
    .cell {
      padding: 1px;
      user-select: none;
      .react-contextmenu-wrapper {
        width: 100%;
        height: 100%;
        .item {
          width: 100%;
          height: 100%;
          padding: 5px;
          display: flex;
          flex-direction: column;
          color: #888;
          border: 1px solid #222;
          cursor: pointer;

          .thumbnail {
            flex: 1;
            background-position: center center;
            background-repeat: no-repeat;
            background-size: contain;
            border: 1px solid transparent;
          }
          .label {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 100%;
            font-size: 12px;
            text-align: center;
          }
          &:hover {
            background-color: rgba(100, 100, 100, 0.1);
            color: #ccc;
          }
          &.actived {
            background-color: rgba(0, 0, 0, 0.5);
            border: 1px solid #17bbaf;
            color: #17bbaf;
          }
        }
      }
    }
  }
`;

interface ResultGridProps {
  className?: string;
  gridSize: number;
  config: AppConfig;
  results: Array<ComputedPlayListItem>;
  thumbnailType: ThumbnailType;
  itemId: number;
  setItemId: (itemId: number) => void;
  executeHandler: (itemId: number) => void;
}

export default ResultGrid;
