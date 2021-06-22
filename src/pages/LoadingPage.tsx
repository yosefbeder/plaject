import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 8rem auto 0 auto;
  width: max-content;
  max-width: 30rem;

  .quote {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    text-align: center;
  }
`;

const LoadingPage: React.FC<{ noQuote?: boolean }> = ({ noQuote }) => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    if (!noQuote) {
      fetch('https://api.quotable.io/random')
        .then(response => response.json())
        .then(data => {
          setQuote(data.content);
          setAuthor(data.author);
        })
        .catch(err => {
          setQuote('The creative adult is the child who survived');
        });
    }
  }, []);

  return (
    <Container>
      <div className="quote">
        {!noQuote && (
          <h3 className="content">
            {quote || (
              <Loader
                type="ThreeDots"
                color="#4a4e4d"
                width={55}
                height={50}
                timeout={100}
              />
            )}
          </h3>
        )}
        {!noQuote && (
          <div className="author">
            {(author && `- ${author}`) || (
              <Loader type="ThreeDots" color="#4a4e4d" width={35} height={35} />
            )}
          </div>
        )}
      </div>
      <Loader type="TailSpin" color="#2bae66" width={50} height={50} />
    </Container>
  );
};

export default LoadingPage;
