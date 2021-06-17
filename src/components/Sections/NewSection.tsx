import React from 'react';
import styled from 'styled-components';
import Button from '../../UI/Button';
import { PlusLg } from 'react-bootstrap-icons';

const Container = styled.div`
  background-color: var(--color-grey-light);
  flex: 0 0 max-content;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  margin: 0 0.5rem;
  height: 3.2rem;
  border: 2px dashed var(--color-black);
  border-radius: 5px;
  cursor: pointer;
  transition: all 300ms;

  &:hover {
    background-color: var(--color-grey);
  }

  &:active {
    background-color: var(--color-grey-dark);
    color: var(--color-white);
    border: 2px solid var(--color-grey-dark);
  }

  svg {
    margin-right: 1rem;
  }
`;

const NewSection: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <Container onClick={onClick}>
      <PlusLg size={18} />
      <h3>Add a new Section</h3>
    </Container>
  );
};

export default NewSection;
