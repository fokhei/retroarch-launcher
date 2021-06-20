import React, { useEffect } from 'react'
import styled from 'styled-components'
import CategoryMenu from '../components/CategoryMenu'
import { ExplorerState } from '../states/explorerState'
import { Dispatch } from 'redux'
import { AppConfigState } from '../states/appConfigState'
import { RootState } from '../states'
import { connect } from 'react-redux'
import { GameItemState } from '../states/gameItemState'
import { search } from '../actions/search'
import ResultView from '../components/ResultView'
import RightBar from '../components/RightBar'
import { ItemFilter } from '../interfaces/itemFilter'
import LeftBar from '../components/LeftBar'
import { MappingState } from '../states/mappingState'


const _Explorer = (props: ExplorerProps) => {
  const { className, dispatch, appConfig, gameItem, explorer, mapping } = props
  const { itemFilter } = gameItem

  const onSearch = (itemFilter: ItemFilter) => {
    dispatch(search(itemFilter, gameItem))
  }

  const renderLeftBar = () => {
    return <LeftBar dispatch={dispatch} explorer={explorer} />
  }

  const renderCategoryMenu = () => {
    if (explorer.explorerConfig.showCategory) {
      return (
        <CategoryMenu
          appConfig={appConfig}
          gameItem={gameItem}
          searchHandler={onSearch}
        />
      )
    }
    return null
  }

  const renderSearchResult = () => {
    return (
      <ResultView
        dispatch={dispatch}
        explorer={explorer}
        gameItem={gameItem}
        appConfig={appConfig}
        mapping={mapping}
      />
    )
  }

  const renderRightBar = () => {
    if (explorer.explorerConfig.showImageZone) {
      return (
        <RightBar
          dispatch={dispatch}
          appConfig={appConfig}
          explorer={explorer}
          gameItem={gameItem}
        />
      )
    }
    return null
  }

  const mountEffect = () => {
    dispatch(search(itemFilter, gameItem))
  }

  useEffect(mountEffect, [])

  return (
    <div className={className}>
      {renderLeftBar()}
      {renderCategoryMenu()}
      {renderSearchResult()}
      {renderRightBar()}
    </div>
  )
}

const Explorer = styled(_Explorer)`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: row;
`

interface ExplorerProps {
  className?: string
  dispatch: Dispatch<any>
  appConfig: AppConfigState
  gameItem: GameItemState
  explorer: ExplorerState
  mapping: MappingState
}

const mapStateToProps = (state: RootState) => {
  return {
    appConfig: state.appConfig,
    gameItem: state.gameItem,
    explorer: state.explorer,
    mapping: state.mapping,
  }
}

export default connect(mapStateToProps)(Explorer)
