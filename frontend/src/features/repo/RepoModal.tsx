import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';

interface RepoModalProps {
  name: string;
  full_name: string;
  url: string;
  description: string;
  repo_type?: string | void;
  language?: string;
  followers: number;
  show: boolean;
  onHide: () => void;
}

const RepoModal = (props: RepoModalProps) => {
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{props.description}</p>
          <span className="fw-bold">Go to repo: </span>
          <a href={props.url}>{props.full_name}</a>
          <div className='text-center' style={{marginTop: '10px'}}>
            <Badge bg="primary">Language: {props.language}</Badge>{' '}
            <Badge bg="info">Followers: {props.followers}</Badge>{' '}
            {props.repo_type ? (
              <>
                <Badge bg="danger">Repo: Private</Badge>{' '}
              </>
            ) : (
              <>
                <Badge bg="success">Repo: Public</Badge>{' '}
              </>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RepoModal;
