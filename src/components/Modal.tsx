import React from "react";
import { createPortal } from "react-dom";
import styled, { keyframes } from "styled-components";
import ErrorBoundary from "./ErrorBoundary";

interface StyledProps {
  className?: string;
}

interface BackdropProps extends StyledProps {
  children: any;
  backdropColor?: string;
  backdropClickHandler?: (evt: any) => void;
}

export interface ModalProps extends BackdropProps {}

const _Backdrop = (props: BackdropProps) => {
  const { className, children, backdropClickHandler } = props;
  const onClick = (evt: any) => {
    if (backdropClickHandler) {
      evt.preventDefault();
      backdropClickHandler(evt);
    }
  };
  return (
    <div className={className} onClick={onClick} data-component-type="backdrop">
      <ErrorBoundary>{children}</ErrorBoundary>
    </div>
  );
};

const FadeInAnimation = keyframes`
  from {
    opacity:0;
  }
  to {
    opacity:1;
  }
`;

const Backdrop = styled(_Backdrop)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props: ModalProps) => {
    return props.backdropColor
      ? props.backdropColor.toString()
      : "rgba(27,40,68,0.8)";
  }};
  animation: ${FadeInAnimation} 0.2s linear;
  z-index: 1000;
`;

const Modal = (props: ModalProps) => {
  const { backdropColor, backdropClickHandler } = props;
  const backdropProps = {
    backdropColor,
    backdropClickHandler,
  };

  return createPortal(
    <Backdrop {...backdropProps}>{props.children}</Backdrop>,
    document.body
  );
};
export default Modal;
