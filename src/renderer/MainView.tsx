import React, { useEffect, useState } from "react";
import { AppEvent } from "../libs/AppEvent";
import styled from "styled-components";
import { ipcRenderer, remote, shell, clipboard } from "electron";
import PlayListMenu from "./PlayListMenu";
import ResultView from "./ResultView";
import { ComputedPlayListItem } from "../libs/ComputedPlaylistItem";
import { ComputedPlayListMap } from "../libs/ComputedPlayListMap";
import RightBar from "./RightBar";
import { ContextMenu, MenuItem } from "react-contextmenu";
import { ContextMenuId } from "./ContextMenuId";
import { ContextMenuAction } from "./ContextMenuAction";
import child_process from "child_process";
import { toGoogleKeyword } from '../libs/toGoogleKeyword';

enum WaitingFor {
  NONE,
  DATAS
}

export const CategoryAll = "All Playlist";

const _MainView = (props: MainViewProps) => {
  const { className } = props;
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [lpls, setLpls] = useState<Array<string>>([]);
  const [items, setItems] = useState<Array<ComputedPlayListItem>>([]);
  const [itemsMap, setItemsMap] = useState<ComputedPlayListMap>({});
  const [waiting, setWaiting] = useState<WaitingFor>(WaitingFor.DATAS);
  const [category, setCategory] = useState<string>(CategoryAll);
  const [keyword, setKeyword] = useState("");
  const [itemId, setItemId] = useState(0);
  const [thumbnailFilePath, setThumbnailFilePath] = useState("");
  const [, setRenderTime] = useState(new Date().getTime());

  const reRender = () => {
    setRenderTime(new Date().getTime());
  };

  let item: ComputedPlayListItem | null = null;
  if (itemId > 0) {
    item = itemsMap[itemId.toString()];
  }

  const onCriticalError = (_evt: any, error: string) => {
    alert(error);
    remote.getCurrentWindow().close();
  };

  const onAppConfig = (_evt: any, config: AppConfig) => {
    setConfig(config);
    ipcRenderer.send(AppEvent.REFRESH_PLAYLISTS);
  };

  const onPlayLists = (
    _evt: any,
    lpls: Array<string>,
    items: Array<ComputedPlayListItem>,
    itemsMap: ComputedPlayListMap
  ) => {
    setLpls(lpls);
    setItems(items);
    setItemsMap(itemsMap);
    setWaiting(WaitingFor.NONE);
    reRender();
  };


  const onExecuteItem = () => {
    playOnRetroArch();
  };

  const onSetCategory = (category: string) => {
    setThumbnailFilePath("");
    setItemId(0);
    setCategory(category);
  };

  const onSetItem = (itemId: number) => {
    setThumbnailFilePath("");
    setItemId(itemId);
  };


  const playOnRetroArch = () => {
    if (config) {
      const { path, core_path } = item;
      if (core_path) {
        child_process.spawn(config.retroArch.exe, ["-L", core_path, path], {
          shell: true
        });
      } else {
        alert("core_path is not yet set on this item.")
      }
    }
  };


  const onMenuItemClick = (_evt: any, data: any) => {
    //console.log("onMenuItemClick", data.action);
    const { action } = data;
    if (action == ContextMenuAction.SHOW_PAYLIST_DIRECTORY) {
      const path = config.retroArch.dir.playlists;
      if (category == CategoryAll) {
        remote.shell.openItem(path);
      } else {
        remote.shell.showItemInFolder(`${path}\\${category}.lpl`);
      }
    } else if (action == ContextMenuAction.REFRESH_PLAYLIST) {
      if (category == CategoryAll) {
        ipcRenderer.send(AppEvent.REFRESH_PLAYLISTS);
      } else {
        ipcRenderer.send(AppEvent.REFRESH_PLAYLIST, category);
      }
    } else if (action == ContextMenuAction.PLAY_ON_RETROARCH) {
      playOnRetroArch();
    } else if (action == ContextMenuAction.OPEN_GAME_ITEM) {
      remote.shell.openItem(item.path);
    } else if (action == ContextMenuAction.SHOW_GAME_ITEM_DIRECTORY) {
      remote.shell.showItemInFolder(item.path);
    } else if (action == ContextMenuAction.GOOGLE_SEARCH_GAME_ITEM) {
      const q = toGoogleKeyword(item.label);
      shell.openExternal(
        `https://www.google.com/search?tbm=isch&q=${q}`
      );
    } else if (action == ContextMenuAction.COPY_GAME_LABEL_TO_CLIPBOARD) {
      clipboard.writeText(item.label, "selection");
    } else if (action == ContextMenuAction.COPY_GAME_PATH_TO_CLIPBOARD) {
      clipboard.writeText(item.path, "selection");
    } else if (action == ContextMenuAction.SHOW_THUMBNAIL_DIRECTORY) {
      if (thumbnailFilePath) {
        remote.shell.showItemInFolder(thumbnailFilePath);
      } else {
        remote.shell.openItem(config.retroArch.dir.thumbnails);
      }
    } else if (action == ContextMenuAction.REMOVE_THUMBNAIL) {
      if (item && thumbnailFilePath) {
        ipcRenderer.send(AppEvent.REMOVE_THUMBNAIL, item, thumbnailFilePath);
      }
    } else {
      console.warn(`unknown ContextMenuAction: ${action}`);
    }
  };

 

  const renderPlayLists = () => {
    if (waiting == WaitingFor.NONE) {
      return (
        <PlayListMenu
          lpls={lpls}
          category={category}
          setCategory={onSetCategory}
          setKeyword={setKeyword}
        />
      );
    }
    return undefined;
  };

  const renderResultView = () => {
    if (waiting == WaitingFor.NONE) {
      return (
        <ResultView
          config={config}
          items={items}
          lpls={lpls}
          category={category}
          keyword={keyword}
          itemId={itemId}
          setItemId={onSetItem}
          item={item}
          executeHandler={onExecuteItem}
        />
      );
    }
    return undefined;
  };

  const renderRightBar = () => {
    if (waiting == WaitingFor.NONE) {
      return (
        <RightBar
          config={config}
          item={item}
          thumbnailFilePath={thumbnailFilePath}
          setThumbnailFilePath={setThumbnailFilePath}
        />
      );
    }
    return undefined;
  };

  const renderPaylistContextMenu = () => {
    return (
      <ContextMenu id={ContextMenuId.PLAYLIST}>
        <MenuItem
          onClick={onMenuItemClick}
          data={{ action: ContextMenuAction.SHOW_PAYLIST_DIRECTORY }}
        >
          Show playlist directory
        </MenuItem>

        <MenuItem
          onClick={onMenuItemClick}
          data={{ action: ContextMenuAction.REFRESH_PLAYLIST }}
        >
          Refresh playlist
        </MenuItem>
      </ContextMenu>
    );
  };

  const renderItemContextMenu = () => {
    return (
      <ContextMenu id={ContextMenuId.GAME_ITEM}>
        <MenuItem
          onClick={onMenuItemClick}
          data={{ action: ContextMenuAction.PLAY_ON_RETROARCH }}
        >
          Play on Retroarch
        </MenuItem>
        <MenuItem
          onClick={onMenuItemClick}
          data={{ action: ContextMenuAction.OPEN_GAME_ITEM }}
        >
          Open rom
        </MenuItem>
        <MenuItem
          onClick={onMenuItemClick}
          data={{ action: ContextMenuAction.SHOW_GAME_ITEM_DIRECTORY }}
        >
          Show rom directory
        </MenuItem>
        <MenuItem
          onClick={onMenuItemClick}
          data={{ action: ContextMenuAction.GOOGLE_SEARCH_GAME_ITEM }}
        >
          Google search image
        </MenuItem>

        <MenuItem
          onClick={onMenuItemClick}
          data={{ action: ContextMenuAction.COPY_GAME_LABEL_TO_CLIPBOARD }}
        >
          Copy game name
        </MenuItem>

        <MenuItem
          onClick={onMenuItemClick}
          data={{ action: ContextMenuAction.COPY_GAME_PATH_TO_CLIPBOARD }}
        >
          Copy rom path
        </MenuItem>
      </ContextMenu>
    );
  };

  const renderThumbnailContextMenu = () => {
    return (
      <ContextMenu id={ContextMenuId.THUMBNAIL}>
        <MenuItem
          onClick={onMenuItemClick}
          data={{ action: ContextMenuAction.SHOW_THUMBNAIL_DIRECTORY }}
        >
          Show thumbnail directory
        </MenuItem>
        <MenuItem
          onClick={onMenuItemClick}
          data={{ action: ContextMenuAction.REMOVE_THUMBNAIL }}
        >
          Remove thumbnail
        </MenuItem>
      </ContextMenu>
    );
  };

  const mountEffect = () => {
    ipcRenderer.on(AppEvent.CRITICAL_ERROR, onCriticalError);
    ipcRenderer.on(AppEvent.CONFIG, onAppConfig);
    ipcRenderer.on(AppEvent.PLAYLISTS, onPlayLists);
    ipcRenderer.on(AppEvent.ITEM_UPDATE, reRender);
    ipcRenderer.send(AppEvent.MAIN_VIEW_MOUNT);
    return () => {
      ipcRenderer.removeListener(AppEvent.CRITICAL_ERROR, onCriticalError);
      ipcRenderer.removeListener(AppEvent.ITEM_UPDATE, reRender);
      ipcRenderer.removeListener(AppEvent.CONFIG, onAppConfig);
      ipcRenderer.removeListener(AppEvent.PLAYLISTS, onPlayLists);
    };
  };

  useEffect(mountEffect, []);
  return (
    <div className={className}>
      {renderPlayLists()}
      {renderResultView()}
      {renderRightBar()}
      {renderPaylistContextMenu()}
      {renderItemContextMenu()}
      {renderThumbnailContextMenu()}
    </div>
  );
};

const MainView = styled(_MainView)`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: row;
`;

interface MainViewProps {
  className?: string;
}

export default MainView;
