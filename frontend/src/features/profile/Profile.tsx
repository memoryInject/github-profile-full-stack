import { Row, Col, Image, Button, Badge, Spinner } from 'react-bootstrap';
import AlertError from '../../components/AlertError';
import { useFetchUserProfileQuery } from './profileAPISlice';
import { useAppDispatch } from '../../app/hooks';
import { setTotalPage } from '../repo/repoSlice';
import { useEffect } from 'react';

const Profile = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, isError } = useFetchUserProfileQuery();

  // Everytime user profile data changes update the total pages for pagination
  // because on Github repo endpoint does not gives total number of repos,
  // so we have to do this hack.
  useEffect(() => {
    if (data) {
      const reposPerPage = 5;
      const totalRepos = data.publicRepos + data.privateRepos;
      const pages = totalRepos > 5 ? Math.ceil(totalRepos / reposPerPage) : 0;
      dispatch(setTotalPage(pages));
    }
  }, [data, dispatch]);

  return (
    <>
      {isError && <AlertError />}
      {!data && isLoading && (
        <Spinner
          animation="grow"
          style={{
            margin: 'auto',
            display: 'block',
            marginBottom: '15px',
          }}
        />
      )}
      {data && (
        <Row
          className="justify-content-md-center bg-dark mx-4"
          style={{ borderRadius: '8px' }}
        >
          <Col md="auto" className="p-4 text-center">
            <Image
              src={data.avatarUrl}
              alt={data.login}
              roundedCircle
              style={{ width: '150px' }}
            />
            <h1>{data.name}</h1>
            <p>{data.login}</p>
          </Col>
          <Col className="p-4">
            <h4>Bio</h4>
            <p>{data.bio ? data.bio : 'Bio is not available.'}</p>
            <div>
              <span className="fw-semibold">Location&nbsp; : </span>
              <span>{data.location}</span>
            </div>
            <div>
              <span className="fw-semibold">
                Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{' '}
              </span>
              {data.email ? <span>{data.email}</span> : <span>Private</span>}
            </div>
            <a href={data.htmlUrl}>
              <Button className="my-3" variant="secondary">
                Github Profile
              </Button>
            </a>
            <div>
              <Badge bg="success">Public Repos: {data.publicRepos}</Badge>{' '}
              <Badge bg="danger">Private Repos: {data.privateRepos}</Badge>{' '}
            </div>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Profile;
