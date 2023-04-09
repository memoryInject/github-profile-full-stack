import { useState, useEffect } from 'react';
import { Row, Col, Spinner, ListGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import AlertError from '../../components/AlertError';
import RepoModal from './RepoModal';
import Paginate from './Paginate';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useFetchUserRepoQuery, RepoData } from './repoAPISlice';
import { setPage } from './repoSlice';

const Repo = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState({
    repo_type: '',
    followers: 0,
    name: '',
    description: '',
    language: '',
    full_name: '',
    url: '',
  });
  const page = useAppSelector((state) => state.repo.page);
  const { data, isLoading, isError, isFetching } = useFetchUserRepoQuery(page, {
    skip: false,
  });

  // Check if the page params present in the url then set page to the pageNum
  // since params came from a hook this useEffect execute when the url changes
  // it also help to simplify pagination. (check on Paginate.tsx components for more info)
  useEffect(() => {
    if (params.pageNum) {
      const pageNum = parseInt(params.pageNum);
      if (!isNaN(pageNum)) {
        dispatch(setPage(pageNum));
      }
    }
  }, [params.pageNum, dispatch]);

  const alertClicked = (repo: RepoData) => {
    setModalData({
      repo_type: repo.private ? 'private' : '',
      followers: repo.followers,
      name: repo.name,
      description: repo.description,
      language: repo.language,
      full_name: repo.fullName,
      url: repo.htmlUrl,
    });
    setModalShow(true);
  };

  const listGroupItems = (repos: RepoData[]) => {
    return (
      <>
        {repos.map((repo, idx) => (
          <ListGroup.Item key={idx} action onClick={() => alertClicked(repo)}>
            {repo.name}
          </ListGroup.Item>
        ))}
      </>
    );
  };

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
      {data && (
        <>
          <Row
            className="justify-content-md-center px-4"
            style={{ borderRadius: '8px' }}
          >
            <Col>
              <div className="text-center py-2">
                <span
                  className="fw-bold"
                  style={{
                    position: 'relative',
                  }}
                >
                  Repos
                  {isFetching && (
                    <Spinner
                      animation="border"
                      variant="success"
                      size="sm"
                      style={{
                        position: 'absolute',
                        top: '3px',
                        right: '-22px',
                      }}
                    />
                  )}
                </span>
              </div>
              <ListGroup defaultActiveKey="#link1" className="text-center">
                {listGroupItems(data.repos)}
              </ListGroup>
            </Col>
          </Row>
          <RepoModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            {...modalData}
          />
          <Paginate />
        </>
      )}
    </>
  );
};

export default Repo;
