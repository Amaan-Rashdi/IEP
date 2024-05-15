import { createSlice } from '@reduxjs/toolkit';
import { getDashboard } from './dashboardAction';


const dashboard = localStorage.getItem('dashboard')
  ? JSON.parse(localStorage.getItem('dashboard'))
  : null

const initialState = {
  loading: false,
  dashboardInfo:dashboard ||  {},
  error: null,
  success: false,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
  },
  extraReducers: {
    [getDashboard.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [getDashboard.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.dashboardInfo = payload
      state.success = true
    },
    [getDashboard.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },

   
  },
});

export const { actions, reducer } = dashboardSlice;
export default reducer;
