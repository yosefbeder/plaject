import styled from 'styled-components';

export default styled.div<{ width: number }>`
  margin: 2rem auto 0 auto;
  max-width: ${props => props.width}px;
  width: 100%;
  border: var(--border-thick);
  border-radius: 5px;
  box-shadow: 0px 5px 5px var(--color-grey-light);
  overflow: hidden;

  @media (max-width: ${props => props.width}px) {
    & {
      height: 100%;
      margin: 0;
      border-radius: 0;
      border: none;
      box-shadow: none;
    }
  }
`;
