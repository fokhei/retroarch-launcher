import React from "react";
import { ContextMenu, MenuItem } from "react-contextmenu";
import { ContextMenuId } from "../renderer/ContextMenuId";
import { clipboard } from "electron";
import { ContextMenuAction } from "../renderer/ContextMenuAction";
import { ComputedPlayListItem } from "../libs/ComputedPlaylistItem";

const RomNameContextMenu = (props: RomNameContextMenuProps) => {
  const { item } = props;

  const onMenuItemClick = (_evt: any, data: any) => {
    const { action } = data;
    if (action == ContextMenuAction.COPY_GAME_PATH_TO_CLIPBOARD) {
      clipboard.writeText(item.path, "selection");
    }
  };

  return (
    <ContextMenu id={ContextMenuId.ROM_PATH}>
      <MenuItem
        onClick={onMenuItemClick}
        data={{ action: ContextMenuAction.COPY_GAME_PATH_TO_CLIPBOARD }}
      >
        Copy rom path
      </MenuItem>
    </ContextMenu>
  );
};

interface RomNameContextMenuProps {
  item: ComputedPlayListItem;
}

export default RomNameContextMenu;
