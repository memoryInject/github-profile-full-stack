import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import { useState } from 'react';

import RepoModal from './RepoModal';
import Paginate from './components/Paginate';

const repoCollection = [
  {
    name: 'Hello-World',
    fullName: 'octocat/Hello-World',
    htmlUrl: 'https://github.com/octocat/Hello-World',
    description: `Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam.Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.`,
    private: true,
    language: 'Java',
    followers: 2,
  },
  {
    name: 'Hello-World-2',
    fullName: 'octocat/Hello-World-2',
    htmlUrl: 'https://github.com/octocat/Hello-World',
    description: 'This your first repo!!',
    private: false,
    language: 'C++',
    followers: 0,
  },
  {
    name: 'Hello-World-3',
    fullName: 'octocat/Hello-World-2',
    htmlUrl: 'https://github.com/octocat/Hello-World',
    description: 'This your first repo!!',
    private: false,
    language: 'C++',
    followers: 0,
  },
  {
    name: 'Hello-World-4',
    fullName: 'octocat/Hello-World-2',
    htmlUrl: 'https://github.com/octocat/Hello-World',
    description: 'This your first repo!!',
    private: false,
    language: 'Python',
    followers: 3,
  },
  {
    name: 'Hello-World-5',
    fullName: 'octocat/Hello-World-2',
    htmlUrl: 'https://github.com/octocat/Hello-World',
    description: 'This your first repo!!',
    private: false,
    language: 'Javascript',
    followers: 0,
  },
];

const Repos = () => {
  const [modalShow, setModalShow] = useState(false);

  const alertClicked = () => {
    setModalShow(true);
  };

  const listGroupItems = () => {
    return (
      <>
        {repoCollection.map((repo, idx) => (
          <ListGroup.Item key={idx} action onClick={alertClicked}>
            {repo.name}
          </ListGroup.Item>
        ))}
      </>
    );
  };

  return (
    <>
      <Row
        className="justify-content-md-center px-4"
        style={{ borderRadius: '8px' }}
      >
        <Col>
          <h5 className="text-center py-2">Repos</h5>
          <ListGroup defaultActiveKey="#link1" className="text-center">
            {listGroupItems()}
          </ListGroup>
        </Col>
      </Row>
      <RepoModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        repo_type={repoCollection[0].private ? 'private' : ''}
        followers={10}
        name="Hello-World"
        description={repoCollection[0].description}
        language="C++"
        full_name={repoCollection[0].fullName}
        url={repoCollection[0].htmlUrl}
      />
      <Paginate page={2} pages={4} />
    </>
  );
};

export default Repos;
