import React, { RefObject, createRef } from "react";
import styled from "styled-components";
import {
  AutoSizer,
  List,
  ListRowProps,
  CellMeasurerCache,
  CellMeasurer
} from "react-virtualized";
import { CategoryAll } from "./MainView";
import { ContextMenuId } from "./ContextMenuId";
import { ContextMenuTrigger } from "react-contextmenu";

const _PlayListMenu = (props: PlayListMenuProps) => {
  const {
    className,
    lpls,
    category,
    setCategory,
    setKeyword,
    createPlaylistHandler
  } = props;

  const listRef: RefObject<any> = createRef();

  const categories: Array<string> = [CategoryAll, ...lpls];

  const cellMeasurerCache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 22,
    minHeight: 22
  });

  const onCategoryClick = (evt: any) => {
    const category = evt.currentTarget.getAttribute("data-category");
    setCategory(category);
  };

  const onRightClick = (evt: any) => {
    const category = evt.currentTarget.getAttribute("data-category");
    setCategory(category);
  };

  const onKeywordChange = (evt: any) => {
    const keyword = evt.currentTarget.value;
    setKeyword(keyword);
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
      const lpl = categories[index];
      const label = lpl.replace(".lpl", "");
      let className = "category";
      if (category == "") {
        if (label == CategoryAll) {
          className += " actived";
        }
      } else if (category == label) {
        className += " actived";
      }
      child = (
        <ContextMenuTrigger id={ContextMenuId.PLAYLIST}>
          <div
            className={className}
            data-category={label}
            onClick={onCategoryClick}
            onContextMenu={onRightClick}
          >
            {label}
          </div>
        </ContextMenuTrigger>
      );
    }
    return (
      <div className="item" style={style}>
        {child}
      </div>
    );
  };

  return (
    <div className={className}>
      <div className="head">
        <input
          type="search"
          defaultValue=""
          placeholder="search"
          onChange={onKeywordChange}
        />
      </div>
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
        <a onClick={createPlaylistHandler}>Create Playlist</a>
      </div>
    </div>
  );
};

const PlayListMenu = styled(_PlayListMenu)`
  width: 260px;
  font-size: 12px;
  background-color: rgba(0, 0, 0, 0.5);
  border-right: 1px solid rgba(100, 100, 100, 0.1);
  display: flex;
  flex-direction: column;
  > .head {
    height: 32px;
    padding: 5px;
    background-color: rgba(100, 100, 100, 0.1);
    input {
      width: 100%;
      background-color: transparent;
      border: none;
      color: orange;
      padding: 2px 5px;
    }
  }
  > .body {
    flex: 1;
    .item {
      user-select: none;
      .react-contextmenu-wrapper {
        width: 100%;
        .category {
          padding: 5px 10px;
          color: #999;
          border-bottom: 1px solid rgba(100, 100, 100, 0.1);
          cursor: pointer;
          &:hover {
            color: #ccc;
          }
          &.actived {
            background-color: rgba(0, 0, 0, 0.5);
            color: #17bbaf;
          }
        }
      }
    }
  }
  > .foot {
    height: 32px;
    padding: 5px 12px;
    text-align: right;
    a {
      user-select: none;
      cursor: pointer;
      color: #999;
      &:hover {
        color: orange;
      }
    }
  }
`;

interface PlayListMenuProps {
  className?: string;
  lpls: Array<string>;
  category: string;
  setCategory: (category: string) => void;
  setKeyword: (keyword: string) => void;
  createPlaylistHandler: () => void;
}

export default PlayListMenu;
