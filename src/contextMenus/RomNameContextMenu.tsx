import React from "react";
import { ContextMenu, connectMenu } from "react-contextmenu";
import { ContextMenuId } from "./ContextMenuId";
import { clipboard } from "electron";
import { createMenuItem } from "./createMenuItem";
import * as path from "path";
import { getValidFileExt } from '../libs/getValidFileExt';

const id = ContextMenuId.ROM_NAME;

const RomNameContextMenu = (props: RomNameContextMenuProps) => {
  const { trigger } = props;
  const enabled = Boolean(trigger && trigger.romPath);

  const onCopyName = () => {
    const basename = path.basename(trigger.romPath);
    const ext = getValidFileExt(basename);
    const noExt = basename.replace(ext, "");
    clipboard.writeText(noExt, "selection");
  };

  const onCopyPath = () => {
    clipboard.writeText(trigger.romPath, "selection");
  };

  return (
    <ContextMenu id={id}>
      {createMenuItem("Copy rom name", onCopyName, enabled)}
      {createMenuItem("Copy rom path", onCopyPath, enabled)}
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
