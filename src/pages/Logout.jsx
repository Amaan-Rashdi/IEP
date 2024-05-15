import  { useEffect } from 'react'
import "../styles/Logout.css";
import { useNavigate } from 'react-router-dom';

const Logout = () => {

    const navigate = useNavigate();
    
    useEffect(() => {
        localStorage.removeItem("userData");
        
        setTimeout(() => {
            navigate("/");
        },);
    });

  return (
    <div className='logout-main'>
    <h1>Logout Successful!</h1>
   
  </div>
  )
}

export default Logout