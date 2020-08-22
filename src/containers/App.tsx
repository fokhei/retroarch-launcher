import React, { useEffect, useState } from "react";
import { RootState } from "../states";
import { connect } from "react-redux";
import { AppConfigState } from "../states/appConfigState";
import { Dispatch } from "redux";
import { fetchAppConfig } from "../actions/fetchAppConfig";
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

enum WaitingFor {
  NONE,
  FETCH_APP_COFIG,
  FETCH_ITEMS,
  FETCH_FAVOUR,
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
  } = props;
  const [waiting, setWaiting] = useState<WaitingFor>(
    WaitingFor.FETCH_APP_COFIG
  );

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
    const { showPlayerPicker, selectedItemId } = explorer;
    if (showPlayerPicker && selectedItemId) {
      const hideHandler = () => {
        dispatch(setPlayerPicker(false));
      };
      return (
        <Modal>
          <PlayerPicker
            hideHandler={hideHandler}
            appConfig={appConfig}
            explorer={explorer}
            gameItem={gameItem}
          />
        </Modal>
      );
    }
    return null;
  };

  const renderESExporter = () => {
    const { showESExporter } = explorer;
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
        <CategoryContextMenu dispatch={dispatch} appConfig={appConfig} />
        <GameItemContextMenu dispatch={dispatch} appConfig={appConfig} />
        <GameNameContextMenu />
        <RomNameContextMenu />
        <SearchResultContextMenu dispatch={dispatch} />
        <ThumbnailContextMenu dispatch={dispatch} />
        <ThumbnailDropZoneContextMenu
          dispatch={dispatch}
          appConfig={appConfig}
        />
      </>
    );
  };

  const dispatchFetchAllItems = () => {
    setWaiting(WaitingFor.FETCH_ITEMS);
    dispatch(fetchAllItems(appConfig));
  };

  const mountEffect = () => {
    setWaiting(WaitingFor.FETCH_APP_COFIG);
    dispatch(fetchAppConfig());
  };

  const appConfigChangeEffect = () => {
    if (waiting == WaitingFor.FETCH_APP_COFIG) {
      const { success, error } = appConfig.fetch;
      if (error) throw error;
      if (success) {
        dispatchFetchAllItems();
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
        setWaiting(WaitingFor.NONE);
      }
    }
  };

  const favourChangeEffect = () => {
    if (waiting == WaitingFor.FETCH_FAVOUR) {
      const { error, success } = favour.fetch;
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
}
const mapStateToProps = (state: RootState) => {
  return {
    appConfig: state.appConfig,
    gameItem: state.gameItem,
    explorer: state.explorer,
    scanner: state.scanner,
    favour: state.favour,
  };
};
export default connect(mapStateToProps)(App);
