import { createAsyncThunk } from '@reduxjs/toolkit';

import { backendURL } from '../../config/url';

export const getTeacher = createAsyncThunk(
    'student/fetchStudentDetails',
    async ({ termId, studentId }, { rejectWithValue }) => {
      try {
        console.log("in student api")
        const response = await fetch(
          `${backendURL}/api/Students/StudentResultFetch?StudentId=${studentId}&TermId=${termId}`,
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
        console.log("student dashboard", JSON.stringify(data))
        // store user's token in local storage
        localStorage.setItem('teachersetup', JSON.stringify(data))
        return data;
      } catch (error) {
        // return custom error message from API if any
        return rejectWithValue(error.message);
      }
    }
);

