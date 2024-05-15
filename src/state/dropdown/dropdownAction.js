import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { backendURL } from '../../config/url';

  export const dropdown = createAsyncThunk(
    'auth/dropdown',
    async ({ classid }, { rejectWithValue }) => {
      try {
        // configure header's Content-Type as JSON
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }
        console.log("redux", classid)
        const { data } = await axios.get(
          `${backendURL}/api/Students/ExamTermFetch?Classid=${classid}`,
          config
        )
        console.log("dropdown", JSON.stringify(data))
        // store user's token in local storage
       localStorage.setItem('dropdown', JSON.stringify(data))
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