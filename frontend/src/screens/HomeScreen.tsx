import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
  useFetchAccessQuery,
  useFetchClientQuery,
} from '../features/auth/authAPISlice';
import { setAccess } from '../features/auth/authSlice';
import Repo from '../features/repo/Repo';
import Profile from '../features/profile/Profile';
import { Container, Spinner, Row, Col } from 'react-bootstrap';
import AlertError from '../components/AlertError';
import { deserializeQuery } from '../utils/deserializeQuery';

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const access = useAppSelector((state) => state.auth.access);

  const [getClientId, setGetClientId] = useState(false);
  const [getAccessToken, setGetAccessToken] = useState(false);
  const [code, setCode] = useState('');

  const {
    data: dataClient,
    isError: isErrorClient,
    isLoading: isLoadingClient,
  } = useFetchClientQuery(true, {
    skip: !getClientId,
  });

  const { data, isError, isLoading } = useFetchAccessQuery(code, {
    skip: !getAccessToken,
  });

  // Run this hook when initial mount and run on getting clientId
  // If you still see this complicated code with lots of comments
  // that mean, I ran out of time for the test and I couldn't rewrite the logic.
  useEffect(() => {
    // Get the code param from url, send by github.
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get('code');

    // If there is a code in url and access state is false (we don't have auth-token yet)
    if (codeParam && !access) {
      // local state is needed for redux useFetchAccessQuery param
      setCode(codeParam);
      if (!data) {
        // this will trigger useFetchAccessQuery hook
        setGetAccessToken(true);
      }
    } else if (!access) {
      // First get clientId
      if (!dataClient) {
        setGetClientId(true);
      }

      // Once the clientId received from backend
      // get the code from github, if not signed in then go to github signin page.
      if (dataClient && dataClient.clientId) {
        window.location.assign(
          `https://github.com/login/oauth/authorize?client_id=${dataClient.clientId}&scope=user repo`
        );
      }
    }
    // eslint-disable-next-line
  }, [dataClient]);

  // This will set access to true in the localstorage, the actual access-token is
  // stored in client cookies.
  // access in localstorage is the only way to check if the access-token is available or not.
  useEffect(() => {
    // Once the auth-token data successfully fetched, set the access to true
    // in redux state, it will add the success state into local storage
    if (data && data.access) {
      dispatch(setAccess(true));
    }
  }, [data, dispatch]);

  // This will remove code in the url after access token is received from backend
  useEffect(() => {
    const query = deserializeQuery(location.search);
    if (query && query.code && access) {
      navigate('/');
    }
  }, [access, navigate, location]);

  return (
    <>
      {/* Error messages */}
      {isErrorClient && <AlertError />}
      {isError && <AlertError />}

      {/* Loading spinners */}
      {isLoadingClient && (
        <Spinner
          animation="grow"
          style={{
            margin: 'auto',
            display: 'block',
          }}
        />
      )}
      {!data && isLoading && (
        <Spinner
          animation="grow"
          style={{
            margin: 'auto',
            display: 'block',
          }}
        />
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

      {access && (
        <>
          <Profile />
          <Repo />
        </>
      )}
    </>
  );
};

export default HomeScreen;
