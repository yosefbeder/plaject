import React from 'react';
import styled from 'styled-components';
import { ListCheck } from 'react-bootstrap-icons';

const Container = styled.h1`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-primary);
`;

export default function Logo() {
  return (
    <Container>
      <ListCheck />
      Plaject
    </Container>
  );
}
