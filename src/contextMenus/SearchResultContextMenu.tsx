import React from "react";
import { ContextMenu, connectMenu } from "react-contextmenu";
import { ContextMenuId } from "./ContextMenuId";
import { createMenuItem } from "./createMenuItem";
import { ComputedGameItem } from "../interfaces/ComputedGameItem";
import { showESExporer } from "../actions/showESExporter";
import { Dispatch } from "redux";
import { CategoryAll } from "../libs/constants";

const id = ContextMenuId.SEARCH_RESULT;

const SearchResultContextMenu = (props: SearchResultContextMenuProps) => {
  const { dispatch, trigger } = props;
  const enabled = Boolean(
    trigger &&
    trigger.categoryName &&
    trigger.categoryName != CategoryAll &&
    trigger.searchResults &&
    trigger.searchResults.length
  );


  const onExportToDig = () => {

  };

  const onExportToEmulationStation = () => {
    dispatch(showESExporer(true));
  };

  return (
    <ContextMenu id={id}>
      {createMenuItem(
        "Export for EmulationStation",
        onExportToEmulationStation,
        enabled
      )}
      {createMenuItem(
        "Export for Dig",
        onExportToDig,
        enabled
      )}
    </ContextMenu>
  );
};

interface SearchResultContextMenuProps {
  dispatch: Dispatch<any>;
  trigger: SearchResultTriggerProps;
}

export interface SearchResultTriggerProps {
  categoryName: string;
  searchResults: Array<ComputedGameItem>;
}

export default connectMenu(id)(SearchResultContextMenu);
