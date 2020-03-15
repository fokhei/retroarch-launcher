import React from "react";
import { ContextMenu, MenuItem } from "react-contextmenu";
import { ContextMenuId } from "../renderer/ContextMenuId";
import { remote, ipcRenderer } from "electron";
import { ContextMenuAction } from "../renderer/ContextMenuAction";
import { ComputedPlayListItem } from "../libs/ComputedPlaylistItem";
import { AppEvent } from "../libs/AppEvent";
import AppConfig from '../libs/AppConfig';

const ThumbnailContextMenu = (props: ThumbnailContextMenuProps) => {
  const { config, item, thumbnailFilePath } = props;

  const onMenuItemClick = (_evt: any, data: any) => {
    //console.log("onMenuItemClick", data.action);
    const { action } = data;
    if (action == ContextMenuAction.OPEN_THUMBNAIL) {
      if (thumbnailFilePath) {
        remote.shell.openItem(thumbnailFilePath);
      }
    } else if (action == ContextMenuAction.SHOW_THUMBNAIL_DIRECTORY) {
   
      if (thumbnailFilePath) {
      
        remote.shell.showItemInFolder(thumbnailFilePath);
      } else {
     
        remote.shell.openItem(config.retroArch.thumbnails);
      }
    } else if (action == ContextMenuAction.REMOVE_THUMBNAIL) {
      if (item && thumbnailFilePath) {
        ipcRenderer.send(AppEvent.REMOVE_THUMBNAIL, item, thumbnailFilePath);
      }
    }
  };

  return (
    <ContextMenu id={ContextMenuId.THUMBNAIL}>
      <MenuItem
        onClick={onMenuItemClick}
        data={{ action: ContextMenuAction.OPEN_THUMBNAIL }}
      >
        Open Image
      </MenuItem>
      <MenuItem
        onClick={onMenuItemClick}
        data={{ action: ContextMenuAction.SHOW_THUMBNAIL_DIRECTORY }}
      >
        Show thumbnail directory
      </MenuItem>
      <MenuItem
        onClick={onMenuItemClick}
        data={{ action: ContextMenuAction.REMOVE_THUMBNAIL }}
      >
        Remove thumbnail
      </MenuItem>
    </ContextMenu>
  );
};

interface ThumbnailContextMenuProps {
  config: AppConfig;
  item: ComputedPlayListItem;
  thumbnailFilePath: string;
}

export default ThumbnailContextMenu;
