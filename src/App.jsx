import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard, HomeLayout, Login, Logout,StudentDetail,ConsularDashboard} from "./pages";
import { ToastContainer } from 'react-toastify';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './state/store'
import Wizard from "./pages/Wizard";


function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<Login />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="logout" element={<Logout />} />
            <Route path="/student/:termId/:studentId" element={<StudentDetail/>} />
            {/* Counselor */}
            <Route path="/counselor" element={<ConsularDashboard/>} />
            <Route path="/iep/:termId/:studentId/:masterid" element={<Wizard/>}/>
      
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer position='top-center' />
      </PersistGate>
    </Provider>
  );
}

export default App;
