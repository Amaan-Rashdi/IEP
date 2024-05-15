import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { backendURL } from '../../config/url';

export const getCounselor_Dashboard = createAsyncThunk(
    'counselor/dashboard',
    async ({ username }, { rejectWithValue }) => {
      try {
        // configure header's Content-Type as JSON
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }
        console.log("counselor dashboard api", username)
        const { data } = await axios.get(
          `${backendURL}/api/Councellor/CouncStdFetch?CenterID=${username}`,
          config
        )
        console.log("dash" , data)
        console.log("data dashboard", JSON.stringify(data))
        // store user's token in local storage
       localStorage.setItem('counselor_dashboard', JSON.stringify(data))
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
