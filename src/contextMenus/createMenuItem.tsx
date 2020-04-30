import React from "react";
import { MenuItem } from "react-contextmenu";

export const createMenuItem = (
  label: string,
  clickHandler: any,
  enabled: boolean
) => {
  return (
    <MenuItem onClick={clickHandler} disabled={!enabled}>
      {label}
    </MenuItem>
  );
};
