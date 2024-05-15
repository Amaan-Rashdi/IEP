
import { useEffect } from "react";
import R_DataTable from "../components/DataTable";
import Header from "../components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const authObject = localStorage.getItem('userData')
      ? JSON.parse(localStorage.getItem('userData'))
      : null;
    if (!authObject) {
      localStorage.removeItem("userData");
      navigate('/');
     
    }
  }, []);
  
  return (
  

    
    <div className="dashboard">
      <Header />
      <Container className="mt-4">
        <Row>
          <Col md={12}>
             <R_DataTable /> 
          </Col>
        </Row>
      </Container>
    </div>
   
  );
};

export default Dashboard;
