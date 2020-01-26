import React from "react";
import { ContextMenu, MenuItem } from "react-contextmenu";
import { ipcRenderer, remote } from "electron";
import { ContextMenuAction } from "./ContextMenuAction";
import { ComputedPlayListItem } from "../libs/ComputedPlaylistItem";
import { ThumbnailType } from "../libs/ThumbnailType";
import { AppEvent } from "../libs/AppEvent";

const DropZoneContextMenu = (props: DropZoneContextMenuProps) => {
  const { config, item } = props;

  const onMenuItemClick = (_evt: any, data: any) => {
    const { action } = data;
    if (action == ContextMenuAction.DOWNLOAD_BOXART) {
      ipcRenderer.send(AppEvent.DOWNLOAD_THUMBNAIL, item, ThumbnailType.BOX);
    } else if (action == ContextMenuAction.DOWNLOAD_TITLESCREEN) {
      ipcRenderer.send(AppEvent.DOWNLOAD_THUMBNAIL, item, ThumbnailType.TITLE);
    } else if (action == ContextMenuAction.DOWNLOAD_SNAPSHOT) {
      ipcRenderer.send(AppEvent.DOWNLOAD_THUMBNAIL, item, ThumbnailType.SNAP);
    } else if (action == ContextMenuAction.SHOW_BOX_THUMBNAIL_DIRECTORY) {
      let path = config.retroArch.dir.thumbnails;
      path += "\\" + item.category + "\\" + ThumbnailType.BOX + "\\";
      remote.shell.openItem(path);
    } else if (action == ContextMenuAction.SHOW_TITLE_THUMBNAIL_DIRECTORY) {
      let path = config.retroArch.dir.thumbnails;
      path += "\\" + item.category + "\\" + ThumbnailType.TITLE + "\\";
      remote.shell.openItem(path);
    } else if (action == ContextMenuAction.SHOW_SNAP_THUMBNAIL_DIRECTORY) {
      let path = config.retroArch.dir.thumbnails;
      path += "\\" + item.category + "\\" + ThumbnailType.SNAP + "\\";
      remote.shell.openItem(path);
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
        <MenuItem
          onClick={onMenuItemClick}
          data={{ action: ContextMenuAction.SHOW_BOX_THUMBNAIL_DIRECTORY }}
        >
          Show thumbnail directory
        </MenuItem>
      </ContextMenu>
      <ContextMenu id={ThumbnailType.TITLE}>
        <MenuItem
          onClick={onMenuItemClick}
          data={{ action: ContextMenuAction.DOWNLOAD_TITLESCREEN }}
        >
          Download title screen
        </MenuItem>
        <MenuItem
          onClick={onMenuItemClick}
          data={{ action: ContextMenuAction.SHOW_TITLE_THUMBNAIL_DIRECTORY }}
        >
          Show thumbnail directory
        </MenuItem>
      </ContextMenu>
      <ContextMenu id={ThumbnailType.SNAP}>
        <MenuItem
          onClick={onMenuItemClick}
          data={{ action: ContextMenuAction.DOWNLOAD_SNAPSHOT }}
        >
          Download snapshot
        </MenuItem>
        <MenuItem
          onClick={onMenuItemClick}
          data={{ action: ContextMenuAction.SHOW_SNAP_THUMBNAIL_DIRECTORY }}
        >
          Show thumbnail directory
        </MenuItem>
      </ContextMenu>
    </>
  );
};

interface DropZoneContextMenuProps {
  config: AppConfig;
  item: ComputedPlayListItem;
}

export default DropZoneContextMenu;
