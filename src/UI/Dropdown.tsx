import React from 'react';
import styled from 'styled-components';

// icons
import { Icon } from 'react-bootstrap-icons';

const Container = styled.ul<{ responsive?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  color: var(--color-black);
  width: 12rem;
  padding: 0.5rem 0;
  margin: 1rem auto;
  list-style: none;
  border-radius: 5px;
  border: var(--border-thin);

  &::before {
    content: '';
    position: absolute;
    top: -0.75rem;
    left: calc(50% - 0.75rem);

    width: 1.5rem;
    height: 1.5rem;
    background-color: #fff;
    transform: rotate(45deg);
    z-index: 50;
    border-top: var(--border-thin);
    border-left: var(--border-thin);
  }

  & li {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    gap: 1rem;
    z-index: 100;
    cursor: pointer;
    transition: background-color 300ms;

    svg {
      font-size: 1.2rem;
    }

    &:hover {
      background-color: var(--color-grey-light);
    }
  }

  ${props =>
    props.responsive &&
    `
    @media (max-width: 600px) {
      width: max-content;

      & li .content {
        display: none;
      }
    }
  `}
`;

interface ListItem {
  Icon: Icon;
  content: string;
  onClick: () => void;
}

const Dropdown: React.FC<{ items: ListItem[]; responsive?: boolean }> = ({
  items,
  responsive,
}) => {
  return (
    <Container responsive={responsive}>
      {items.map(({ Icon, content, onClick }, index) => (
        <li key={index} onClick={onClick}>
          <Icon className="icon" />
          <span className="content">{content}</span>
        </li>
      ))}
    </Container>
  );
};

export default Dropdown;
