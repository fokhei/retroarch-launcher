import React from "react";
import { ContextMenu, MenuItem } from "react-contextmenu";
import { ContextMenuId } from "./ContextMenuId";
import { remote, shell, clipboard } from "electron";
import { ContextMenuAction } from "./ContextMenuAction";
import { toGoogleKeyword } from "../libs/toGoogleKeyword";
import { ComputedPlayListItem } from "../libs/ComputedPlaylistItem";

const ItemContextMenu = (props: ItemContextMenuProps) => {
  const { item, playOnRetroArch } = props;

  const onMenuItemClick = (_evt: any, data: any) => {
    //console.log("onMenuItemClick", data.action);
    const { action } = data;

    if (action == ContextMenuAction.PLAY_ON_RETROARCH) {
      playOnRetroArch();
    } else if (action == ContextMenuAction.OPEN_GAME_ITEM) {
      remote.shell.openItem(item.path);
    } else if (action == ContextMenuAction.SHOW_GAME_ITEM_DIRECTORY) {
      remote.shell.showItemInFolder(item.path);
    } else if (action == ContextMenuAction.GOOGLE_SEARCH_GAME_ITEM) {
      const q = toGoogleKeyword(item.label);
      shell.openExternal(`https://www.google.com/search?tbm=isch&q=${q}`);
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
        data={{ action: ContextMenuAction.GOOGLE_SEARCH_GAME_ITEM }}
      >
        Google search image
      </MenuItem>

     
    </ContextMenu>
  );
};

interface ItemContextMenuProps {
  item: ComputedPlayListItem;
  playOnRetroArch: () => void;
}

export default ItemContextMenu;
