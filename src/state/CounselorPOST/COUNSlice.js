import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Children } from 'react';
import { backendURL } from '../../config/url';
// Define the initial state
const initialState = {
  status: 'idle',
  error: null,
};

// Define the async thunk action creator for making the POST request
export const counIEPData = createAsyncThunk(
  'IEP/counIEPData',
  async (postData) => {
    try {
        console.log(postData)
      // Make the POST request using axios or fetch
      const response = await axios.post(`${backendURL}/api/IEP/Counc_IEPDetails`, postData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
        console.log("resp",response)
      // Return data if needed
      return response.data;
    } catch (error) {
      // Throw an error if the request fails
      console.log("error")
      throw new Error('Failed to post IEP data');
    }
  }
);

// Create the IEP slice
const CounSlice = createSlice({
  name: 'counc',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle pending action
    builder.addCase(counIEPData.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    // Handle fulfilled action
    builder.addCase(counIEPData.fulfilled, (state) => {
      state.status = 'idle';
      state.error = null;
    });
    // Handle rejected action
    builder.addCase(counIEPData.rejected, (state, action) => {
      state.status = 'idle';
      state.error = action.error.message;
    });
  },
});

export default CounSlice.reducer;
