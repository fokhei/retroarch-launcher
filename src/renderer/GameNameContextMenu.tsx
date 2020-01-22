import React from "react";
import { ContextMenu, MenuItem } from "react-contextmenu";
import { ContextMenuId } from "./ContextMenuId";
import { clipboard } from "electron";
import { ContextMenuAction } from "./ContextMenuAction";
import { ComputedPlayListItem } from "../libs/ComputedPlaylistItem";

const GameNameContextMenu = (props: GameNameContextMenuProps) => {
  const { item } = props;

  const onMenuItemClick = (_evt: any, data: any) => {
    const { action } = data;
    if (action == ContextMenuAction.COPY_GAME_LABEL_TO_CLIPBOARD) {
      clipboard.writeText(item.label, "selection");
    }
  };

  return (
    <ContextMenu id={ContextMenuId.GAME_NAME}>
      <MenuItem
        onClick={onMenuItemClick}
        data={{ action: ContextMenuAction.COPY_GAME_LABEL_TO_CLIPBOARD }}
      >
        Copy game name
      </MenuItem>
    </ContextMenu>
  );
};

interface GameNameContextMenuProps {
  item: ComputedPlayListItem;
}

export default GameNameContextMenu;
