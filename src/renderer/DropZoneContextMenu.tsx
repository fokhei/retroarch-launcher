import React from "react";
import { ContextMenu, MenuItem } from "react-contextmenu";
import { ipcRenderer } from "electron";
import { ContextMenuAction } from "./ContextMenuAction";
import { ComputedPlayListItem } from "../libs/ComputedPlaylistItem";
import { ThumbnailType } from "../libs/ThumbnailType";
import { AppEvent } from "../libs/AppEvent";

const DropZoneContextMenu = (props: DropZoneContextMenuProps) => {
  const { item } = props;

  const onMenuItemClick = (_evt: any, data: any) => {
    const { action } = data;
    if (action == ContextMenuAction.DOWNLOAD_BOXART) {
      ipcRenderer.send(AppEvent.DOWNLOAD_THUMBNAIL, item, ThumbnailType.BOX);
    } else if (action == ContextMenuAction.DOWNLOAD_TITLESCREEN) {
      ipcRenderer.send(AppEvent.DOWNLOAD_THUMBNAIL, item, ThumbnailType.TITLE);
    } else if (action == ContextMenuAction.DOWNLOAD_SNAPSHOT) {
      ipcRenderer.send(AppEvent.DOWNLOAD_THUMBNAIL, item, ThumbnailType.SNAP);
    }
  };

  return (
    <>
      <ContextMenu id={ThumbnailType.BOX}>
        <MenuItem
          onClick={onMenuItemClick}
          data={{ action: ContextMenuAction.DOWNLOAD_BOXART }}
        >
          Download boxart
        </MenuItem>
      </ContextMenu>
      <ContextMenu id={ThumbnailType.TITLE}>
        <MenuItem
          onClick={onMenuItemClick}
          data={{ action: ContextMenuAction.DOWNLOAD_TITLESCREEN }}
        >
          Download title screen
        </MenuItem>
      </ContextMenu>
      <ContextMenu id={ThumbnailType.SNAP}>
        <MenuItem
          onClick={onMenuItemClick}
          data={{ action: ContextMenuAction.DOWNLOAD_SNAPSHOT }}
        >
          Download snapshot
        </MenuItem>
      </ContextMenu>
    </>
  );
};

interface DropZoneContextMenuProps {
  item: ComputedPlayListItem;
}

export default DropZoneContextMenu;
