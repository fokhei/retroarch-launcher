import React from "react";
import { AppConfigState } from "../states/appConfigState";
import { Dispatch } from "redux";
import { ContextMenu, connectMenu } from "react-contextmenu";
import { ContextMenuId } from "./ContextMenuId";
import { remote } from "electron";
import { ComputedGameItem } from "../interfaces/ComputedGameItem";
import { googleSearch } from "../libs/googleSearch";
import { scanMissingThumbnails } from "../actions/scanMissingThumbnails";
import { createMenuItem } from "./createMenuItem";
import { setPlayerPicker } from "../actions/setPlayerPicker";
import { theGamesDbSearch } from "../libs/theGamesDbSearch";

const id = ContextMenuId.GAME_ITEM;

const GameItemContextMenu = (props: GameItemContextMenuProps) => {
  const { dispatch, appConfig, trigger } = props;

  const enabled = Boolean(trigger && trigger.item);

  const onPlay = () => {
    dispatch(setPlayerPicker(true));
  };

  const onOpen = () => {
    remote.shell.openItem(trigger.item.romPath);
  };
  const onShow = () => {
    remote.shell.showItemInFolder(trigger.item.romPath);
  };
  const onDownloadThumbnail = () => {
    dispatch(scanMissingThumbnails([trigger.item], appConfig));
  };
  const onGoogleSearch = () => {
    googleSearch(appConfig, trigger.item);
  };
  const onTheGamesDbSearch = () => {
    theGamesDbSearch(appConfig, trigger.item);
  };


  return (
    <ContextMenu id={id}>
      {createMenuItem("Play with...", onPlay, enabled)}
      {createMenuItem("Open rom", onOpen, enabled)}
      {createMenuItem("Show rom directory", onShow, enabled)}
      {createMenuItem("Download thumbnails", onDownloadThumbnail, enabled)}
      {createMenuItem("Google search image", onGoogleSearch, enabled)}
      {createMenuItem("TheGamesDB search", onTheGamesDbSearch, enabled)}
    </ContextMenu>
  );
};

interface GameItemContextMenuProps {
  dispatch: Dispatch<any>;
  appConfig: AppConfigState;
  trigger: GameItemTriggerProps;
}

export interface GameItemTriggerProps {
  item: ComputedGameItem;
}

export default connectMenu(id)(GameItemContextMenu);
