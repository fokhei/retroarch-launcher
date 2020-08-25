import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { AppConfigState } from "../states/appConfigState";
import { scanRoms } from "../actions/scanRoms";
import { RootState } from "../states";
import { ScannerState } from "../states/scannerState";
import { getCategory } from "../libs/getCategory";
import { hideScanner } from "../actions/hideScanner";
import { search } from "../actions/search";
import { ItemFilter, OrderBy } from "../interfaces/itemFilter";
import { FavourState } from "../states/favourState";
import { GameItemState } from '../states/gameItemState';

enum WaitingFor {
  NONE,
  SCAN_ROMS,
}

const _Scanner = (props: ScannerProps) => {
  const { className, dispatch, appConfig, scanner, gameItem, favour } = props;
  const [waiting, setWaiting] = useState<WaitingFor>(WaitingFor.NONE);
  const [result, setResult] = useState("");
  const { categoryName } = scanner;
  const category = getCategory(appConfig, categoryName);
  const { romsPath } = category;

  const onClose = () => {
    setWaiting(WaitingFor.NONE);
    dispatch(hideScanner());
  };

  const startScan = () => {
    setWaiting(WaitingFor.SCAN_ROMS);
    setResult("");
    dispatch(scanRoms(appConfig, categoryName));
  };

  const renderBusyIcon = () => {
    if (waiting != WaitingFor.NONE) {
      return <div className="busy">Scaning ...</div>;
    }
    return null;
  };

  const renderResults = () => {
    if (result != "") {
      return <div className="result">{result}</div>;
    }
    return null;
  };

  const renderCloseButton = () => {
    if (waiting == WaitingFor.NONE) {
      return <button onClick={onClose}>Close</button>;
    }
    return null;
  };

  const mountEffect = () => {
    setResult("");
    if (categoryName != "") {
      startScan();
    }
  };

  const scannerChangeEffect = () => {
    if (waiting == WaitingFor.SCAN_ROMS) {
      const { error, success } = scanner;
      if (error) {
        console.error(error);
        throw error;
      } else if (success) {
        setWaiting(WaitingFor.NONE);
        const { length } = scanner.items;
        setResult(`${length} item(s) is scanned.`);

        const filter: ItemFilter = {
          categoryName: scanner.categoryName,
          subCategoryName: "",
          keyword: "",
          favourOnly: false,
          orderBy: OrderBy.NAME
        };
        dispatch(search(filter, gameItem, favour));
      }
    }
  };

  useEffect(mountEffect, []);
  useEffect(scannerChangeEffect, [scanner]);

  return (
    <div className={className}>
      <div className="header">
        <div className="categoryName">{categoryName}</div>
        <div className="romsPath">{romsPath}</div>
      </div>
      <div className="body">
        {renderBusyIcon()}
        {renderResults()}
      </div>
      <div className="footer">{renderCloseButton()}</div>
    </div>
  );
};

const Scanner = styled(_Scanner)`
  width: 320px;
  height: 240px;
  padding: 20px;
  border-radius: 10px;
  background-color: #000;
  display: flex;
  flex-direction: column;
  .header {
    .categoryName {
      font-size: 1.3em;
      color: #fff;
    }
    .romsPath {
      color: #666;
    }
  }
  .body {
    flex: 1;
    padding-top: 10px;
    .busy {
      color: orange;
    }
    .result {
      color: green;
      font-size: 1.2em;
      font-weight: bold;
    }
  }
  .footer {
    padding-top: 10px;
    text-align: right;
  }
`;

interface ScannerProps {
  className?: string;
  dispatch: Dispatch<any>;
  appConfig: AppConfigState;
  scanner: ScannerState;
  gameItem: GameItemState;
  favour: FavourState;
}

const mapStateToProps = (state: RootState) => {
  return {
    appConfig: state.appConfig,
    scanner: state.scanner,
    gameItem: state.gameItem,
    favour: state.favour,
  };
};

export default connect(mapStateToProps)(Scanner);
