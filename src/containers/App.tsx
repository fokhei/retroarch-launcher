import React, { useEffect, useState } from "react";
import { RootState } from "../states";
import { connect } from "react-redux";
import { AppConfigState } from "../states/appConfigState";
import { Dispatch } from "redux";
import { fetchCategories } from "../actions/fetchCategories";
import BusyIcon from "../components/BusyIcon";
import styled from "styled-components";
import Explorer from "./Explorer";
import Scanner from "./Scanner";
import Modal from "../components/Modal";
import { ScannerState } from "../states/scannerState";
import { GameItemState } from "../states/gameItemState";
import CategoryContextMenu from "../contextMenus/CategoryContextMenu";
import { ExplorerState } from "../states/explorerState";
import { fetchAllItems } from "../actions/fetchAllItems";
import GameItemContextMenu from "../contextMenus/GameItemContextMenu";
import GameNameContextMenu from "../contextMenus/GameNameContextMenu";
import RomNameContextMenu from "../contextMenus/RomNameContextMenu";
import ThumbnailContextMenu from "../contextMenus/ThumbnailContextMenu";
import ThumbnailDropZoneContextMenu from "../contextMenus/ThumbnailDropZoneContextMenu";
import PlayerPicker from "../components/PlayerPicker";
import { setPlayerPicker } from "../actions/setPlayerPicker";
import { NotificationContainer } from "react-notifications";
import { FavourState } from "../states/favourState";
import { fetchFavour } from "../actions/fetchFavour";
import SearchResultContextMenu from "../contextMenus/SearchResultContextMenu";
import ESExporter from "./ESExporter";
import { fetchUIConfig } from "../actions/fetchUI";
import { ipcRenderer } from "electron";
import { AppEvent } from "../interfaces/AppEvent";
import { fetchDir } from "../actions/fetchDir";
import { fetchExternalApps } from "../actions/fetchExternalApps";
import SettingContextMenu from "../contextMenus/SettingContextMenu";
import { MappingState } from "../states/mappingState";
import { fetchMapping } from "../actions/fetchMapping";

enum WaitingFor {
  NONE,
  FETCH_DIR,
  FETCH_EXTERNAL_APPS,
  FETCH_CATEGORIES,
  FETCH_ITEMS,
  FETCH_FAVOUR,
  FECTH_UI_CONFIG,
  FETCH_MAPPING,
}

const _App = (props: AppProps) => {
  const {
    className,
    dispatch,
    appConfig,
    gameItem,
    explorer,
    scanner,
    favour,
    mapping,
  } = props;
  const [waiting, setWaiting] = useState<WaitingFor>(WaitingFor.FETCH_DIR);

  const { explorerConfig, showPlayerPicker, showESExporter } = explorer;
  const { selectedItemId } = explorerConfig;

  const renderExplorer = () => {
    if (waiting != WaitingFor.NONE) {
      return (
        <div className="busy">
          <BusyIcon />
        </div>
      );
    }
    return <Explorer />;
  };

  const renderScanner = () => {
    if (waiting == WaitingFor.NONE && scanner.visible) {
      return (
        <Modal>
          <Scanner />
        </Modal>
      );
    }
    return null;
  };

  const renderPlayerPicker = () => {
    if (showPlayerPicker && selectedItemId) {
      const hideHandler = () => {
        dispatch(setPlayerPicker(false));
      };
      return (
        <Modal>
          <PlayerPicker
            hideHandler={hideHandler}
            appConfig={appConfig}
            mapping={mapping}
            explorer={explorer}
            gameItem={gameItem}
          />
        </Modal>
      );
    }
    return null;
  };

  const renderESExporter = () => {
    if (showESExporter) {
      return (
        <Modal>
          <ESExporter />
        </Modal>
      );
    }
    return null;
  };

  const renderContextMenus = () => {
    return (
      <>
        <SettingContextMenu
          dispatch={dispatch}
          appConfig={appConfig}
          mapping={mapping}
        />
        <GameItemContextMenu dispatch={dispatch} appConfig={appConfig} />
        <GameNameContextMenu />
        <RomNameContextMenu />
        <SearchResultContextMenu dispatch={dispatch} />
        <ThumbnailContextMenu dispatch={dispatch} />
        <ThumbnailDropZoneContextMenu
          dispatch={dispatch}
          appConfig={appConfig}
        />
        <CategoryContextMenu
          dispatch={dispatch}
          appConfig={appConfig}
          gameItem={gameItem}
        />
      </>
    );
  };

  const mountEffect = () => {
    setWaiting(WaitingFor.FETCH_DIR);
    dispatch(fetchDir());
  };

  const appConfigChangeEffect = () => {
    if (waiting == WaitingFor.FETCH_DIR) {
      const { success, error } = appConfig.remotes.dir;
      if (error) throw error;
      if (success) {
        setWaiting(WaitingFor.FETCH_EXTERNAL_APPS);
        dispatch(fetchExternalApps(appConfig.appDataDir));
      }
    } else if (waiting == WaitingFor.FETCH_EXTERNAL_APPS) {
      const { success, error } = appConfig.remotes.externalApps;
      if (error) throw error;
      if (success) {
        setWaiting(WaitingFor.FETCH_CATEGORIES);
        dispatch(fetchCategories(appConfig.appDataDir));
      }
    } else if (waiting == WaitingFor.FETCH_CATEGORIES) {
      const { success, error } = appConfig.remotes.categories;
      if (error) throw error;
      if (success) {
        ipcRenderer.sendSync(AppEvent.SET_APP_CONFIG, appConfig);
        setWaiting(WaitingFor.FETCH_ITEMS);
        dispatch(fetchAllItems(appConfig));
      }
    }
  };

  const gameItemChangeEffect = () => {
    if (waiting == WaitingFor.FETCH_ITEMS) {
      const { success, error } = gameItem.fetch;
      if (error) throw error;
      if (success) {
        setWaiting(WaitingFor.FETCH_FAVOUR);
        dispatch(fetchFavour(appConfig.appDataDir));
      }
    }
  };

  const favourChangeEffect = () => {
    if (waiting == WaitingFor.FETCH_FAVOUR) {
      const { error, success } = favour.fetch;
      if (error) throw error;
      if (success) {
        setWaiting(WaitingFor.FECTH_UI_CONFIG);
        dispatch(fetchUIConfig(appConfig.appDataDir));
      }
    }
  };

  const explorerChangeEffect = () => {
    if (waiting == WaitingFor.FECTH_UI_CONFIG) {
      if (explorer.fetched) {
        ipcRenderer.sendSync(
          AppEvent.SET_EXPLORER_CONFIG,
          explorer.explorerConfig
        );
        ipcRenderer.sendSync(AppEvent.SET_ITEM_FILTER, gameItem.itemFilter);
        setWaiting(WaitingFor.FETCH_MAPPING);
        dispatch(fetchMapping(appConfig));
      }
    }
  };

  const mappingChangeEffect = () => {
    if (waiting == WaitingFor.FETCH_MAPPING) {
      const { error, success } = mapping.remotes.fetch;
      if (error) throw error;
      if (success) {
        setWaiting(WaitingFor.NONE);
      }
    }
  };

  useEffect(mountEffect, []);
  useEffect(appConfigChangeEffect, [appConfig]);
  useEffect(gameItemChangeEffect, [gameItem]);
  useEffect(favourChangeEffect, [favour]);
  useEffect(explorerChangeEffect, [explorer]);
  useEffect(mappingChangeEffect, [mapping]);


  return (
    <div className={className}>
      {renderExplorer()}
      {renderScanner()}
      {renderPlayerPicker()}
      {renderESExporter()}
      {renderContextMenus()}
      <NotificationContainer />
    </div>
  );
};

const App = styled(_App)`
  width: 100%;
  height: 100%;
  overflow: hidden;

  > .busy {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

interface AppProps {
  className?: string;
  dispatch: Dispatch<any>;
  appConfig: AppConfigState;
  gameItem: GameItemState;
  explorer: ExplorerState;
  scanner: ScannerState;
  favour: FavourState;
  mapping: MappingState;
}
const mapStateToProps = (state: RootState) => {
  return {
    appConfig: state.appConfig,
    gameItem: state.gameItem,
    explorer: state.explorer,
    scanner: state.scanner,
    favour: state.favour,
    mapping: state.mapping,
  };
};
export default connect(mapStateToProps)(App);
