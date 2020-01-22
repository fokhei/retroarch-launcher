import React from "react";
import styled from "styled-components";
import { ComputedPlayListItem } from "../libs/ComputedPlaylistItem";
import { ThumbnailType } from "../libs/ThumbnailType";
import { toRetroArchThumbnail } from "../libs/toRetroArchThumbnail";
import { ipcRenderer } from "electron";
import { AppEvent } from "../libs/AppEvent";
import ThumbnailDropzone from "./ThumbnailDropzone";
import { ContextMenuId } from "./ContextMenuId";
import { ContextMenuTrigger } from "react-contextmenu";
import { toBackgroundUrl } from "./toBackgroundUrl";

const _RightBar = (props: RightBarProps) => {
  const {
    className,
    config,
    item,
    thumbnailFilePath,
    setThumbnailFilePath
  } = props;
  const thumbnailDir = config.retroArch.dir.thumbnails.replace(/\\/gi, "/");

  const onThumbnailRightClick = (evt: any) => {
    const thumbnailType = evt.currentTarget.getAttribute(
      "data-thumbnail-type"
    ) as ThumbnailType;
    const filePath = getThumbnailFilePath(item, thumbnailType);
    setThumbnailFilePath(filePath);
  };

  const getThumbnailFilePath = (item: ComputedPlayListItem, thumbnailType) => {
    const { label, db_name } = item;
    let img = toRetroArchThumbnail(label);
    return `${thumbnailDir}\/${db_name}\/${thumbnailType}\/${img}`;
  };

  const renderInfo = () => {
    if (item) {
      return (
        <div className="info">
          <ContextMenuTrigger id={ContextMenuId.ROM_PATH}>
            <div className="basename">{item.basename}</div>
          </ContextMenuTrigger>
        </div>
      );
    }
    return undefined;
  };

  const renderThumbnail = (thumbnailType: ThumbnailType) => {
    let child: any;
    if (item) {
      const filePath = getThumbnailFilePath(item, thumbnailType);
      const fileExists = ipcRenderer.sendSync(
        AppEvent.IS_FILE_EXISTS,
        filePath
      );
      if (fileExists) {
        const style = {
          backgroundImage: toBackgroundUrl(filePath)
        };
        let className = "thumbnail";
        if (thumbnailFilePath != "" && thumbnailFilePath == filePath) {
          className += " actived";
        }
        child = (
          <ContextMenuTrigger id={ContextMenuId.THUMBNAIL}>
            <div
              className={className}
              style={style}
              data-thumbnail-type={thumbnailType}
              onContextMenu={onThumbnailRightClick}
            />
          </ContextMenuTrigger>
        );
      } else {
        child = <ThumbnailDropzone thumbnailType={thumbnailType} item={item} />;
      }
    }
    return <div className="item">{child}</div>;
  };

  return (
    <div className={className}>
      {renderInfo()}
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
  > .info {
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 10px;
    color: #555;
    user-select: none;
    .react-contextmenu-wrapper {
      .basename {
        font-size: 11px;
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
  config: AppConfig;
  item?: ComputedPlayListItem;
  thumbnailFilePath: string;
  setThumbnailFilePath: (thumbnailFilePath: string) => void;
}

export default RightBar;
