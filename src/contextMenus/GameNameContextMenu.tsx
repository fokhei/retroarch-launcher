import React from "react";
import { ContextMenu, connectMenu } from "react-contextmenu";
import { ContextMenuId } from "./ContextMenuId";
import { clipboard } from "electron";
import { createMenuItem } from "./createMenuItem";

const id = ContextMenuId.GAME_NAME;

const GameNameContextMenu = (props: GameNameContextMenuProps) => {
  const { trigger } = props;
  const enabled = Boolean(trigger && trigger.gameName);

  const onCopy = () => {
    clipboard.writeText(trigger.gameName, "selection");
  };

  return (
    <ContextMenu id={id}>
      {createMenuItem("Copy game name", onCopy, enabled)}
    </ContextMenu>
  );
};

interface GameNameContextMenuProps {
  trigger: GameNameTriggerProps;
}

export interface GameNameTriggerProps {
  gameName: string;
}

export default connectMenu(id)(GameNameContextMenu);
