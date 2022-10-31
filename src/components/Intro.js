import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Intro = () => {
  return (
    <div className="intro">
      <Container className="text-white d-flex justify-content-center align-items-center text-center">
        <Row>
          <Col>
            <div className="Judul wow fadeInUp">Nonton Gratis</div>
            <div className="Judul wow fadeInDown">Gak Pake Karcis</div>
            <div
              data-wow-duration="5s"
              className="Button mt-4 text-center wow fadeInUp"
            >
              <Link className="btn btn-dark" to="/SearchMovie">
                Yuk Mulai Nonton
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Intro;
