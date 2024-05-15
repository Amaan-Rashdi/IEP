import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { backendURL } from '../../config/url';
// Define your logout thunk action creator
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async ({ userId, reason }) => {
    // Perform your logout API call here
    const response = await fetch(`${backendURL}/api/Login/Logout?UserID=${userId}&logoutReason=${reason}`, 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, reason }),
    });

    console.log("response: " + JSON.stringify(response));
    // Check if the API call was successful
    if (!response.ok) {
      throw new Error('Failed to logout');
    }

    console.log("Successfully logged out")
    // Return data if needed
    return await response.json();
  }
);

// Define the initial state
const initialState = {
  loading: false,
  error: null,
  isLoggedIn: true,
};

// Create the logout slice
const logoutSlice = createSlice({
  name: 'logout',
  initialState,
  reducers: {},
  extraReducers: {
    // Handle pending logout action
    [logoutUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    // Handle fulfilled logout action
    [logoutUser.fulfilled]: (state) => {
      state.loading = false;
      state.error = null;
      state.isLoggedIn = false;
      // Optionally, reset user state or any other state related to authentication
    },
    // Handle rejected logout action
    // Handle rejected logout action
[logoutUser.rejected]: (state, action) => {
    state.loading = false;
    state.error = action.payload ? action.payload.message : 'Failed to logout';
  },
  
  },
});

export default logoutSlice.reducer;