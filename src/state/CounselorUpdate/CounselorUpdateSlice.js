import { createSlice } from '@reduxjs/toolkit';
import {getCounselor_Update} from './CouncelorUpdateAction';


const counselor_update = localStorage.getItem('counselor_update')
  ? JSON.parse(localStorage.getItem('counselor_update'))
  : null

const initialState = {
  loading: false,
  counselor_updateInfo: counselor_update ||  {},
  error: null,
  success: false,
};

const Counselor_updateSlice = createSlice({
  name: 'counselor_update',
  initialState,
  reducers: {
  },
  extraReducers: {
    [getCounselor_Update.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [getCounselor_Update.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.counselor_updateInfo = payload
      state.success = true
    },
    [getCounselor_Update.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },

   
  },
});

export const { actions, reducer } = Counselor_updateSlice;
export default reducer;
