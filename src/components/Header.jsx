import 'bootstrap/dist/css/bootstrap.min.css';
import {  useEffect, useState } from 'react';
import { Container, Navbar,  Dropdown} from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { logoutUser } from '../state/logout/logoutSlice';

// Header component
const Header = () => {
  const [first_Name, setFirstname] = useState("");
  const [user_id , setuser_id] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {

    const authObject = localStorage.getItem('userData')
  ? JSON.parse(localStorage.getItem('userData'))
  : null;

  const counselor = localStorage.getItem('counselor')
  ? JSON.parse(localStorage.getItem('counselor'))
  : null;
  if(authObject && counselor){
    localStorage.removeItem('userData');
    localStorage.removeItem('counselor');
  }
  else if(authObject)
    {
    const value = authObject[0] ? authObject[0] : null;
    console.log("storedUserData", authObject[0]);
    if (value) {
      setFirstname(value.first_Name);
      setuser_id(value.user_Name);
    }
  }
  else if (counselor){
    const value = counselor[0] ? counselor[0] : null;
    console.log("storedUserData", counselor[0]);
    if (value) {
      setFirstname(value.first_Name);
      setuser_id(value.user_Name);
    }
  }
  else
  {localStorage.removeItem("userData");
  navigate('/');}
  }, []);

  const handleLogout = () => {
    
    dispatch(logoutUser({ userId:user_id , reason: 'Manually logout' }));
    localStorage.removeItem("userData");
    localStorage.removeItem("counselor");
        navigate("/");
  
  };

 

  return (
    <Navbar style={{ backgroundColor: '#0C4DA2' }} variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home" className="d-flex align-items-center">
          <img
            src={logo}
            width="70"
            height="80"
            className="d-inline-block align-top"
            alt="Logo"
          />
          <div className="ml-3">
            <h3 className="text-white mb-0">THE CITY SCHOOL</h3>
            
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              <img
                src={`https://ui-avatars.com/api/?name=${first_Name}`}
                alt={first_Name}
                style={{ marginLeft: '5px', marginRight : '5px', borderRadius: '50%', width: '30px', height: '30px' }}
              />
              <span className="text-white">{first_Name}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu align="right">
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
