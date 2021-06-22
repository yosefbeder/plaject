import React from 'react';
import styled from 'styled-components';
import { PlusLg } from 'react-bootstrap-icons';

const Container = styled.div`
  flex: 0 0 max-content;
  background-color: var(--color-grey-light);
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

  & svg {
    margin-right: 1rem;
  }

  & h3 {
    width: max-content;
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
