import React from 'react';
import styled from 'styled-components';
import { PlusLg, X as CloseIcon } from 'react-bootstrap-icons';
import IconButton from '@material-ui/core/IconButton';
import Logo from '../../UI/Logo';
import Link from '../../UI/Link';
import ProjectsList from '../Projects/ProjectsList';
import Button from '../../UI/Button';
import { useState } from 'react';
import ProjectForm from '../Projects/ProjectForm';

const Container = styled.div<{ isOpened: boolean }>`
  position: relative;
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0.5rem;
  border-right: var(--border-thick);
  background-color: var(--color-white);
  transition: all 300ms;
  z-index: 1000;

  & .close-btn {
    display: none;
  }

  & .close-icon {
    font-size: 2rem;
  }

  & .copyright-text {
    margin-top: auto;
  }

  @media (max-width: 900px) {
    position: fixed;
    top: 0;
    left: 0;
    ${props => !props.isOpened && 'left: -300px;'}
    width: 300px;
    ${props => (props.isOpened ? '' : 'overflow: hidden;')}
  }

  @media (max-width: 600px) {
    width: 100%;
    left: ${props => (props.isOpened ? '0px' : '-100%')};

    & .close-btn {
      display: flex;
      position: absolute;
      top: 0;
      right: 0;
    }
  }
`;

const Sidebar: React.FC<{
  isOpened: boolean;
  close: () => void;
  open: () => void;
}> = ({ isOpened, close, open }) => {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <Container isOpened={isOpened}>
      <IconButton className="close-btn" onClick={close}>
        <CloseIcon size={32} />
      </IconButton>
      <Logo />
      <ProjectsList openSidebar={open} closeSidebar={close} />
      <Button
        variant="outlined"
        IconLabel={PlusLg}
        onClick={() => {
          close();
          setIsAdding(true);
        }}
        fullWidth={true}
      >
        Add a new Project
      </Button>
      <div className="copyright-text">
        Copyright &copy; 2021 -{' '}
        <Link href="https://icons.getbootstrap.com/" target="_blank">
          Yosef beder
        </Link>
      </div>

      <ProjectForm
        showIn={isAdding}
        onClose={() => {
          setIsAdding(false);
          open();
        }}
        type="add"
      />
    </Container>
  );
};

export default Sidebar;
