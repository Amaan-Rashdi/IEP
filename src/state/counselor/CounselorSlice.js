import { createSlice } from '@reduxjs/toolkit';
import { getCounselor } from './CounselorAction';
const counselorsetup = localStorage.getItem('counselorsetup')
  ? JSON.parse(localStorage.getItem('counselorsetup'))
  : null

const initialState = {
  loading: false,
  error: null,
  counselorDetails: counselorsetup || {},
};

const counselorSlice = createSlice({
  name: 'counselor',
  initialState,
  reducers: {},
  extraReducers: {
    [getCounselor.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.counselorDetails = null;
    },
    [getCounselor.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.counselorDetails = payload;
    },
    [getCounselor.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default counselorSlice.reducer;