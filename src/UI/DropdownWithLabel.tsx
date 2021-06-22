import { ClickAwayListener } from '@material-ui/core';
import React, { useRef, useState } from 'react';
import { Icon } from 'react-bootstrap-icons';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import Dropdown from './Dropdown';

const Container = styled.div<{ responsive?: boolean; isOpened: boolean }>`
  position: relative;
  z-index: ${props => (props.isOpened ? '20' : '10')};

  & .dropdown-container {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 10;
    opacity: 1;

    &.fade-enter {
      opacity: 0;
    }
    &.fade-enter-active {
      opacity: 1;
      transition: opacity 200ms;
    }
    &.fade-exit {
      opacity: 1;
    }
    &.fade-exit-active {
      opacity: 0;
      transition: opacity 200ms;
    }
  }
`;

interface ListItem {
  Icon: Icon;
  content: string;
  onClick: () => void;
}

const DropdownWithLabel: React.FC<{
  listItems: ListItem[];
  responsive?: boolean;
  className?: string;
}> = ({ children, listItems, responsive, className }) => {
  const [isOpened, setIsOpened] = useState(false);
  const nodeRef = useRef(null);

  return (
    <Container
      responsive={responsive}
      isOpened={isOpened}
      onClick={e => {
        e.stopPropagation();
        setIsOpened(prev => !prev);
      }}
      className={className}
    >
      {children}
      <CSSTransition
        timeout={300}
        in={isOpened}
        classNames="fade"
        unmountOnExit
        mountOnEnter
        nodeRef={nodeRef}
      >
        <ClickAwayListener onClickAway={() => setIsOpened(false)}>
          <div className="dropdown-container" ref={nodeRef}>
            <Dropdown items={listItems} responsive={responsive} />
          </div>
        </ClickAwayListener>
      </CSSTransition>
    </Container>
  );
};

export default DropdownWithLabel;
