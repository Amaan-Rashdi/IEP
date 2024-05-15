import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';
import { logoutUser } from '../logout/logoutSlice';
import { backendURL } from '../../config/url';
export const userLogin = createAsyncThunk(
    'auth/login',
    async ({ username, password }, { rejectWithValue ,dispatch  }) => {
      try {
        // configure header's Content-Type as JSON
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }
        const { data } = await axios.post(
          `${backendURL}/api/Login`,
          { username, password },
          config
        );
      
      console.log("data",data.data[0].user_Type_Id)
      console.log("for validation",JSON.stringify(data.data))
        if(data.data && Array.isArray(data.data) && data.data.length > 0) 
          {

            //automatic logout
            const removeLocalStorageAndLogout = () => {
              const counselor = JSON.parse(localStorage.getItem('counselor'));
              const userData = JSON.parse(localStorage.getItem('userData'));

              if (counselor && counselor.length > 0) {
                  dispatch(logoutUser({ userId: counselor[0].user_Name, reason: 'Automatic logout' }));
                  localStorage.removeItem('counselor');
              }

              if (userData && userData.length > 0) {
                  dispatch(logoutUser({ userId: userData[0].user_Name, reason: 'Automatic logout' }));
                  localStorage.removeItem('userData');
              }
          };


          // Set timeout to remove localStorage data after one hour
          setTimeout(removeLocalStorageAndLogout, 3600000); // 3600000


            if(data.data[0].user_Type_Id ===34)
              {
                if (localStorage.getItem('userData')) {
                localStorage.removeItem('userData'); // Remove existing data
              }
                
                localStorage.setItem('counselor', JSON.stringify(data.data))
              }
              else if(data.data[0].user_Type_Id === 1)
                {
                  if (localStorage.getItem('counselor')) {
                    localStorage.removeItem('counselor'); // Remove existing data
                  }
                  localStorage.setItem('userData', JSON.stringify(data.data))
                }
            return { success: true, message: 'Login successful' };
          }
          else{
            console.log("here")
            return rejectWithValue('Invalid credentials');
          }
       
      } catch (error) {
        // return custom error message from API if any
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message)
        } else {
          return rejectWithValue(error.message)
        }
      }
    }
  )