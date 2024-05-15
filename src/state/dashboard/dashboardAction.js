import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { backendURL } from '../../config/url';

export const getDashboard = createAsyncThunk(
    'auth/dashboard',
    async ({ username }, { rejectWithValue }) => {
      try {
        // configure header's Content-Type as JSON
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }
        const { data } = await axios.get(
          `${backendURL}/api/Students/StudentListByCT?EmployeeID=${username}`,
          config
        )
        console.log("dash" , data)
        console.log("data dashboard", JSON.stringify(data))
        // store user's token in local storage
       localStorage.setItem('dashboard', JSON.stringify(data))
        return data
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
