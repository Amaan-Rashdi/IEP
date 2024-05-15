import { createAsyncThunk } from '@reduxjs/toolkit';

import { backendURL } from '../../config/url';

export const getCounselor = createAsyncThunk(
    'counselor/fetchStudentDetails',
    async ({studentId},{ rejectWithValue }) => {
      try {
        console.log("in counselor api")
        const response = await fetch(
          `${backendURL}/api/ConselorSetup/CouncellorSetupALL?studentID=${studentId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        
        if (!response.ok) {

          throw new Error('Failed to fetch data');
        }
        console.log("maroof")
        const data = await response.json();
        console.log("counselor iep", JSON.stringify(data))
        localStorage.setItem('counselorsetup', JSON.stringify(data))
        // store user's token in local storage
        return data;
      } catch (error) {
        // return custom error message from API if any
        return rejectWithValue(error.message);
      }
    }
);

