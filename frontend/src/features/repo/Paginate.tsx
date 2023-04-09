import { Pagination, Container, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAppSelector } from '../../app/hooks';

const Paginate = () => {
  const { page, totalPage } = useAppSelector((state) => state.repo);

  const getItem = () => {
    const itemList = [];
    for (let num = 0; num < totalPage; num++) {
      itemList.push(num);
    }

    return (
      <>
        {itemList.map((x) => (
          // LinkContainer works here because we have a hook based on pageNum
          // param setup on Repo.tsx component
          <LinkContainer key={x} to={`/pages/${x + 1}`}>
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </>
    );
  };

  return totalPage > 1 ? (
    <Container>
      <Row className="py-4">
        <Col className="d-flex justify-content-center">
          <Pagination>{getItem()}</Pagination>
        </Col>
      </Row>
    </Container>
  ) : (
    <></>
  );
};

export default Paginate;
