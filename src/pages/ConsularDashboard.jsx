
import C_DataTable from "../components/ConsularData";
import Header from "../components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col} from 'react-bootstrap';
const ConsularDashboard = () => {
  return (
    <div className="dashboard">
      <Header />
      <Container className="mt-4">
        <Row>
          <Col md={12}>
             <C_DataTable /> 
          </Col>
        </Row>
      </Container>
    </div>
   
  );
};

export default ConsularDashboard;
