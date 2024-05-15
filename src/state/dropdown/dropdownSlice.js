import { createSlice } from '@reduxjs/toolkit';
import { dropdown } from './dropdownAction';

const drop = localStorage.getItem('dropdown')
  ? JSON.parse(localStorage.getItem('dropdown'))
  : null

const initialState = {
  loading: false,
  dropdownData: drop || {},
  error: null,
  success: false,
};

const dropdownSlice = createSlice({
  name: 'dropdown',
  initialState,
  reducers: {
  },
  extraReducers: {
    
    [dropdown.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [dropdown.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.dropdownData = payload; // Update dropdown data with fetched data
      state.success = true;
    },
    [dropdown.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { actions, reducer } = dropdownSlice;
export default reducer;
