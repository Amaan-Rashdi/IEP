import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { backendURL } from '../../config/url';

export const getCounselor_Update = createAsyncThunk(
    'counselor/dashboard/update',
    async ({ masterid,termId,sessionid }, { rejectWithValue }) => {
      try {
        console.log("pararms of api", masterid, termId, sessionid);
        // configure header's Content-Type as JSON
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      
        const { data } = await axios.get(
          `${backendURL}/api/IEP/GetIEpMasterWithDetails?iep_Master_ID=${masterid}&termID=${termId}&sessionID=${sessionid}`,
          config
        )
        console.log("dash" , data)
        console.log("data update", JSON.stringify(data.data))
        // store user's token in local storage
       localStorage.setItem('counselor_update', JSON.stringify(data.data))
        return data.data
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
