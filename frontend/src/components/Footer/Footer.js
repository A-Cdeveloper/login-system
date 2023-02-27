import { Container, Row, Col } from "reactstrap";
const Footer = () => {
  return (
    <Container fluid className="text-center p-2 position-fixed bottom-0 start-0">
      <Container tag="footer">
        <Row>
          <Col>@All right reserved</Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Footer;
