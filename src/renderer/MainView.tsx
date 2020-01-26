import React, { useEffect, useState } from "react";
import { AppEvent } from "../libs/AppEvent";
import styled from "styled-components";
import { ipcRenderer, remote } from "electron";
import PlayListMenu from "./PlayListMenu";
import ResultView from "./ResultView";
import { ComputedPlayListItem } from "../libs/ComputedPlaylistItem";
import { ComputedPlayListMap } from "../libs/ComputedPlayListMap";
import RightBar from "./RightBar";
import child_process from "child_process";
import ItemContextMenu from "./ItemContextMenu";
import ThumbnailContextMenu from "./ThumbnailContextMenu";
import PaylistContextMenu from "./PaylistContextMenu";
import GameNameContextMenu from "./GameNameContextMenu";
import RomNameContextMenu from "./RomNameContextMenu";
import DropZoneContextMenu from "./DropZoneContextMenu";
import { ThumbnailInfo } from "../libs/ThumbnailInfos";

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
  const [missingThumbnailInfos, setMissingThumbnailInfos] = useState<
    Array<ThumbnailInfo>
  >([]);
  const [gridSize, setGridSize] = useState(160);
  const [renderTime, setRenderTime] = useState(new Date().getTime());

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

  const onMissingThumbnailInfos = (_evt: any, infos: Array<ThumbnailInfo>) => {
    setMissingThumbnailInfos(infos);
  };

  const playOnRetroArch = () => {
    if (config) {
      const { path, core_path } = item;
      if (core_path) {
        child_process.spawn(config.retroArch.exe, ["-L", core_path, path], {
          shell: true
        });
      } else {
        alert("core_path is not yet set on this item.");
      }
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
          gridSize={gridSize}
          setGridSize={setGridSize}
          config={config}
          items={items}
          lpls={lpls}
          category={category}
          keyword={keyword}
          itemId={itemId}
          setItemId={onSetItem}
          item={item}
          executeHandler={onExecuteItem}
          missingThumbnailInfos={missingThumbnailInfos}
          renderTime={renderTime}
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
          renderTime={renderTime}
        />
      );
    }
    return undefined;
  };

  const mountEffect = () => {
    ipcRenderer.on(AppEvent.CRITICAL_ERROR, onCriticalError);
    ipcRenderer.on(AppEvent.CONFIG, onAppConfig);
    ipcRenderer.on(AppEvent.PLAYLISTS, onPlayLists);
    ipcRenderer.on(AppEvent.ITEM_UPDATE, reRender);
    ipcRenderer.on(AppEvent.MISSING_THUMBNAIL_INFOS, onMissingThumbnailInfos);
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
      <GameNameContextMenu item={item} />
      <RomNameContextMenu item={item} />
      <PaylistContextMenu config={config} category={category} />
      <ItemContextMenu
        config={config}
        item={item}
        playOnRetroArch={playOnRetroArch}
      />
      <DropZoneContextMenu config={config} item={item} />
      <ThumbnailContextMenu
        config={config}
        item={item}
        thumbnailFilePath={thumbnailFilePath}
      />
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
