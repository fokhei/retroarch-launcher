import React from "react";
import { AppConfigState } from "../states/appConfigState";
import { Dispatch } from "redux";
import { ContextMenu, connectMenu } from "react-contextmenu";
import { ContextMenuId } from "./ContextMenuId";
import { remote } from "electron";
import { ComputedGameItem } from "../interfaces/ComputedGameItem";
import { googleSearch } from "../libs/googleSearch";
import { createMenuItem } from "./createMenuItem";
import { ThumbnailType } from "../interfaces/ThumbnailType";
import { scanMissingThumbnails } from '../actions/scanMissingThumbnails';

const id = ContextMenuId.THUMBNAIL_DROPZONE;

const ThumbnailDropZoneContextMenu = (
  props: ThumbnailDropZoneContextMenuProps
) => {
  const { dispatch, appConfig, trigger } = props;

  const enabled = Boolean(trigger && trigger.item && trigger.thumbnailType);

  const onDownload = () => {
    dispatch(scanMissingThumbnails([trigger.item], appConfig));
  };
  const onGoogleSearch = () => {
    let suffix = "";
    if (trigger.thumbnailType == ThumbnailType.BOX) {
      suffix = "cover";
    } else if (trigger.thumbnailType == ThumbnailType.TITLE) {
      suffix = "title";
    } else if (trigger.thumbnailType == ThumbnailType.SNAP) {
      suffix = "gameplay";
    }
    googleSearch(appConfig, trigger.item, suffix);
  };
  const onShow = () => {
    remote.shell.showItemInFolder(trigger.item.romPath);
  };

  return (
    <ContextMenu id={id}>
      {createMenuItem("Download thumbnail", onDownload, enabled)}
      {createMenuItem("Google search", onGoogleSearch, enabled)}
      {createMenuItem("Show thumbnail directory", onShow, enabled)}
    </ContextMenu>
  );
};

interface ThumbnailDropZoneContextMenuProps {
  dispatch: Dispatch<any>;
  appConfig: AppConfigState;
  trigger: ThumbnailDropZoneTriggerProps;
}

export interface ThumbnailDropZoneTriggerProps {
  item: ComputedGameItem;
  thumbnailType: ThumbnailType;
}

export default connectMenu(id)(ThumbnailDropZoneContextMenu);
