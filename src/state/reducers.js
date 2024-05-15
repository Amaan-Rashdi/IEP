import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 

import authReducer from './auth/authSlice';
import dashboardReducer from './dashboard/dashboardSlice';
import studentReducer from './Teacher/TeacherSlice';
import dropdrownReducer from './dropdown/dropdownSlice';
import logoutReducer from './logout/logoutSlice';
import IEPReducer from './IEPPost/IEPSlice';
import CounReducer from './CounselorPOST/COUNSlice';
import Counselor_dashboardReducer from './dashboard-counselor/C_dashboardSlice';
import counselorReducer from './counselor/CounselorSlice'
import wizardReducer from './wizard/wizardReducer';
import Counselor_updateSlice from './CounselorUpdate/CounselorUpdateSlice'
const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer, // Include dashboard reducer in the root reducer
  student: studentReducer, 
  dropdown: dropdrownReducer,
  logout : logoutReducer,
  iep : IEPReducer,
  counc : CounReducer,
  counselor_dashboard : Counselor_dashboardReducer,
  counselor : counselorReducer,
  wizard: wizardReducer,
  counselor_update : Counselor_updateSlice,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['wizard'], // Add the wizard reducer to the whitelist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;