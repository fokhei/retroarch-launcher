import { AnyAction } from 'redux'
import update from 'immutability-helper'
import { GameItemState, createGameItemState } from '../../states/gameItemState'
import fs from 'fs'
import * as path from 'path'
import { Playlist } from '../../interfaces/PlayList'
import { createComputedGameItem } from '../../libs/createComputedItem'
import { ComputedGameItem } from '../../interfaces/ComputedGameItem'
import { GAME_LIST_DIR_NAME } from '../../libs/constants'
import { AppConfigState } from '../../states/appConfigState'
import { getSystemIntegrations } from '../../libs/getSystemIntegrations'
import { SystemIntegration } from '../../interfaces/SystemInteration'
import { favourMameGroups } from '../../libs/mameGroups'

let _id = 0

export const fetchAllItemsHandler = (
  state: GameItemState = createGameItemState(),
  action: AnyAction,
): GameItemState => {
  let items: Array<ComputedGameItem> = []
  let itemsMap = {}
  let subCategories = {}

  const appConfig = action.appConfig as AppConfigState
  const { appDataDir, categories } = appConfig

  if (!fs.existsSync(appDataDir)) {
    fs.mkdirSync(appDataDir)
  }

  const gamelistPath = path.resolve(appDataDir, GAME_LIST_DIR_NAME)
  if (!fs.existsSync(gamelistPath)) {
    fs.mkdirSync(gamelistPath)
  }

  categories.map((category) => {
    const categoryName = category.name
    const fileName = `${categoryName}.json`
    const filePath = path.resolve(gamelistPath, fileName)
    if (fs.existsSync(filePath)) {
      const text: any = fs.readFileSync(filePath)
      try {
        const playlist = JSON.parse(text) as Playlist
        playlist.items.map((item) => {
          const id = ++_id
          const computedItem = createComputedGameItem(
            item,
            id,
            category,
            action.appConfig,
          )
          items.push(computedItem)
          itemsMap[computedItem.id.toString()] = computedItem

          if (item.subCategoryName != '') {
            if (subCategories.hasOwnProperty(categoryName)) {
              const subCat = subCategories[categoryName]
              if (!subCat.includes(item.subCategoryName)) {
                subCat.push(item.subCategoryName)
              }
            } else {
              subCategories[categoryName] = [item.subCategoryName]
            }
          }
        })

        const integrations = getSystemIntegrations(category)
        if (
          integrations.includes(SystemIntegration.FBA) ||
          integrations.includes(SystemIntegration.MAME)
        ) {
          subCategories[categoryName] = subCategories[categoryName].sort(
            (a, b) => {
              if (favourMameGroups.includes(a)) {
                if (favourMameGroups.includes(b)) {
                  if (a < b) {
                    return -1
                  }
                  if (a > b) {
                    return 1
                  }
                }
                return -1
              }
              return 1
            },
          )
        }
      } catch (e) {
        console.error(`Error on parse playlist: ${filePath}`)
      }
    }
  })

  return update(state, {
    _id: { $set: _id },
    items: { $set: items },
    itemsMap: { $set: itemsMap },
    subCategories: { $set: subCategories },
    fetch: {
      success: {
        $set: true,
      },
    },
  })
}
