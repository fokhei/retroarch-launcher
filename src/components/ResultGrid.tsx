import fs from "fs";
import * as path from "path";
import React, { RefObject, createRef, useState } from "react";
import styled from "styled-components";
import { AutoSizer, Grid, GridCellProps } from "react-virtualized";
import { ComputedGameItem } from "../interfaces/ComputedGameItem";
import { ContextMenuId } from "../contextMenus/ContextMenuId";
import { ContextMenuTrigger } from "react-contextmenu";
import { toBackgroundUrl } from "../libs/toBackgroundUrl";
import { GameItemTriggerProps } from "../contextMenus/GameItemContextMenu";
import { ResultLayout } from "../interfaces/ResultLayout";
import { ThumbnailType } from "../interfaces/ThumbnailType";
import { FavourState } from "../states/favourState";

// declare global {
//   interface Window {
//     out: ()=>void
//   }
// }



const _ResultGrid = (props: ResultGridProps) => {
  const {
    className,
    categoryName,
    results,
    favour,
    itemId,
    setItemId,
    playHandler,
    gridSize,
    layout,
  } = props;
  const gridRef: RefObject<any> = createRef();
  const [columnCount, setColumnCount] = useState(1);
  let thumbnailType = ThumbnailType.SNAP;
  if (layout == ResultLayout.BOXART) {
    thumbnailType = ThumbnailType.BOX;
  } else if (layout == ResultLayout.TITLE_SCREEN) {
    thumbnailType = ThumbnailType.TITLE;
  }

  const onItemClick = (evt: any) => {
    const itemId = Number(evt.currentTarget.getAttribute("data-item-id"));
    setItemId(itemId);
  };

  const onDoubleClick = (evt: any) => {
    const itemId = Number(evt.currentTarget.getAttribute("data-item-id"));
    setItemId(itemId);
    playHandler();
  };

  const onRightClick = (evt: any) => {
    const itemId = Number(evt.currentTarget.getAttribute("data-item-id"));
    setItemId(itemId);
  };

  const renderCell = (props: GridCellProps) => {
    const { columnIndex, key, rowIndex, style } = props;
    let dataIndex = columnIndex + rowIndex * columnCount;
    let data: ComputedGameItem | null = null;
    let item: any;
    if (dataIndex >= 0 && dataIndex <= results.length - 1) {
      data = results[dataIndex];
      if (data) {
        const { gameName, thumbnails } = data;
        const filePath = thumbnails[thumbnailType];
        const fileExists = fs.existsSync(filePath);

        let style: any = {};
        if (fileExists) {
          style.backgroundImage = toBackgroundUrl(filePath, data.updateAt);
        }

        let className = "item";
        if (itemId == data.id) {
          className += " actived";
        }

        const collect = (): GameItemTriggerProps => {
          return {
            item: data,
          };
        };

        item = (
          <ContextMenuTrigger id={ContextMenuId.GAME_ITEM} collect={collect}>
            <div
              className={className}
              data-item-id={data.id}
              onClick={onItemClick}
              onDoubleClick={onDoubleClick}
              onContextMenu={onRightClick}
            >
              <div className="thumbnail" style={style}></div>
              <div className="label">
                {renderFavour(data)}
                {gameName}
              </div>
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

  const renderFavour = (data: ComputedGameItem) => {
    if (favour.list.includes(data.key)) {
      return <span className="favour">⭐</span>;
    }
    return null;
  };

  // window.out = ()=>{
  //   let arr: Array<string> = [];
  //   results.map(result=>{
  //     const basename = path.basename(result.romPath)
  //     const ext = path.extname(basename);
  //     const noExt = basename.replace(ext, "");
  //     arr.push(noExt)
  //   })
  //   console.log(JSON.stringify(arr));
  // }

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
              key={categoryName}
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
      position: relative;
      user-select: none;
      .react-contextmenu-wrapper {
        width: 100%;
        height: 100%;
        .item {
          width: 100%;
          height: 100%;
          border: 1px solid #222;
          position: relative;
          cursor: pointer;

          .thumbnail {
            width: 100%;
            height: 100%;
            background-position: center center;
            background-repeat: no-repeat;
            background-size: contain;
            /* background-size: cover; */
            border: 1px solid transparent;
          }

          .label {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: 22px;
            background-color: rgba(0, 0, 0, 0.9);
            color: #888;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 11px;
            text-align: center;
            padding: 2px 5px;
            z-index: 2;
          }

          &:hover {
            background-color: rgba(100, 100, 100, 0.1);
            color: #ccc;
          }
          &.actived {
            background-color: rgba(0, 0, 0, 0.5);
            border: 1px solid #17bbaf;

            .label {
              color: #17bbaf;
            }
          }
        }
      }
    }
  }
`;

interface ResultGridProps {
  className?: string;
  categoryName: string;
  results: Array<ComputedGameItem>;
  favour: FavourState;
  itemId: number;
  setItemId: (itemId: number) => void;
  playHandler: () => void;
  gridSize: number;
  layout: ResultLayout;
}

export default ResultGrid;
