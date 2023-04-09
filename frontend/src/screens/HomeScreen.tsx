import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { useFetchAccessQuery } from '../features/auth/authAPISlice';
import { setAccess } from '../features/auth/authSlice';
import Repo from '../features/repo/Repo';
import Profile from '../features/profile/Profile';
import { Container, Spinner, Row, Col } from 'react-bootstrap';
import AlertError from '../components/AlertError';

const HomeScreen = () => {
  const dispatch = useAppDispatch();

  const clientId = useAppSelector((state) => state.auth.clientId);
  const access = useAppSelector((state) => state.auth.access);

  const [rerender, setRerender] = useState(false);
  const [getAccessToken, setGetAccessToken] = useState(false);
  const [code, setCode] = useState('');

  const { data, isError, isLoading } = useFetchAccessQuery(code, {
    skip: !getAccessToken,
  });

  // Run this hook when initial mount
  // If you still see this complicated code with lots of comments
  // that mean, I ran out of time for the test and I couldn't rewrite the logic.
  useEffect(() => {
    // Get the code param from url, send by github.
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get('code');

    // Once the auth-token data successfully fetched, set the access to true
    // in redux state, it will add the success state into local storage
    if (data && data.access) {
      dispatch(setAccess(true));
    }

    // If there is a code in url and access state is false (we don't have auth-token yet)
    if (codeParam && !access) {
      // local state is needed for redux useFetchAccessQuery param
      setCode(codeParam);
      if (!data) {
        // this will trigger useFetchAccessQuery hook
        setGetAccessToken(true);
      }
      // force to rerender this component
      setRerender(!rerender);
    } else if (!access) {
      // get the code from github, if not signed in then go to github signin page.
      window.location.assign(
        `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user repo`
      );
    }
  }, []);

  return (
    <>
      {isError && <AlertError />}
      {!data && isLoading && (
        <Spinner
          animation="grow"
          style={{
            margin: 'auto',
            display: 'block',
          }}
        />
      )}
      {access && (
        <>
          <Profile />
          <Repo />
        </>
      )}
      {!code && !access && (
        <Container>
          <Row className="justify-content-md-center py-4">
            <Col className="text-center" md="auto" sm="auto">
              <h4>Redirecting to Github for login...</h4>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default HomeScreen;
