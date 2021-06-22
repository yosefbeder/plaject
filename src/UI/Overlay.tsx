import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

const Container = styled.div<{ zIndex: number; responsive: boolean }>`
  display: none;

  ${props => props.responsive && '@media (max-width: 900px) {'}
  display: block;
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: ${props => props.zIndex};
  background-color: #00000050;

  &.fade-enter {
    opacity: 0;
  }

  &.fade-enter-active {
    opacity: 1;
  }

  &.fade-exit {
    opacity: 1;
  }

  &.fade-exit-active {
    opacity: 0;
  }

  &.fade-enter-active,
  &.fade-exit-active {
    transition: opacity 300ms;
  }
  ${props => props.responsive && '}'}
`;

const Overlay: React.FC<{
  showIn: boolean;
  onClick: () => void;
  zIndex: number;
  responsive: boolean;
}> = ({ showIn, onClick, zIndex, responsive }) => {
  const nodeRef = useRef(null);

  return (
    <CSSTransition
      in={showIn}
      classNames="fade"
      timeout={300}
      unmountOnExit
      mountOnEnter
      nodeRef={nodeRef}
    >
      <Container
        ref={nodeRef}
        zIndex={zIndex}
        onClick={onClick}
        responsive={responsive}
      />
    </CSSTransition>
  );
};

export default Overlay;
