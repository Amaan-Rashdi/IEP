import { createSlice } from '@reduxjs/toolkit';
import { getTeacher } from './TeacherAction';


const teachersetup = localStorage.getItem('teachersetup')
  ? JSON.parse(localStorage.getItem('teachersetup'))
  : null
const initialState = {
  loading: false,
  error: null,
  studentDetails: teachersetup || {},
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {},
  extraReducers: {
    [getTeacher.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.studentDetails = null;
    },
    [getTeacher.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.studentDetails = payload;
    },
    [getTeacher.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default studentSlice.reducer;