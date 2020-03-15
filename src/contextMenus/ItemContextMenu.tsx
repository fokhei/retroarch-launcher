import React from "react";
import { ContextMenu, MenuItem } from "react-contextmenu";
import { ContextMenuId } from "../renderer/ContextMenuId";
import { remote, ipcRenderer } from "electron";
import { ContextMenuAction } from "../renderer/ContextMenuAction";
import { ComputedPlayListItem } from "../libs/ComputedPlaylistItem";
import { AppEvent } from "../libs/AppEvent";
import AppConfig from "../libs/AppConfig";
import { googleSearch } from "../libs/googleSearch";

const ItemContextMenu = (props: ItemContextMenuProps) => {
  const { config, item, playOnRetroArch } = props;

  const onMenuItemClick = (_evt: any, data: any) => {
    //console.log("onMenuItemClick", data.action);
    const { action } = data;

    if (action == ContextMenuAction.PLAY_ON_RETROARCH) {
      playOnRetroArch();
    } else if (action == ContextMenuAction.OPEN_GAME_ITEM) {
      remote.shell.openItem(item.path);
    } else if (action == ContextMenuAction.SHOW_GAME_ITEM_DIRECTORY) {
      remote.shell.showItemInFolder(item.path);
    } else if (action == ContextMenuAction.DOWNLOAD_THUMBNAILS) {
      ipcRenderer.send(AppEvent.DOWNLOAD_THUMBNAILS, item);
    } else if (action == ContextMenuAction.GOOGLE_SEARCH_GAME_ITEM) {
      googleSearch(config, item);
    }
  };

  return (
    <ContextMenu id={ContextMenuId.GAME_ITEM}>
      <MenuItem
        onClick={onMenuItemClick}
        data={{ action: ContextMenuAction.PLAY_ON_RETROARCH }}
      >
        Play on Retroarch
      </MenuItem>
      <MenuItem
        onClick={onMenuItemClick}
        data={{ action: ContextMenuAction.OPEN_GAME_ITEM }}
      >
        Open rom
      </MenuItem>
      <MenuItem
        onClick={onMenuItemClick}
        data={{ action: ContextMenuAction.SHOW_GAME_ITEM_DIRECTORY }}
      >
        Show rom directory
      </MenuItem>
      <MenuItem
        onClick={onMenuItemClick}
        data={{ action: ContextMenuAction.DOWNLOAD_THUMBNAILS }}
      >
        Download thumbnails
      </MenuItem>
      <MenuItem
        onClick={onMenuItemClick}
        data={{ action: ContextMenuAction.GOOGLE_SEARCH_GAME_ITEM }}
      >
        Google search image
      </MenuItem>
    </ContextMenu>
  );
};

interface ItemContextMenuProps {
  config: AppConfig;
  item: ComputedPlayListItem;
  playOnRetroArch: () => void;
}

export default ItemContextMenu;
