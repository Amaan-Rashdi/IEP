import  { useEffect, useState } from "react";
import Logo from "../assets/logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import "../styles/Login.css";
import {  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import  {userLogin}  from "../state/auth/authAction";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
const { loading, userInfo ,error } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const userData = localStorage.getItem('userData')
  ? JSON.parse(localStorage.getItem('userData'))
  : null
  
  const counselor = localStorage.getItem('counselor')
  ? JSON.parse(localStorage.getItem('counselor'))
  : null
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    let username = e.target.username.value;
    let password = e.target.password.value;
  
    if (username.length > 0 && password.length > 0) {
      dispatch(userLogin({ username, password}))

        } 
       
    else {
      toast.error("Please fill all inputs");
    }
  };
  
  useEffect(() => {
    if(userData && counselor)
      {
        localStorage.removeItem('userData');
        localStorage.removeItem('counselor');
      }
    else if (userData) {
      navigate('/dashboard')
      console.log(userData)
    }
    else if(counselor){
      navigate('/counselor')
      console.log(counselor)
    }
   }, [navigate, userData, counselor]) 
   useEffect(() => {
    if (error) {
     // console.log(error.error)
      
     toast.error("Invalid Credentials", { autoClose: 500 });

      
    }
  }, [error]);


  return (
    <div className="login-main">
      
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo">
            <img src={Logo} alt="" />
          </div>
          <div className="login-center">
          
            <form onSubmit={handleLoginSubmit}>
              <input type="text" placeholder="username" name="username" />
              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                />
                {showPassword ? (
                  <FaEyeSlash
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                ) : (
                  <FaEye
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                )}
              </div>

            
              <div className="login-center-buttons">
              <button type="submit" disabled={loading}>
        {loading ? <Spinner /> : 'Login'}
      </button>
              
              </div>
            </form>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default Login;
