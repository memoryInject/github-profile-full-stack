import { Pagination, Container, Row, Col } from 'react-bootstrap';

interface PaginateProps {
  pages: number;
  page: number;
}

const Paginate = ({ pages, page }: PaginateProps) => {
  const handler = (pageNum: number) => {
    console.log(pageNum);
  };

  const getItem = () => {
    const itemList = [];
    for (let num = 0; num < pages; num++) {
      itemList.push(num);
    }

    return (
      <>
        {itemList.map((x) => (
          <Pagination.Item
            active={x + 1 === page}
            onClick={() => handler(x + 1)}
            key={x}
          >
            {x + 1}
          </Pagination.Item>
        ))}
      </>
    );
  };

  return pages > 1 ? (
    <Container>
      <Row className="justify-content-md-center py-4">
        <Col className="text-center" md="auto">
          <Pagination>{getItem()}</Pagination>
        </Col>
      </Row>
    </Container>
  ) : (
    <></>
  );
};

export default Paginate;
