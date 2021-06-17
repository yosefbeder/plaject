import React from 'react';
import styled from 'styled-components';
import ClockLoader from 'react-spinners/ClockLoader';

const Container = styled.div``;

export default function LoadingPage() {
  return (
    <Container>
      <div className="quote">
        <h3 className="content">
          The creative adult is the child who is still alive
        </h3>
        <div className="author">- Yosef beder</div>
      </div>
      <ClockLoader />
    </Container>
  );
}
