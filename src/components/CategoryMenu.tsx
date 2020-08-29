import React, { RefObject, createRef } from "react";
import styled from "styled-components";
import debounce from "debounce";
import {
  AutoSizer,
  List,
  ListRowProps,
  CellMeasurerCache,
  CellMeasurer,
} from "react-virtualized";
import { ContextMenuId } from "../contextMenus/ContextMenuId";
import { ContextMenuTrigger } from "react-contextmenu";
import { CategoryAll } from "../libs/categoryAll";
import { CategoryTriggerProps } from "../contextMenus/CategoryContextMenu";
import { GameItemState } from "../states/gameItemState";
import { ItemFilter, OrderBy } from "../interfaces/itemFilter";
import lazy from "lazy.js";
import { AppConfigState } from "../states/appConfigState";

let _keywordHandler: any;

const _CategoryMenu = (props: CategoryMenuProps) => {
  const { className, appConfig, gameItem, searchHandler } = props;

  const { subCategories, itemFilter } = gameItem;
  const categoryNames = lazy(appConfig.categories)
    .sort()
    .pluck("name")
    .toArray();

  const {
    categoryName,
    subCategoryName,
    keyword,
    favourOnly,
    orderBy,
  } = itemFilter;

  const listRef: RefObject<any> = createRef();
  _keywordHandler = debounce(searchHandler, 300, false);

  const labels: Array<string> = [CategoryAll, ...categoryNames.sort()];

  const cellMeasurerCache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 22,
    minHeight: 22,
  });

  const onCategoryClick = (evt: any) => {
    const categoryName = evt.currentTarget.getAttribute("data-category");
    const subCategoryName = evt.target.getAttribute("data-subcategory");

    const filter: ItemFilter = {
      ...itemFilter,
      categoryName,
      subCategoryName,
    };
    searchHandler(filter);
  };

  const onRightClick = (evt: any) => {
    const categoryName = evt.currentTarget.getAttribute("data-category");
    const filter: ItemFilter = {
      ...itemFilter,
      categoryName,
    };
    searchHandler(filter);
  };

  const onKeywordChange = (evt: any) => {
    const keyword = evt.currentTarget.value;
    const filter: ItemFilter = {
      ...itemFilter,
      keyword,
    };
    _keywordHandler(filter);
  };

  const onFavourOnlyChange = (evt: any) => {
    const favourOnly = evt.target.value == 1;
    const filter: ItemFilter = {
      ...itemFilter,
      favourOnly,
    };
    searchHandler(filter);
  };

  const onOrderByChange = (evt: any) => {
    const orderBy = evt.target.value as OrderBy;
    const filter: ItemFilter = {
      ...itemFilter,
      orderBy,
    };
    searchHandler(filter);
  };

  const rednerKeyWord = () => {
    return (
      <div className="keyword">
        <input
          type="search"
          defaultValue={keyword}
          placeholder="search"
          onChange={onKeywordChange}
        />
      </div>
    );
  };

  const renderFavourOptions = () => {
    const value = favourOnly ? 1 : 0;
    return (
      <div className="favourOnly">
        <select value={value} onChange={onFavourOnlyChange}>
          <option value={0}>Show All</option>
          <option value={1}>Favour Only</option>
        </select>
      </div>
    );
  };

  const renderOrderOptions = () => {
    return (
      <div className="orderBy">
        <select value={orderBy} onChange={onOrderByChange}>
          <option value={OrderBy.NAME}>Order by Name</option>
          <option value={OrderBy.RANDOM}>Random</option>
        </select>
      </div>
    );
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
    if (index < labels.length) {
      const label = labels[index];
      let className = "category";
      if (categoryName == label) {
        className += " actived";
      }

      const collect = (): CategoryTriggerProps => {
        return {
          categoryName: label,
        };
      };
      child = (
        <ContextMenuTrigger id={ContextMenuId.CATEGORY} collect={collect}>
          <div
            className={className}
            data-category={label}
            onClick={onCategoryClick}
            onContextMenu={onRightClick}
          >
            <div className="label">{label}</div>
            {renderSubCategories(label)}
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

  const renderSubCategories = (mainLabel: string) => {
    let childs: Array<any> = [];
    if (subCategories.hasOwnProperty(mainLabel)) {
      const subCategory = subCategories[mainLabel];
      subCategory.map((subLabel) => {
        const key = `${mainLabel} - ${subLabel}`;
        let className = "subCategory";
        if (mainLabel == categoryName && subLabel == subCategoryName) {
          className += " actived";
        }
        childs.push(
          <div className={className} key={key} data-subcategory={subLabel}>
            {key}
          </div>
        );
      });
    }

    if (childs.length) {
      return <div className="subCategories">{childs}</div>;
    }
    return null;
  };

  return (
    <div className={className}>
      <div className="head">
        {rednerKeyWord()}
      </div>
      <div className="subHead">
        {renderFavourOptions()}
        {renderOrderOptions()}
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
              rowCount={labels.length}
              rowHeight={cellMeasurerCache.rowHeight}
              rowRenderer={renderRow}
              overscanRowCount={1}
            />
          )}
        </AutoSizer>
      </div>
    </div>
  );
};

const CategoryMenu = styled(_CategoryMenu)`
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
      padding: 2px 3px;
      text-align: center;
    }
  }

  > .subHead {
    height: 32px;
    padding: 5px;
    background-color: rgba(100, 100, 100, 0.1);
    border-top: 1px solid rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: space-between;

    select {
      border: none;
      background-color: transparent;
      color: #555;
      padding: 5px;
      font-size: 12px;
      cursor: pointer;
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
          font-size: 11px;
          font-family: Tahoma, Verdana, Geneva, sans-serif;
          cursor: pointer;
          &:hover {
            .label {
              color: #ccc;
            }
          }
          &.actived {
            background-color: rgba(0, 0, 0, 0.5);
            .label {
              color: #17bbaf;
            }
          }
          .subCategories {
            margin-top: 5px;
            .subCategory {
              padding: 5px 0;
              border-top: 1px solid rgba(100, 100, 100, 0.1);
              &:hover {
                color: #ccc;
              }
              &.actived {
                color: #17bbaf;
              }
            }
          }
        }
      }
    }
  }
`;

interface CategoryMenuProps {
  className?: string;
  appConfig: AppConfigState;
  gameItem: GameItemState;
  searchHandler: (itemFilter: ItemFilter) => void;
}

export default CategoryMenu;
