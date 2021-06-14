import React from "react";
import { ContextMenu, connectMenu } from "react-contextmenu";
import { ContextMenuId } from "./ContextMenuId";
import { Dispatch } from "redux";
import { showScanner } from "../actions/showScanner";
import { CategoryAll, CategoryBookmark } from "../libs/categoryAll";
import { AppConfigState } from "../states/appConfigState";
import { createMenuItem } from "./createMenuItem";
import { GameItemState } from "../states/gameItemState";
import lazy from "lazy.js";
import { scanMissingThumbnails } from "../actions/scanMissingThumbnails";
import { clearAllBookmark } from "../actions/bookmark";

const id = ContextMenuId.CATEGORY;

const CategoryContextMenu = (props: CategoryContextMenuProps) => {
  const { dispatch, trigger, appConfig, gameItem } = props;
  const enabled = Boolean(
    trigger && trigger.categoryName
  );



  const onScan = () => {
    dispatch(showScanner(trigger.categoryName));
  };



  const onDownloadThumbnails = () => {
    const items = lazy(gameItem.items)
      .filter((item) => item.categoryName == trigger.categoryName)
      .toArray();
    if (items && items.length) {
      dispatch(scanMissingThumbnails(items, appConfig));
    }
  };

  const onClearAllBookmark = () => {
    dispatch(clearAllBookmark(gameItem));
  };




  const createMenuItemForScan = () => {
    if (enabled) {
      if (![CategoryAll, CategoryBookmark].includes(trigger.categoryName)) {
        return createMenuItem("Scan this category", onScan, enabled)
      }
    }
    return null;
  }

  const createMenuItemForDownloadThumbnail = () => {
    if (enabled) {
      if (![CategoryAll, CategoryBookmark].includes(trigger.categoryName)) {
        return createMenuItem("Download thumbnails", onDownloadThumbnails, enabled)
      }
    }
    return null;
  }


  const createMenuItemForClearBookmark = () => {
    if (enabled) {
      if (trigger.categoryName == CategoryBookmark) {
        return createMenuItem("Clear all bookmark", onClearAllBookmark, enabled)
      }
    }
    return null;
  }



  return (
    <ContextMenu id={id}>
      {createMenuItemForScan()}
      {createMenuItemForDownloadThumbnail()}
      {createMenuItemForClearBookmark()}
    </ContextMenu>
  );
};

interface CategoryContextMenuProps {
  dispatch: Dispatch<any>;
  trigger: CategoryTriggerProps;
  appConfig: AppConfigState;
  gameItem: GameItemState;
}

export interface CategoryTriggerProps {
  categoryName: string;
}

export default connectMenu(id)(CategoryContextMenu);
