import styled from 'styled-components';

export default styled.a`
  text-decoration: none;
  color: inherit;

  display: inline-block;
  background-color: #fff;
  padding: 0.25rem;
  transition: transform 300ms;

  &:hover {
    transform: rotateZ(15deg) scale(1.05);
    box-shadow: 0 5px 5px #00000030;
  }

  &:active {
    transform: rotateZ(15deg) scale(0.95);
    box-shadow: 0 2px 2px #00000030;
  }
`;
