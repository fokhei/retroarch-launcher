import fs from "fs";
import * as path from "path";
import React from "react";
import styled from "styled-components";
import { ContextMenuTrigger } from "react-contextmenu";
import { ContextMenuId } from "../contextMenus/ContextMenuId";
import { getComputedItem } from "../libs/getComputedItem";
import { ExplorerState } from "../states/explorerState";
import { GameItemState } from "../states/gameItemState";
import { RomNameTriggerProps } from "../contextMenus/RomNameContextMenu";
import { ThumbnailType } from "../interfaces/ThumbnailType";
import { toBackgroundUrl } from "../libs/toBackgroundUrl";
import { remote } from "electron";
import { ThumbnailTriggerProps } from "../contextMenus/ThumbnailContextMenu";
import ThumbnailDropzone from "./ThumbnailDropzone";
import { AppConfigState } from "../states/appConfigState";
import { Dispatch } from "redux";
import { ThumbnailDropZoneTriggerProps } from "../contextMenus/ThumbnailDropzoneContextMenu";

const _RightBar = (props: RightBarProps) => {
  const { className, dispatch, explorer, gameItem, appConfig } = props;
  const { explorerConfig } = explorer;
  const { selectedItemId } = explorerConfig;
  const { itemsMap } = gameItem;
  const item = getComputedItem(itemsMap, selectedItemId);

  const onThumbnailDoubleClick = (evt: any) => {
    const thumbnailType = evt.currentTarget.getAttribute(
      "data-thumbnail-type"
    ) as ThumbnailType;
    const filePath = item.thumbnails[thumbnailType];
    remote.shell.openItem(filePath);
  };

  const renderRomName = () => {
    if (item) {
      const baseName = path.basename(item.romPath);
      const collect = (): RomNameTriggerProps => {
        return {
          romPath: item.romPath,
        };
      };
      return (
        <div className="romName">
          <ContextMenuTrigger id={ContextMenuId.ROM_NAME} collect={collect}>
            <div className="baseName">{baseName}</div>
          </ContextMenuTrigger>
        </div>
      );
    }
    return null;
  };

  const renderThumbnail = (thumbnailType: ThumbnailType) => {
    let child: any;
    if (item) {
      const { thumbnails } = item;

      const filePath = thumbnails[thumbnailType];
      const fileExists = fs.existsSync(filePath);

      if (fileExists) {
        const style = {
          backgroundImage: toBackgroundUrl(filePath, item.updateAt),
        };
        let className = "thumbnail";

        const collect = (): ThumbnailTriggerProps => {
          return {
            item,
            thumbnailType,
          };
        };

        child = (
          <ContextMenuTrigger id={ContextMenuId.THUMBNAIL} collect={collect}>
            <div
              className={className}
              style={style}
              data-thumbnail-type={thumbnailType}
              onDoubleClick={onThumbnailDoubleClick}
            />
          </ContextMenuTrigger>
        );
      } else {
        const collect = (): ThumbnailDropZoneTriggerProps => {
          return {
            item,
            thumbnailType,
          };
        };

        child = (
          <ContextMenuTrigger
            id={ContextMenuId.THUMBNAIL_DROPZONE}
            collect={collect}
          >
            <ThumbnailDropzone
              dispatch={dispatch}
              thumbnailType={thumbnailType}
              item={item}
              appConfig={appConfig}
            />
          </ContextMenuTrigger>
        );
      }
    }
    return <div className="item">{child}</div>;
  };

  return (
    <div className={className}>
      {renderRomName()}
      {renderThumbnail(ThumbnailType.BOX)}
      {renderThumbnail(ThumbnailType.TITLE)}
      {renderThumbnail(ThumbnailType.SNAP)}
    </div>
  );
};

const RightBar = styled(_RightBar)`
  width: 260px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  border-left: 1px solid rgba(100, 100, 100, 0.1);
  display: flex;
  flex-direction: column;
  > .romName {
    width: 100%;
    height: 32px;
    padding-left: 10px;
    color: #555;
    user-select: none;
    text-align: left;
    font-size: 1em;
    line-height: 32px;
    .react-contextmenu-wrapper {
      .baseName {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  > .item {
    border-top: 1px solid rgba(100, 100, 100, 0.1);
    padding: 10px;
    flex: 1;
    .react-contextmenu-wrapper {
      width: 100%;
      height: 100%;
      > .thumbnail {
        width: 100%;
        height: 100%;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: contain;
        border: 1px solid transparent;
      }
    }
  }
`;

interface RightBarProps {
  className?: string;
  dispatch: Dispatch<any>;
  explorer: ExplorerState;
  gameItem: GameItemState;
  appConfig: AppConfigState;
}

export default RightBar;
