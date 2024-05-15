import { createSlice } from '@reduxjs/toolkit'
import  {userLogin}  from './authAction'


const userData = localStorage.getItem('userData')
  ? JSON.parse(localStorage.getItem('userData'))
  : null

  const counselor = localStorage.getItem('counselor')
  ? JSON.parse(localStorage.getItem('counselor'))
  : null

const initialState = {
  loading: false,
  userInfo: userData || counselor || {}, // for user object
  error: null,
  success: false, // for monitoring the registration process.
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [userLogin.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.userInfo = payload
      state.success = true
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
  },
})

export default authSlice.reducer