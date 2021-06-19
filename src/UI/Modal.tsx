import ReactDOM from 'react-dom';
import React from 'react';
import Card from './Card';
import styled from 'styled-components';
import Overlay from './Overlay';
import { CSSTransition } from 'react-transition-group';

const Container = styled(Card)<{ height?: number }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: ${props => (props.height ? `${props.height}px` : 'max-content')};
  z-index: 10;
  background-color: var(--color-white);
  box-shadow: none;
  transition: all 300ms;

  &.animation-enter {
    transform: translate(-50%, -50%) scale(0.5);
    opacity: 0;
  }

  &.animation-enter-active {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }

  &.animation-exit {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }

  &.animation-exit-active {
    transform: translate(-50%, -50%) scale(0.5);
    opacity: 0;
  }
`;

const Modal: React.FC<{
  showIn: boolean;
  onClickAway: () => void;
  width: number;
  height?: number;
}> = ({ width, showIn, onClickAway, height, children }) => {
  return ReactDOM.createPortal(
    <>
      <Overlay
        zIndex={0}
        onClick={onClickAway}
        showIn={showIn}
        responsive={false}
      />
      <CSSTransition
        classNames="animation"
        in={showIn}
        mountOnEnter
        unmountOnExit
        timeout={300}
      >
        <Container height={height} width={width} isModal={true}>
          {children}
        </Container>
      </CSSTransition>
    </>,
    document.getElementById('modal-root')!,
  );
};

export default Modal;
