import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import styled from 'styled-components';
import { useAppSelector } from '../../store/hooks';

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  gap: 0.5rem;
  cursor: pointer;
  transition: background-color 300ms;
  border-radius: 5px;
  background-color: var(--color-primary-transparent-3);

  & .user-info {
    display: flex;
    flex-direction: column;
    color: var(--color-black);
  }

  & .username {
  }

  & .email {
    font-size: 0.8rem;
    font-weight: 300;
  }

  &:active {
    background-color: var(--color-primary-transparent-5);
  }

  @media (max-width: 600px) {
    background-color: transparent;

    &:active {
      background-color: transparent;
    }

    & .user-info {
      display: none;
    }
  }
`;

export default function Profile() {
  const userInfo = useAppSelector(state => state.auth.userInfo);

  return (
    <Container>
      <Avatar variant="rounded" src={userInfo!.thumbnail} />
      <div className="user-info">
        <span className="username">{userInfo!.name}</span>
        <span className="email">{userInfo!.email}</span>
      </div>
    </Container>
  );
}
