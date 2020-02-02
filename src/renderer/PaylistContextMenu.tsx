import React from "react";
import { ContextMenu, MenuItem } from "react-contextmenu";
import { ContextMenuId } from "./ContextMenuId";
import { remote, ipcRenderer, clipboard } from "electron";
import { ContextMenuAction } from "./ContextMenuAction";
import { AppEvent } from "../libs/AppEvent";
import { CategoryAll } from "./MainView";
import AppConfig from "../libs/AppConfig";

const PaylistContextMenu = (props: PaylistContextMenuProps) => {
  const { category, config } = props;
  const onMenuItemClick = (_evt: any, data: any) => {
    //console.log("onMenuItemClick", data.action);
    const { action } = data;

    if (action == ContextMenuAction.COPY_PLAYLIST_NAME) {
      clipboard.writeText(category, "selection");
    } else if (action == ContextMenuAction.DOWNLOAD_PLAYLIST_THUMBNAILS) {
      ipcRenderer.send(AppEvent.DOWNLOAD_PLAYLIST_THUMBNAILS, category);
    } else if (action == ContextMenuAction.SHOW_PAYLIST_DIRECTORY) {
      const path = config.retroArch.playlists;
      if (category == CategoryAll) {
        remote.shell.openItem(path);
      } else {
        remote.shell.showItemInFolder(`${path}\\${category}.lpl`);
      }
    } else if (action == ContextMenuAction.REFRESH_PLAYLIST) {
      if (category == CategoryAll) {
        ipcRenderer.send(AppEvent.REFRESH_PLAYLISTS);
      } else {
        ipcRenderer.send(AppEvent.REFRESH_PLAYLIST, category);
      }
    } else if (action == ContextMenuAction.REMOVE_PLAYLIST) {
      ipcRenderer.send(AppEvent.REMOVE_PLAYLIST, category);
    }
  };

  return (
    <ContextMenu id={ContextMenuId.PLAYLIST}>
      <MenuItem
        onClick={onMenuItemClick}
        data={{ action: ContextMenuAction.COPY_PLAYLIST_NAME }}
      >
        Copy name
      </MenuItem>

      <MenuItem
        onClick={onMenuItemClick}
        data={{ action: ContextMenuAction.DOWNLOAD_PLAYLIST_THUMBNAILS }}
      >
        Download thumbnails
      </MenuItem>

      <MenuItem
        onClick={onMenuItemClick}
        data={{ action: ContextMenuAction.SHOW_PAYLIST_DIRECTORY }}
      >
        Show playlist directory
      </MenuItem>
      <MenuItem
        onClick={onMenuItemClick}
        data={{ action: ContextMenuAction.REFRESH_PLAYLIST }}
      >
        Refresh playlist
      </MenuItem>

      <MenuItem
        onClick={onMenuItemClick}
        data={{ action: ContextMenuAction.REMOVE_PLAYLIST }}
      >
        Remove playlist
      </MenuItem>
    </ContextMenu>
  );
};

interface PaylistContextMenuProps {
  config: AppConfig;
  category: string;
}

export default PaylistContextMenu;
