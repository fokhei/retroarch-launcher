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
import { youtubeSearch } from "../libs/youtubeSearch";
import { GameItemState } from "../states/gameItemState";
import { addToBookmark, removeFromBookmark } from "../actions/bookmark";


const id = ContextMenuId.GAME_ITEM;

const GameItemContextMenu = (props: GameItemContextMenuProps) => {
  const { dispatch, appConfig, gameItem, trigger } = props;

  const enabled = Boolean(trigger && trigger.item);

  let inBookmark = false;
  if (enabled) {
    inBookmark = gameItem.bookmarkIds.includes(trigger.item.id);
  }


  const onPlay = () => {
    dispatch(setPlayerPicker(true));
  };

  const onOpenRom = () => {
    remote.shell.openItem(trigger.item.romPath);
  };
  const onExploreRom = () => {
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
  const onYoutubeSearch = () => {
    youtubeSearch(appConfig, trigger.item);
  };

  const onBookmark = () => {
    if (inBookmark) {
      dispatch(removeFromBookmark([trigger.item.id], gameItem))
    } else {
      dispatch(addToBookmark([trigger.item.id], gameItem))
    }
  };

  const createMenuItemForBookmark = () => {
    const label = inBookmark ? "Remove from bookmark" : "Add to bookmark";
    return createMenuItem(label, onBookmark, enabled)
  }






  return (
    <ContextMenu id={id}>
      {createMenuItem("Play with...", onPlay, enabled)}
      {createMenuItemForBookmark()}
      {createMenuItem("Open rom", onOpenRom, enabled)}
      {createMenuItem("Explore rom", onExploreRom, enabled)}
      {createMenuItem("Download thumbnails", onDownloadThumbnail, enabled)}
      {createMenuItem("Google search image", onGoogleSearch, enabled)}
      {createMenuItem("TheGamesDB search", onTheGamesDbSearch, enabled)}
      {createMenuItem("Youtube search", onYoutubeSearch, enabled)}
    </ContextMenu>
  );
};

interface GameItemContextMenuProps {
  dispatch: Dispatch<any>;
  appConfig: AppConfigState;
  gameItem: GameItemState
  trigger: GameItemTriggerProps;
}

export interface GameItemTriggerProps {
  item: ComputedGameItem;
}

export default connectMenu(id)(GameItemContextMenu);
