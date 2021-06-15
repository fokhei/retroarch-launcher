import fs from 'fs'
import * as path from 'path'
import { getCategory } from '../libs/getCategory'
import { AppConfigState } from '../states/appConfigState'
import { GameItemState } from '../states/gameItemState'
import fsExtra from 'fs-extra'
import { getThumbnailInfo } from '../libs/getThumbnailInfo'
import { ThumbnailType } from '../interfaces/ThumbnailType'

export const EXPORT_TO_DIG_START = 'EXPORT_TO_DIG_START'
export const EXPORT_TO_DIG_SUCCESS = 'EXPORT_TO_DIG_SUCCESS'
export const EXPORT_TO_DIG_ERROR = 'EXPORT_TO_DIG_FAIL'
export const EXPORT_TO_DIG_RESET = 'EXPORT_TO_DIG_RESET'

export const exportToDig = (
  distination: string,
  exportFiles: boolean,
  exportCovers: boolean,
  exportSnapshots: boolean,
  appConfig: AppConfigState,
  gameItem: GameItemState,
) => {
  return (dispatch) => {
    dispatch(exportToDigStart())

    const { searchResults } = gameItem
    const thumbnailPath = path.resolve(distination, 'thumbnails')
    const coverPath = path.resolve(thumbnailPath, 'Covers')
    const snapPath = path.resolve(thumbnailPath, 'Screenshots')

    setTimeout(() => {
      try {
        if (exportCovers || exportSnapshots) {
          if (!fs.existsSync(thumbnailPath)) {
            fs.mkdirSync(thumbnailPath)
          }
          if (exportCovers) {
            if (!fs.existsSync(coverPath)) {
              fs.mkdirSync(coverPath)
            }
          }
          if (exportSnapshots) {
            if (!fs.existsSync(snapPath)) {
              fs.mkdirSync(snapPath)
            }
          }
        }

        searchResults.sort()
        searchResults.map((gameItem) => {
          const category = getCategory(appConfig, gameItem.categoryName)

          if (category.digDir) {
            const romBasename = path.basename(gameItem.romPath)


            if (exportFiles) {
              const fileDir = path.resolve(distination, category.digDir)
              const fileDist = path.resolve(fileDir, romBasename)
              if (!fs.existsSync(fileDir)) {
                fs.mkdirSync(fileDir)
              }
              if (!fs.existsSync(fileDist)) {
                fsExtra.copySync(gameItem.romPath, fileDist)
              }
            }

            if (exportCovers) {
              const thumbnailInfo = getThumbnailInfo(
                gameItem,
                ThumbnailType.BOX,
                appConfig,
              )
              if (fs.existsSync(thumbnailInfo.local)) {
                const coverDir = path.resolve(coverPath, category.digDir)
                if (!fs.existsSync(coverDir)) {
                  fs.mkdirSync(coverDir)
                }
                const imgBaseName = path.basename(thumbnailInfo.local)
                const coverDist = path.resolve(coverDir, imgBaseName)
                if (!fs.existsSync(coverDist)) {
                  fsExtra.copySync(thumbnailInfo.local, coverDist)
                }
              }
            }

            if (exportSnapshots) {
              const thumbnailInfo = getThumbnailInfo(
                gameItem,
                ThumbnailType.SNAP,
                appConfig,
              )
              if (fs.existsSync(thumbnailInfo.local)) {
                const snapDir = path.resolve(snapPath, category.digDir)
                if (!fs.existsSync(snapDir)) {
                  fs.mkdirSync(snapDir)
                }
                const imgBaseName = path.basename(thumbnailInfo.local)
                const snapDist = path.resolve(snapDir, imgBaseName)
                if (!fs.existsSync(snapDist)) {
                  fsExtra.copySync(thumbnailInfo.local, snapDist)
                }
              }
            }
          }
        })

        dispatch(exportToDigSuccess())
      } catch (error) {
        dispatch(exportToDigError(error))
      }
    })
  }
}

export const exportToDigStart = () => {
  return {
    type: EXPORT_TO_DIG_START,
  }
}

export const exportToDigSuccess = () => {
  return {
    type: EXPORT_TO_DIG_SUCCESS,
  }
}

export const exportToDigError = (error: any) => {
  return {
    type: EXPORT_TO_DIG_ERROR,
    error,
  }
}

export const exportToDigReset = () => {
  return {
    type: EXPORT_TO_DIG_RESET,
  }
}
