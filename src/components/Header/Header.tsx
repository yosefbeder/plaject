import React from 'react';
import styled from 'styled-components';
import {
  BoxArrowRight,
  List as MenuIcon,
  PersonCircle,
} from 'react-bootstrap-icons';
import { IconButton } from '@material-ui/core';
import Profile from './Profile';
import DropdownWithLabel from '../../UI/DropdownWithLabel';
import { useAppSelector } from '../../store/hooks';

import { auth } from '../../firebase';

const Container = styled.div`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.5rem;
  color: var(--color-primary);
  border-bottom: var(--border-thick);

  & .btn-open {
    display: none;
  }

  & .menu-icon {
    font-size: 2rem;
  }

  @media (max-width: 900px) {
    & .btn-open {
      display: flex;
    }
  }
`;

const Header: React.FC<{ openSidebar: () => void }> = ({ openSidebar }) => {
  const selectedProject = useAppSelector(state => state.app.selectedProject);
  const projects = useAppSelector(state => state.auth.userInfo!.projects);
  const userInfo = useAppSelector(state => state.auth.userInfo);

  const alertUserInfo = () => {
    alert(JSON.stringify(userInfo, null, 2));
  };

  const signOut = () => {
    auth.signOut();
  };

  return (
    <Container>
      <IconButton onClick={openSidebar} color="inherit" className="btn-open">
        <MenuIcon className="menu-icon" />
      </IconButton>
      <h2>{projects.find(project => project.id === selectedProject)?.name}</h2>
      <DropdownWithLabel
        listItems={[
          {
            Icon: PersonCircle,
            content: 'Account Info',
            onClick: alertUserInfo,
          },
          { Icon: BoxArrowRight, content: 'Logout', onClick: signOut },
        ]}
        responsive={true}
      >
        <Profile />
      </DropdownWithLabel>
    </Container>
  );
};

export default Header;
