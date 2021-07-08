import React from 'react'
import { ContextMenu, connectMenu } from 'react-contextmenu'
import { ContextMenuId } from './ContextMenuId'
import { Dispatch } from 'redux'
import { showScanner } from '../actions/showScanner'
import { AppConfigState } from '../states/appConfigState'
import { createMenuItem } from './createMenuItem'
import { GameItemState } from '../states/gameItemState'
import lazy from 'lazy.js'
import { scanMissingThumbnails } from '../actions/scanMissingThumbnails'
import { clearAllBookmark } from '../actions/bookmark'
import { CategoryAll, CategoryBookmark } from '../libs/constants'
import { scanTeknoParrotProfiles } from '../actions/scanTeknoParrotProfiles'
import { MappingState } from '../states/mappingState'
import { getCategory } from '../libs/getCategory'
import { getSystemIntegrations } from '../libs/getSystemIntegrations'
import { SystemIntegration } from '../interfaces/SystemInteration'

const id = ContextMenuId.CATEGORY

const CategoryContextMenu = (props: CategoryContextMenuProps) => {
  const { dispatch, trigger, appConfig, gameItem, mapping } = props
  const enabled = Boolean(trigger && trigger.categoryName)

  const onFetchTeknoParrotProiles = () => {
    dispatch(scanTeknoParrotProfiles(appConfig, mapping))
  }

  const onScan = () => {
    dispatch(showScanner(trigger.categoryName))
  }

  const onDownloadThumbnails = () => {
    const items = lazy(gameItem.items)
      .filter((item) => item.categoryName == trigger.categoryName)
      .toArray()
    if (items && items.length) {
      dispatch(scanMissingThumbnails(items, appConfig))
    }
  }

  const onClearAllBookmark = () => {
    dispatch(clearAllBookmark(gameItem))
  }

  const createMenuItemForParrotProiles = () => {
    if (enabled) {
      
      const category = getCategory(appConfig, trigger.categoryName)
      if (category) {
        if (
          getSystemIntegrations(category).includes(SystemIntegration.TEKNOPARROT)
        ) {
          return createMenuItem(
            'Fetch TeknoParrot Game Profiles',
            onFetchTeknoParrotProiles,
            enabled,
          )
        }
      }
      
    }
    return null
  }

  const createMenuItemForScan = () => {
    if (enabled) {
      if (![CategoryAll, CategoryBookmark].includes(trigger.categoryName)) {
        return createMenuItem('Scan this category', onScan, enabled)
      }
    }
    return null
  }

  const createMenuItemForDownloadThumbnail = () => {
    if (enabled) {
      if (![CategoryAll, CategoryBookmark].includes(trigger.categoryName)) {
        return createMenuItem(
          'Download thumbnails',
          onDownloadThumbnails,
          enabled,
        )
      }
    }
    return null
  }

  const createMenuItemForClearBookmark = () => {
    if (enabled) {
      if (trigger.categoryName == CategoryBookmark) {
        return createMenuItem('Clear all bookmark', onClearAllBookmark, enabled)
      }
    }
    return null
  }

  return (
    <ContextMenu id={id}>
      {createMenuItemForParrotProiles()}
      {createMenuItemForScan()}
      {createMenuItemForDownloadThumbnail()}
      {createMenuItemForClearBookmark()}
    </ContextMenu>
  )
}

interface CategoryContextMenuProps {
  dispatch: Dispatch<any>
  trigger: CategoryTriggerProps
  appConfig: AppConfigState
  gameItem: GameItemState
  mapping: MappingState
}

export interface CategoryTriggerProps {
  categoryName: string
}

export default connectMenu(id)(CategoryContextMenu)
