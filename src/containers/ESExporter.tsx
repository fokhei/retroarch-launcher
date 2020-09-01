import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { RootState } from "../states";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
  exportToEmulationStation,
  exportToEmulationStationReset,
} from "../actions/exportToEmulationStation";
import { showESExporer } from "../actions/showESExporter";
import { ThumbnailType } from "../interfaces/ThumbnailType";
import { AppConfigState } from "../states/appConfigState";
import { GameItemState } from "../states/gameItemState";
import { NotificationManager } from "react-notifications";

const { dialog } = require("electron").remote;

const EMPTY_PATH = "...";

enum WaitingFor {
  NONE,
  EXPORT,
}

const _ESExporter = (props: ESExporterProps) => {
  const { className, dispatch, appConfig, gameItem } = props;
  const [distination, setDistination] = useState(EMPTY_PATH);
  const [exportFiles, setExportFiles] = useState(false);
  const [exportThumbnails, setExportThumbnails] = useState(false);

  const [thumbnailType, setThumbnailType] = useState<ThumbnailType>(
    ThumbnailType.SNAP
  );
  const [waiting, setWaiting] = useState<WaitingFor>(WaitingFor.NONE);

  const selectDistination = () => {
    const options: any = {
      title: "Distination",
      properties: ["openDirectory"],
    };
    const results = dialog.showOpenDialog(null, options);
    if (results && results.length) {
      setDistination(results[0]);
    } else {
      setDistination(EMPTY_PATH);
    }
  };

  const onExportFilesChange = (evt: any) => {
    setExportFiles(evt.target.checked);
  };

  const onExportThumbnailsChange = (evt: any) => {
    setExportThumbnails(evt.target.checked);
  };

  const onThumbnailTypeChange = (evt: any) => {
    const type = evt.target.value as ThumbnailType;
    setThumbnailType(type);
  };

  const onExport = () => {
    setWaiting(WaitingFor.EXPORT);
    dispatch(
      exportToEmulationStation(
        distination,
        exportFiles,
        exportThumbnails,
        thumbnailType,
        appConfig,
        gameItem
      )
    );
  };

  const onClose = () => {
    dispatch(showESExporer(false));
  };

  const renderThumbnailType = () => {
    if (exportThumbnails) {
      return (
        <div className="item">
          <div className="key">Thumbnail type: </div>
          <div className="value">
            <select value={thumbnailType} onChange={onThumbnailTypeChange}>
              <option value={ThumbnailType.BOX}>BoxArt</option>
              <option value={ThumbnailType.SNAP}>Snapshot</option>
              <option value={ThumbnailType.TITLE}>Title Screen</option>
            </select>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderActions = () => {
    if (waiting != WaitingFor.NONE) {
      return <div className="busy">Please wait ...</div>;
    }
    const exportEnable = distination != EMPTY_PATH;
    return (
      <div className="actions">
        <button disabled={!exportEnable} onClick={onExport}>
          Export
        </button>
        <button onClick={onClose}>Close</button>
      </div>
    );
  };

  const gameItemChangeEffect = () => {
    if (waiting == WaitingFor.EXPORT) {
      const { error, success } = gameItem.exportToES;

      if (error || success) {
        setWaiting(WaitingFor.NONE);
        if (error) {
          NotificationManager.error(
            error.toString(),
            "Fail to export",
            86400000 * 3
          );
        } else if (success) {
          NotificationManager.success("Export success!");
          onClose();
        }
        dispatch(exportToEmulationStationReset());
      }
    }
  };

  useEffect(gameItemChangeEffect, [gameItem.exportToES]);

  const { length } = gameItem.searchResults;
  return (
    <div className={className}>
      <div className="head">Export {length} game(s) to EmulationStation</div>
      <div className="body">
        <div className="item" onClick={selectDistination}>
          <div className="key">Roms distination : </div>
          <div className="value selector">{distination}</div>
        </div>

        <div className="item">
          <div className="key">Export files</div>
          <div className="value">
            <input
              type="checkbox"
              checked={exportFiles}
              onChange={onExportFilesChange}
            />
          </div>
        </div>

        <div className="item">
          <div className="key">Export thumbnails</div>
          <div className="value">
            <input
              type="checkbox"
              checked={exportThumbnails}
              onChange={onExportThumbnailsChange}
            />
          </div>
        </div>
        {renderThumbnailType()}
      </div>

      {renderActions()}
    </div>
  );
};

const ESExporter = styled(_ESExporter)`
  width: 480px;
  height: 320px;
  padding: 20px;
  border-radius: 10px;
  background-color: #000;
  display: flex;
  flex-direction: column;
  .head {
    color: #666;
    padding-bottom: 10px;
    margin-bottom: 20px;
    border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  }
  .body {
    flex: 1;
    .item {
      margin-top: 10px;
      display: flex;
      flex-wrap: nowrap;

      > .key {
        width: 150px;
      }

      > .value {
        flex: 1;
        &.selector {
          width: 100%;
          margin-top: 5px;
          padding: 5px;
          color: orange;
          border-radius: 5px;
          cursor: pointer;
          border: 1px solid orange;
          font-size: 11px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        select {
          margin-top: 5px;
        }
      }
    }
  }

  .actions,
  .busy {
    border-top: 1px solid rgba(100, 100, 100, 0.1);
    margin-top: 20px;
    padding-top: 10px;
    text-align: center;
    button + button {
      margin-left: 5px;
    }
  }

  .busy {
    color: #666;
  }
`;

interface ESExporterProps {
  className?: string;
  dispatch: Dispatch<any>;
  appConfig: AppConfigState;
  gameItem: GameItemState;
}

const mapStateToProps = (state: RootState) => {
  return {
    appConfig: state.appConfig,
    gameItem: state.gameItem,
  };
};

export default connect(mapStateToProps)(ESExporter);
