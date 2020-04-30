import React, { useEffect, useState, createRef, RefObject } from "react";
import styled from "styled-components";
import { ThumbnailType } from "../interfaces/ThumbnailType";
import { ComputedGameItem } from "../interfaces/ComputedGameItem";
import { Dispatch } from "redux";
import { setThumbnail } from "../actions/setThumbnail";
import { AppConfigState } from "../states/appConfigState";

const _ThumbnailDropZone = (props: ThumbnailDropZoneProps) => {
  const { dispatch, item, thumbnailType, appConfig } = props;
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
      dispatch(setThumbnail(file.path, item, thumbnailType, appConfig));
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
  };

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

const ThumbnailDropZone = styled(_ThumbnailDropZone)`
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

interface ThumbnailDropZoneProps {
  className?: string;
  dispatch: Dispatch<any>;
  item: ComputedGameItem;
  thumbnailType: ThumbnailType;
  appConfig: AppConfigState;
}

export default ThumbnailDropZone;
