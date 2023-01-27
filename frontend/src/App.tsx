import React, { useEffect, useState } from 'react';
import './bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { useAppSelector, useAppDispatch } from './app/hooks';
import { useFetchAccessQuery } from './features/auth/authAPISlice';
import { setAccess } from './features/auth/authSlice';

function App() {
  const dispatch = useAppDispatch();

  const clientId = useAppSelector((state) => state.auth.clientId);
  const access = useAppSelector((state) => state.auth.access);

  const [rerender, setRerender] = useState(false);
  const [getAccessToken, setGetAccessToken] = useState(false);
  const [code, setCode] = useState('');

  const { data, isFetching, isLoading } = useFetchAccessQuery(code, {
    skip: !getAccessToken,
  });
  console.log('data', data);

  // Run this hook when initial mount
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get('code');
    console.log(codeParam);

    if (codeParam && !access) {
      console.log('hello');
      setCode(codeParam);
      setGetAccessToken(true);
      dispatch(setAccess(true));
      setRerender(!rerender);
    }
  }, []);

  const loginWithGithub = () => {
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${clientId}`
    );
  };

  const getUserData = () => {
    console.log(access);
  };

  return (
    <div className="App">
      <Container>
        <div>
          <h3>Login with Github</h3>
          <Button onClick={loginWithGithub}>Github Login</Button>
          {access ? (
            <>
              <h3>Get user data from gitub API</h3>
              <Button onClick={getUserData}>Get user data</Button>
            </>
          ) : (
            <></>
          )}
        </div>
      </Container>
    </div>
  );
}

export default App;
