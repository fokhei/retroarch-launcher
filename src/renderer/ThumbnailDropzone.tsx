import React, { useEffect, useState, createRef, RefObject } from "react";
import styled from "styled-components";
import { ThumbnailType } from "../libs/ThumbnailType";
import { ComputedPlayListItem } from "../libs/ComputedPlaylistItem";
import { ipcRenderer } from "electron";
import { AppEvent } from "../libs/AppEvent";

const _DropZone = (props: DropZoneProps) => {
  const { item, thumbnailType } = props;
  const ref: RefObject<any> = createRef();
  const [dragging, setDragging] = useState(false);
 
  const onDragOver = (evt: any) => {
    setDragging(true);
    evt.preventDefault();
    return false;
  };

  const onDragOut = () => {
    setDragging(false);
  };

  const onDrop = (evt: any) => {
    setDragging(false);
    evt.preventDefault();

    const { length } = evt.dataTransfer.files;
    if (length) {
      const file = evt.dataTransfer.files[0];
      ipcRenderer.send(AppEvent.SET_THUMBNAIL, file.path, item, thumbnailType);
    }

    return false;
  };

  const itemChangeEffect = () => {
    ref.current.ondragover = onDragOver;
    ref.current.ondragleave = onDragOut;
    ref.current.ondrop = onDrop;
    return () => {
      if (ref.current) {
        ref.current.ondragover = null;
        ref.current.ondragleave = null;
        ref.current.ondrop = null;
      }
    };
  }

  useEffect(itemChangeEffect, [item]);

  let className = props.className;
  if (dragging) {
    className += " dragging";
  }

  let label;
  if (thumbnailType == ThumbnailType.BOX) {
    label = "Drop boxart here";
  } else if (thumbnailType == ThumbnailType.TITLE) {
    label = "Drop title screen here";
  } else if (thumbnailType == ThumbnailType.SNAP) {
    label = "Drop snapshot here";
  }

  return (
    <div className={className} ref={ref}>
      <span className="label">{label}</span>
    </div>
  );
};

const DropZone = styled(_DropZone)`
  width: 100%;
  height: 100%;
  border: 3px dashed #222;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #555;
  &.dragging {
    border: 3px dashed #17bbaf;
    color: #17bbaf;
  }
  .label {
    user-select: none;
  }
`;

interface DropZoneProps {
  className?: string;
  item: ComputedPlayListItem;
  thumbnailType: ThumbnailType;
}

export default DropZone;
