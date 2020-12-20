import ReactLogo from 'assets/images/react.svg';
import Styled from 'components/Welcome/Styles';
import React, { useCallback, useState } from 'react';

function Welcome () {
  const [count, setCount] = useState(0);
  const handleButtonClick = useCallback(function () {
    setCount(count + 1);
  }, [count]);

  return (
    <Styled.Jumbotron>
      <Styled.Header>
        <Styled.Logo
          alt="React"
          src={ReactLogo}
        />
        React Starter
      </Styled.Header>

      <Styled.GetStarted>
        Remove <code>components/Welcome</code> to begin working!
      </Styled.GetStarted>

      <Styled.Button onClick={handleButtonClick}>
        Or click me for fun! ({count})
      </Styled.Button>
    </Styled.Jumbotron>
  );
}

export default Welcome;
