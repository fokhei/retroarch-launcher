import React from "react";
import { ContextMenu, connectMenu } from "react-contextmenu";
import { ContextMenuId } from "./ContextMenuId";
import { remote } from "electron";
import { createMenuItem } from "./createMenuItem";
import { Dispatch } from "redux";
import { removeThumbnail } from "../actions/removeThumbnail";
import { ComputedGameItem } from "../interfaces/ComputedGameItem";
import { ThumbnailType } from "../interfaces/ThumbnailType";

const id = ContextMenuId.THUMBNAIL;

const ThumbnailContextMenu = (props: ThumbnailContextMenuProps) => {
  const { dispatch, trigger } = props;
  const enabled = Boolean(trigger && trigger.item && trigger.thumbnailType);

  const onOpen = () => {
    const thumbnail = trigger.item.thumbnails[trigger.thumbnailType];
    remote.shell.openItem(thumbnail);
  };

  const onShow = () => {
    const thumbnail = trigger.item.thumbnails[trigger.thumbnailType];
    remote.shell.showItemInFolder(thumbnail);
  };

  const onRemove = () => {
    dispatch(removeThumbnail(trigger.item, trigger.thumbnailType));
  };

  return (
    <ContextMenu id={id}>
      {createMenuItem("Open Image", onOpen, enabled)}
      {createMenuItem("Show thumbnail directory", onShow, enabled)}
      {createMenuItem("Remove thumbnail", onRemove, enabled)}
    </ContextMenu>
  );
};

interface ThumbnailContextMenuProps {
  dispatch: Dispatch<any>;
  trigger: ThumbnailTriggerProps;
}

export interface ThumbnailTriggerProps {
  item: ComputedGameItem;
  thumbnailType: ThumbnailType;
}

export default connectMenu(id)(ThumbnailContextMenu);
