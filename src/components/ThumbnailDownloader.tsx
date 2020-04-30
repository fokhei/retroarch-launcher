import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Dispatch } from "redux";
import { downloadThumbnail } from "../actions/downloadThumbnail";
import { GameItemState } from "../states/gameItemState";

enum WaitingFor {
  NONE,
  DOWNLOAD,
}

const _ThumbnailDownloader = (props: ThumbnailDownloaderProps) => {
  const { className, dispatch, gameItem } = props;
  const [waiting, setWaiting] = useState<WaitingFor>(WaitingFor.NONE);

  const renderStatus = () => {
    if (waiting == WaitingFor.DOWNLOAD) {
      const { length } = gameItem.pendingToDownload;
      return <span>Downloading ... ({length})</span>;
    }
    return null;
  };

  const downloadNext = () => {
    // console.log("downloadNext", thumbnail.pendings.length)
    if (gameItem.pendingToDownload.length) {
      setWaiting(WaitingFor.DOWNLOAD);
      const info = gameItem.pendingToDownload[0];
      dispatch(downloadThumbnail(info));
    }
  };

  const pendingsChangeEffect = () => {
    // console.log("pendingsChangeEffect", thumbnail.pendings);
    if (waiting == WaitingFor.NONE) {
      downloadNext();
    }
  };

  const downloadChangeEffect = () => {
    // console.log("downloadChangeEffect", thumbnail.download);
    if (waiting == WaitingFor.DOWNLOAD) {
      const { error, success } = gameItem.download;
      if (error || success) {
        setWaiting(WaitingFor.NONE);
        downloadNext();
      }
    }
  };

  useEffect(pendingsChangeEffect, [gameItem.pendingToDownload]);
  useEffect(downloadChangeEffect, [gameItem.download]);
  return <div className={className}>{renderStatus()}</div>;
};

const ThumbnailDownloader = styled(_ThumbnailDownloader)``;

interface ThumbnailDownloaderProps {
  className?: string;
  dispatch: Dispatch<any>;
  gameItem: GameItemState;
}

export default ThumbnailDownloader;
