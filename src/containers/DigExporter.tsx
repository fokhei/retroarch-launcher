import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { RootState } from '../states'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { AppConfigState } from '../states/appConfigState'
import { GameItemState } from '../states/gameItemState'
import { NotificationManager } from 'react-notifications'
import { exportToDig, exportToDigReset } from '../actions/exportToDig'
import { showDigExporter } from '../actions/showDigExporter'

const { dialog } = require('electron').remote

const EMPTY_PATH = '...'

enum WaitingFor {
  NONE,
  EXPORT,
}

const _DigExporter = (props: DigExporterProps) => {
  const { className, dispatch, appConfig, gameItem } = props
  const [distination, setDistination] = useState(EMPTY_PATH)
  const [exportFiles, setExportFiles] = useState(true)
  const [exportCovers, setExportCovers] = useState(true)
  const [exportSnapshots, setExportSnapshots] = useState(true)
  const [useTitleScreenAsCover, setTitleScreenAsCover] = useState(true);
  const [waiting, setWaiting] = useState<WaitingFor>(WaitingFor.NONE)
  
  const titleScreenAsCoverDisabled = !exportCovers;

  const selectDistination = () => {
    const options: any = {
      title: 'Distination',
      properties: ['openDirectory'],
    }
    const results = dialog.showOpenDialog(null, options)
    if (results && results.length) {
      setDistination(results[0])
    } else {
      setDistination(EMPTY_PATH)
    }
  }

  const onExportFilesChange = (evt: any) => {
    setExportFiles(evt.target.checked)
  }

  const onExportSnapshotsChange = (evt: any) => {
    setExportSnapshots(evt.target.checked)
  }

  const onExportCoversChange = (evt: any) => {
    setExportCovers(evt.target.checked)
  }

  const onTitleScreenAsCoverChange = (evt: any) => {
    setTitleScreenAsCover(evt.target.checked)
  }

  



  const onExport = () => {
    setWaiting(WaitingFor.EXPORT)

    dispatch(
      exportToDig(
        distination,
        exportFiles,
        exportSnapshots,
        exportCovers,
        useTitleScreenAsCover,
        appConfig,
        gameItem,
      ),
    )
  }

  const onClose = () => {
    dispatch(showDigExporter(false))
  }

  const renderActions = () => {
    if (waiting != WaitingFor.NONE) {
      return <div className="busy">Please wait ...</div>
    }
    const exportEnable = distination != EMPTY_PATH
    return (
      <div className="actions">
        <button disabled={!exportEnable} onClick={onExport}>
          Export
        </button>
        <button onClick={onClose}>Close</button>
      </div>
    )
  }

  const gameItemChangeEffect = () => {
    if (waiting == WaitingFor.EXPORT) {
      const { error, success } = gameItem.exportToDig

      if (error || success) {
        setWaiting(WaitingFor.NONE)
        if (error) {
          NotificationManager.error(
            error.toString(),
            'Fail to export',
            86400000 * 3,
          )
        } else if (success) {
          NotificationManager.success('Export success!')
          onClose()
        }
        dispatch(exportToDigReset())
      }
    }
  }

  useEffect(gameItemChangeEffect, [gameItem.exportToDig])

  const { length } = gameItem.searchResults
  return (
    <div className={className}>
      <div className="head">Export {length} game(s) to Dig</div>
      <div className="body">
        <div className="item" onClick={selectDistination}>
          <div className="key">Distination : </div>
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
          <div className="key">Export snapshots</div>
          <div className="value">
            <input
              type="checkbox"
              checked={exportSnapshots}
              onChange={onExportSnapshotsChange}
            />
          </div>
        </div>

        <div className="item">
          <div className="key">Export covers</div>
          <div className="value">
            <input
              type="checkbox"
              checked={exportCovers}
              onChange={onExportCoversChange}
            />
          </div>
        </div>

        <div className="item">
          <div className="key">Use title screen as cover</div>
          <div className="value">
            <input
              type="checkbox"
              checked={useTitleScreenAsCover}
              onChange={onTitleScreenAsCoverChange}
              disabled={titleScreenAsCoverDisabled}
            />
          </div>
        </div>

        
      </div>

      {renderActions()}
    </div>
  )
}

const DigExporter = styled(_DigExporter)`
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
        width: 180px;
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
`

interface DigExporterProps {
  className?: string
  dispatch: Dispatch<any>
  appConfig: AppConfigState
  gameItem: GameItemState
}

const mapStateToProps = (state: RootState) => {
  return {
    appConfig: state.appConfig,
    gameItem: state.gameItem,
  }
}

export default connect(mapStateToProps)(DigExporter)
