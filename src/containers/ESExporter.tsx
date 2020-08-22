import React, { useState } from "react";
import styled from "styled-components";
import { RootState } from "../states";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { exportToEmulationStation } from "../actions/exportToEmulationStation";
import { showESExporer } from "../actions/showESExporter";
import { ThumbnailType } from "../interfaces/ThumbnailType";

const { dialog } = require("electron").remote;

const EMPTY_PATH = "...";

let lastRomDist = EMPTY_PATH;
let lastImgDist = EMPTY_PATH;

const _ESExporter = (props: ESExporterProps) => {
  const { className, dispatch, appConfig } = props;
  const [romDist, setRomDist] = useState(lastRomDist);
  const [imgDist, setImgDist] = useState(lastImgDist);

  const selectRomDist = () => {
    const options: any = {
      title: "location to save the roms: ",
      properties: ["openDirectory"],
    };
    if (romDist != EMPTY_PATH) {
      options.defaultPath = romDist;
    }

    const results = dialog.showOpenDialog(null, options);
    lastRomDist = EMPTY_PATH;
    if (results && results.length) {
      lastRomDist = results[0];
    }
    setRomDist(lastRomDist);
  };

  const selectImgDist = () => {
    const options: any = {
      title: "location to save the images: ",
      properties: ["openDirectory"],
    };
    if (imgDist != EMPTY_PATH) {
      options.defaultPath = imgDist;
    }
    const results = dialog.showOpenDialog(null, options);
    lastImgDist = EMPTY_PATH;
    if (results && results.length) {
      lastImgDist = results[0];
    }
    setImgDist(lastImgDist);
  };

  const onExport = () => {
    dispatch(
      exportToEmulationStation(romDist, imgDist, ThumbnailType.SNAP, appConfig)
    );
  };

  const onClose = () => {
    dispatch(showESExporer(false));
  };

  const renderExportButton = () => {
    const exportEnable = romDist != EMPTY_PATH && imgDist != EMPTY_PATH;
    return (
      <button disabled={!exportEnable} onClick={onExport}>
        Export
      </button>
    );
  };

  return (
    <div className={className}>
      <div>Export to EmulationStation</div>
      <div onClick={selectRomDist}>
        <div>Roms distination</div>
        <div>{romDist}</div>
      </div>

      <div>
        <div onClick={selectImgDist}>Images distination</div>
        <div>{imgDist}</div>
      </div>

      <div className="actions">
        {renderExportButton()}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const ESExporter = styled(_ESExporter)`
  width: 320px;
  height: 240px;
  padding: 20px;
  border-radius: 10px;
  background-color: #000;
`;

interface ESExporterProps {
  className?: string;
  dispatch: Dispatch<any>;
}

const mapStateToProps = (state: RootState) => {
  return {
    appConfig: state.appConfig,
    gameItem: state.gameItem,
  };
};

export default connect(mapStateToProps)(ESExporter);
