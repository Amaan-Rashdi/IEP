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
export const postIEPData = createAsyncThunk(
  'IEP/postIEPData',
  async (postData) => {
    try {
        console.log(postData)
      // Make the POST request using axios or fetch
      const response = await axios.post(`${backendURL}/api/IEP`, postData, {
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
const IEPSlice = createSlice({
  name: 'iep',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle pending action
    builder.addCase(postIEPData.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    // Handle fulfilled action
    builder.addCase(postIEPData.fulfilled, (state) => {
      state.status = 'idle';
      state.error = null;
    });
    // Handle rejected action
    builder.addCase(postIEPData.rejected, (state, action) => {
      state.status = 'idle';
      state.error = action.error.message;
    });
  },
});

export default IEPSlice.reducer;
