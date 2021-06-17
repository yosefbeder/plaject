import React from 'react';
import { Icon } from 'react-bootstrap-icons';
import styled from 'styled-components';

const Container = styled.button<{
  variant: 'outlined' | 'contained';
  fullWidth?: boolean;
}>`
  // removing the default browser appearance
  outline: none;
  border: none;
  background-color: transparent;
  font-size: inherit;

  display: flex;
  align-items: center;
  ${props => (props.fullWidth ? 'justify-content: center;' : '')}
  text-transform: uppercase;
  cursor: pointer;
  padding: 0.5rem 1rem;
  ${props => props.fullWidth && 'width: 100%;'}
  border-radius: 5px;
  transition: background-color 300ms, transform 150ms;
  ${props =>
    props.variant === 'outlined'
      ? `
    color: var(--color-primary);
    border: 1px solid var(--color-primary);

    &:hover {
      background-color: var(--color-primary-transparent-2)
    }

    &:active {
      background-color: var(--color-primary-transparent-3)
    }
  `
      : `
    background-color: var(--color-primary);
    color: var(--color-white);
    border: 1px solid var(--color-primary);

    &:hover {
      background-color: var(--color-primary-light);
      border: 1px solid var(--color-primary-light);
    }
    &:active {
      transform: scale(0.98);
    }

  `}

  svg {
    margin-right: 1rem;
  }
`;

const Button: React.FC<{
  variant: 'outlined' | 'contained';
  onClick?: () => void;
  IconLabel?: Icon;
  fullWidth?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}> = ({
  variant,
  IconLabel,
  onClick,
  fullWidth,
  className,
  type,
  children,
}) => {
  return (
    <Container
      variant={variant}
      onClick={onClick}
      fullWidth={fullWidth}
      className={className}
      type={type}
    >
      {IconLabel && <IconLabel />}
      {children}
    </Container>
  );
};

export default Button;
