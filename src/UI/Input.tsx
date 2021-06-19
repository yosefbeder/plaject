import React from 'react';
import styled from 'styled-components';

const Input = styled.input<{ variant: 'h1' | 'h2' | 'h3' | 'text' }>`
  outline: none;

  background-color: transparent;
  color: inherit;
  padding: 0.25rem;
  border: 1px solid transparent;
  border-radius: 5px;
  transition: all 300ms;
  font: ${props => `var(--font-${props.variant})`};

  &:focus {
    background-color: var(--color-grey);
    border: var(--border-thick);
  }
`;

export default Input;
