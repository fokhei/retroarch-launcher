import React from "react";
import { ContextMenu, connectMenu } from "react-contextmenu";
import { Dispatch } from "redux";
import { scanTeknoParrotProfiles } from "../actions/scanTeknoParrotProfiles";
import { AppConfigState } from "../states/appConfigState";
import { MappingState } from "../states/mappingState";
import { ContextMenuId } from "./ContextMenuId";
import { createMenuItem } from "./createMenuItem";

const id = ContextMenuId.SETTING;

const SettingContextMenu = (props: SettingContextMenuProps) => {
  const { dispatch, appConfig, mapping } = props;

  const enabled = true;

  const onFetchTeknoParrotProiles = () => {
    dispatch(scanTeknoParrotProfiles(appConfig, mapping));
  };

  return (
    <ContextMenu id={id}>
      {createMenuItem(
        "Fetch TeknoParrot Game Profiles",
        onFetchTeknoParrotProiles,
        enabled
      )}
    </ContextMenu>
  );
};

interface SettingContextMenuProps {
  trigger: SettingTriggerProps;
  dispatch: Dispatch<any>;
  appConfig: AppConfigState;
  mapping: MappingState;
}

export interface SettingTriggerProps {}

export default connectMenu(id)(SettingContextMenu);
