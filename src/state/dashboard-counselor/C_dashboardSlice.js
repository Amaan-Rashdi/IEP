import { createSlice } from '@reduxjs/toolkit';
import {getCounselor_Dashboard} from './C_dashboardAction';


const counselor_dashboard = localStorage.getItem('counselor_dashboard')
  ? JSON.parse(localStorage.getItem('counselor_dashboard'))
  : null

const initialState = {
  loading: false,
  counselor_dashboardInfo: counselor_dashboard ||  {},
  error: null,
  success: false,
};

const Counselor_dashboardSlice = createSlice({
  name: 'counselor_dashboard',
  initialState,
  reducers: {
  },
  extraReducers: {
    [getCounselor_Dashboard.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [getCounselor_Dashboard.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.counselor_dashboardInfo = payload
      state.success = true
    },
    [getCounselor_Dashboard.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },

   
  },
});

export const { actions, reducer } = Counselor_dashboardSlice;
export default reducer;
