import React from "react";
import { ContextMenu, connectMenu } from "react-contextmenu";
import { ContextMenuId } from "./ContextMenuId";
import { Dispatch } from "redux";
import { showScanner } from "../actions/showScanner";
import { CategoryAll } from "../libs/categoryAll";
import { AppConfigState } from "../states/appConfigState";
// import { getCategory } from "../libs/getCategory";
// import { remote } from "electron";
import { createMenuItem } from "./createMenuItem";
import { GameItemState } from "../states/gameItemState";
import lazy from "lazy.js";
import { scanMissingThumbnails } from "../actions/scanMissingThumbnails";

const id = ContextMenuId.CATEGORY;

const CategoryContextMenu = (props: CategoryContextMenuProps) => {
  const { dispatch, trigger, appConfig, gameItem } = props;
  const enabled = Boolean(
    trigger && trigger.categoryName && trigger.categoryName != CategoryAll
  );

  const onScan = () => {
    dispatch(showScanner(trigger.categoryName));
  };

  // const onShow = () => {
  //   const category = getCategory(appConfig, trigger.categoryName);
  //   const { romsPath } = category;
  //   remote.shell.openItem(romsPath);
  // };

  const onDownloadThumbnails = () => {
    const items = lazy(gameItem.items)
      .filter((item) => item.categoryName == trigger.categoryName)
      .toArray();
    if (items && items.length) {
      dispatch(scanMissingThumbnails(items, appConfig));
    }
  };

  return (
    <ContextMenu id={id}>
      {createMenuItem("Scan this category", onScan, enabled)}
      {/* {createMenuItem("Show roms directory", onShow, enabled)} */}
      {createMenuItem("Download thumbnails", onDownloadThumbnails, enabled)}
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
