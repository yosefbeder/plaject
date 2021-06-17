import { ClickAwayListener } from '@material-ui/core';
import React, { useState } from 'react';
import { Icon } from 'react-bootstrap-icons';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import Dropdown from './Dropdown';

const Container = styled.div<{ alignRight?: boolean; isOpened: boolean }>`
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

  @media (max-width: 600px) {
    & .dropdown-container {
      ${props =>
        props.alignRight &&
        `
        left: auto;
        right: 0;
        transform: translate(0, 0);
        `}
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
  alignRight?: boolean;
  className?: string;
}> = ({ children, listItems, alignRight, className }) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <Container
      alignRight={alignRight}
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
      >
        <ClickAwayListener onClickAway={() => setIsOpened(false)}>
          <div className="dropdown-container">
            <Dropdown items={listItems} alignRight={alignRight} />
          </div>
        </ClickAwayListener>
      </CSSTransition>
    </Container>
  );
};

export default DropdownWithLabel;
