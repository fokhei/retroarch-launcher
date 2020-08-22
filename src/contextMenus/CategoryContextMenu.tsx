import React from "react";
import { ContextMenu, connectMenu } from "react-contextmenu";
import { ContextMenuId } from "./ContextMenuId";
import { Dispatch } from "redux";
import { showScanner } from "../actions/showScanner";
import { CategoryAll } from "../libs/categoryAll2";
import { AppConfigState } from "../states/appConfigState";
import { getCategory } from "../libs/getCategory";
import { remote } from "electron";
import { createMenuItem } from "./createMenuItem";

const id = ContextMenuId.CATEGORY;

const CategoryContextMenu = (props: CategoryContextMenuProps) => {
  const { dispatch, appConfig, trigger } = props;
  const enabled = Boolean(
    trigger && trigger.categoryName && trigger.categoryName != CategoryAll
  );

  const onScan = () => {
    dispatch(showScanner(trigger.categoryName));
  };

  const onShow = () => {
    const category = getCategory(appConfig, trigger.categoryName);
    const { romsPath } = category;
    remote.shell.openItem(romsPath);
  };

  return (
    <ContextMenu id={id}>
      {createMenuItem("Scan this category", onScan, enabled)}
      {createMenuItem("Show roms directory", onShow, enabled)}
    </ContextMenu>
  );
};

interface CategoryContextMenuProps {
  dispatch: Dispatch<any>;
  appConfig: AppConfigState;
  trigger: CategoryTriggerProps;
}

export interface CategoryTriggerProps {
  categoryName: string;
}

export default connectMenu(id)(CategoryContextMenu);
