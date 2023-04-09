import { useEffect } from 'react';
import { Spinner, Row, Col } from 'react-bootstrap';
import { useAppDispatch } from '../app/hooks';
import AlertError from '../components/AlertError';
import { useLogoutQuery } from '../features/auth/authAPISlice';
import { setAccess } from '../features/auth/authSlice';

const LogoutScreen = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, isError } = useLogoutQuery();

  useEffect(() => {
    if (data) {
      dispatch(setAccess(false));
    }
  }, [data, dispatch]);

  return (
    <Row className="justify-content-md-center p-5 m-5">
      <Col md="auto">
        {!data && isLoading && (
          <>
            <Spinner
              animation="grow"
              size="sm"
              style={{
                margin: 'auto',
                display: 'block',
                marginBottom: '15px',
              }}
            />
            <h4>Logging out...</h4>
          </>
        )}
        {data && <h4>Logged out successfully!</h4>}
        {isError && <AlertError />}
      </Col>
    </Row>
  );
};

export default LogoutScreen;
