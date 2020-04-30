import React from "react";
import { ContextMenu, connectMenu } from "react-contextmenu";
import { ContextMenuId } from "./ContextMenuId";
import { clipboard } from "electron";
import { createMenuItem } from "./createMenuItem";

const id = ContextMenuId.ROM_NAME;

const RomNameContextMenu = (props: RomNameContextMenuProps) => {
  const { trigger } = props;
  const enabled = Boolean(trigger && trigger.romPath);

  const onCopy = () => {
    clipboard.writeText(trigger.romPath, "selection");
  };

  return (
    <ContextMenu id={id}>
      {createMenuItem("Copy rom path", onCopy, enabled)}
    </ContextMenu>
  );
};

interface RomNameContextMenuProps {
  trigger: RomNameTriggerProps;
}

export interface RomNameTriggerProps {
  romPath: string;
}

export default connectMenu(id)(RomNameContextMenu);
