import React from 'react'
import styled from 'styled-components'
import { ContextMenuTrigger } from 'react-contextmenu'
import { ResultLayout } from '../interfaces/ResultLayout'
import { ContextMenuId } from '../contextMenus/ContextMenuId'
import { ExplorerState } from '../states/explorerState'
import { GameItemState } from '../states/gameItemState'
import { Dispatch } from 'redux'
import { setExplorerConfig } from '../actions/setExplorerConfig'
import { getComputedItem } from '../libs/getComputedItem'
import ResultList from './ResultList'
import ResultGrid from './ResultGrid'
import ThumbnailDownloader from './ThumbnailDownloader'
import { clipboard } from 'electron'
import { getCategory } from '../libs/getCategory'
import { AppConfigState } from '../states/appConfigState'
import { play } from '../externalApps/play'
import { SearchResultTriggerProps } from '../contextMenus/SearchResultContextMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faImage } from '@fortawesome/free-solid-svg-icons'
import { MappingState } from '../states/mappingState'
import { getPlayers } from '../libs/getPlayers'
import { GameNameTriggerProps } from '../contextMenus/GameNameContextMenu'

const _ResultView = (props: ResultViewProps) => {
  const { className, dispatch, explorer, gameItem, appConfig, mapping } = props
  const { explorerConfig } = explorer
  const {
    layout,
    gridSize,
    selectedItemId,
    gridBackgroundSize,
  } = explorerConfig

  const { itemsMap, itemFilter, searchResults } = gameItem
  const { categoryName } = itemFilter
  const item = getComputedItem(itemsMap, selectedItemId)

  const toggleCategory = () => {
    const next = !explorerConfig.showCategory
    const config = {
      ...explorerConfig,
      showCategory: next,
    }
    dispatch(setExplorerConfig(config))
  }

  const toggleImageZone = () => {
    const next = !explorerConfig.showImageZone
    const config = {
      ...explorerConfig,
      showImageZone: next,
    }
    dispatch(setExplorerConfig(config))
  }

  const onLayoutChange = (evt: any) => {
    const layout = evt.target.value as ResultLayout
    const config = {
      ...explorerConfig,
      layout,
    }
    dispatch(setExplorerConfig(config))
  }

  const onBackgroundSizeChange = (evt: any) => {
    const gridBackgroundSize = evt.target.value
    const config = {
      ...explorerConfig,
      gridBackgroundSize,
    }
    dispatch(setExplorerConfig(config))
  }

  const onSliderChange = (evt: any) => {
    const gridSize = Number(evt.target.value)
    const config = {
      ...explorerConfig,
      gridSize,
    }
    dispatch(setExplorerConfig(config))
  }

  const onItemIdChange = (selectedItemId: number) => {
    const config = {
      ...explorerConfig,
      selectedItemId,
    }
    dispatch(setExplorerConfig(config))
  }

  const onPlay = () => {
    const category = getCategory(appConfig, item.categoryName)
    const players = getPlayers(category, item)
    play(appConfig, mapping, item, players[0])
  }

  const onGameNameClick = () => {
    clipboard.writeText(item.gameName, 'selection')
  }

  const renderCategoryToggler = () => {
    return (
      <div className="categoryToggler">
        <a onClick={toggleCategory}>
          <FontAwesomeIcon icon={faBars} />
        </a>
      </div>
    )
  }

  const renderResultLength = () => {
    const { length } = searchResults
    const collect = (): SearchResultTriggerProps => {
      return {
        categoryName,
        searchResults,
      }
    }
    return (
      <ContextMenuTrigger id={ContextMenuId.SEARCH_RESULT} collect={collect}>
        <div className="length">
          <span>{length}</span>
          <span> item(s)</span>
        </div>
      </ContextMenuTrigger>
    )
  }

  const renderLayoutOption = () => {
    return (
      <div className="options">
        <select value={layout} onChange={onLayoutChange}>
          <option value={ResultLayout.BOXART}>BoxArt</option>
          <option value={ResultLayout.SNAPSHOT}>Snapshot</option>
          <option value={ResultLayout.TITLE_SCREEN}>Title Screen</option>
          <option value={ResultLayout.GAME_TITLE}>Game Title</option>
          <option value={ResultLayout.FILE_NAME}>File Name</option>
        </select>
      </div>
    )
  }

  const renderBackgroundSizeOption = () => {
    if (
      [
        ResultLayout.BOXART,
        ResultLayout.TITLE_SCREEN,
        ResultLayout.SNAPSHOT,
      ].includes(layout)
    ) {
      return (
        <div className="options">
          <select value={gridBackgroundSize} onChange={onBackgroundSizeChange}>
            <option value="contain">Contain</option>
            <option value="cover">Cover</option>
          </select>
        </div>
      )
    }
    return null
  }

  const renderSlider = () => {
    if (
      [
        ResultLayout.BOXART,
        ResultLayout.TITLE_SCREEN,
        ResultLayout.SNAPSHOT,
      ].includes(layout)
    ) {
      return (
        <div>
          <input
            className="slider"
            type="range"
            min="160"
            max="640"
            value={gridSize}
            onChange={onSliderChange}
          />
        </div>
      )
    }
    return null
  }

  const renderImageToggler = () => {
    return (
      <div className="imageToggler">
        <a onClick={toggleImageZone}>
          <FontAwesomeIcon icon={faImage} />
        </a>
      </div>
    )
  }

  const renderThumbnailDownloader = () => {
    return <ThumbnailDownloader dispatch={dispatch} gameItem={gameItem} />
  }

  const renderCatName = () => {
    if (item) {
      const category = getCategory(appConfig, item.categoryName)
      return <div className="catName">{category.shortName}</div>
    }
    return null
  }

  const renderGameName = () => {
    if (item) {
      const collect = (): GameNameTriggerProps => {
        return {
          gameName: item.gameName,
        }
      }
      return (
        <ContextMenuTrigger id={ContextMenuId.GAME_NAME} collect={collect}>
          <div className="gameName" onClick={onGameNameClick}>
            {item.gameName}
          </div>
        </ContextMenuTrigger>
      )
    }
    return null
  }

  const renderContent = () => {
    if ([ResultLayout.GAME_TITLE, ResultLayout.FILE_NAME].includes(layout)) {
      return (
        <ResultList
          categoryName={categoryName}
          results={searchResults}
          itemId={selectedItemId}
          setItemId={onItemIdChange}
          playHandler={onPlay}
          layout={layout}
        />
      )
    } else if (
      [
        ResultLayout.BOXART,
        ResultLayout.TITLE_SCREEN,
        ResultLayout.SNAPSHOT,
      ].includes(layout)
    ) {
      return (
        <ResultGrid
          categoryName={categoryName}
          results={searchResults}
          itemId={selectedItemId}
          setItemId={onItemIdChange}
          playHandler={onPlay}
          gridSize={gridSize}
          layout={layout}
          explorerConfig={explorer.explorerConfig}
        />
      )
    }
    return null
  }

  return (
    <div className={className}>
      <div className="head">
        <div className="left">
          {renderCategoryToggler()}
          {renderResultLength()}
        </div>
        <div className="mid">{renderThumbnailDownloader()}</div>
        <div className="right">
          {renderLayoutOption()}
          {renderBackgroundSizeOption()}
          {renderSlider()}
          {renderImageToggler()}
        </div>
      </div>
      <div className="subHead">
        <div className="names">
          {renderCatName()}
          {renderGameName()}
        </div>
      </div>
      <div className="body">{renderContent()}</div>
    </div>
  )
}

const ResultView = styled(_ResultView)`
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  > .head {
    height: 32px;
    display: flex;
    align-items: center;
    padding: 10px 0;
    color: #555;
    background-color: rgba(0, 0, 0, 0.3);
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    > .left {
      display: flex;
      align-items: center;
      .categoryToggler {
        width: 48px;
        a {
          display: block;
          height: 32px;
          text-align: center;
          line-height: 32px;
          color: #666;
          cursor: pointer;
          &:hover {
            color: #17bbaf;
            background-color: rgba(0, 0, 0, 0.3);
          }
        }
      }
      .length {
        user-select: none;
        color: #17bbaf;
      }
    }
    > .mid {
      flex: 1;
      align-items: center;
    }

    > .right {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .options {
        padding-left: 10px;
      }

      .slider {
        appearance: none;
        outline: none;
        width: 100px;
        height: 18px;
        background: rgba(150, 150, 150, 0.2);
        margin-top: 4px;
        &::-webkit-slider-thumb {
          appearance: none;
          appearance: none;
          width: 25px;
          height: 18px;
          background: rgba(150, 150, 150, 0.3);
          cursor: pointer;
          &:hover {
            background-color: orange;
          }
        }
      }
      .imageToggler {
        width: 48px;
        a {
          display: block;
          height: 32px;
          text-align: center;
          line-height: 32px;
          color: #666;
          cursor: pointer;
          &:hover {
            color: #17bbaf;
            background-color: rgba(0, 0, 0, 0.3);
          }
        }
      }
    }
  }

  > .subHead {
    height: 32px;
    background-color: rgba(0, 0, 0, 0.3);
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    display: flex;
    align-items: center;
    padding-left: 20px;
    .names {
      flex: 1;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .catName {
        color: #666;
        &:after {
          content: ' >';
        }
      }

      .gameName {
        flex: 1;
        line-height: 32px;
        padding: 0 10px;
        color: #17bbaf;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .settingIcon {
      width: 48px;
      height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #666;
      cursor: pointer;
      &:hover {
        color: #17bbaf;
        background-color: rgba(0, 0, 0, 0.3);
      }
    }
  }

  > .body {
    flex: 1;
    overflow: hidden;
    padding: 10px;
  }

  select {
    border: none;
    background-color: transparent;
    color: #555;
    padding: 5px;
    cursor: pointer;
  }
`

interface ResultViewProps {
  className?: string
  dispatch: Dispatch<any>
  explorer: ExplorerState
  gameItem: GameItemState
  appConfig: AppConfigState
  mapping: MappingState
}

export default ResultView
