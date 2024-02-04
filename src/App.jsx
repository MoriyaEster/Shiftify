import React from 'react';
import { ConnectionForm } from './components/ConnectionForm';
import './App.css';
import { RegisteryForm } from './components/RegisteryForm';
import { SelectShifts } from './components/SelectShifts';
// import { HomePage } from './components/HomePage';
import { Profile } from './components/Profile';
// import { Entry } from './components/Entry';
// import { WorkersManagement } from './components/WorkersManagement';
import { ShiftManagement } from './components/ShiftManagement';
import { ApprovedShift } from './components/ApprovedShift';

import { createBrowserRouter,BrowserRouter as Router, Routes, Route, BrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<ConnectionForm />} />
      <Route path="/Registery" element={<RegisteryForm />}>
        <Route path=":employer" element={<RegisteryForm />}/>
      </Route>
      <Route path="/SelectShifts" element={<SelectShifts />} />
      {/* <Route path="/HomePage" element={<HomePage />} />
      <Route path="/HomePage/Entry" element={<Entry />}/> */}
      <Route path="/Profile" element={<Profile />} /> 
      {/* <Route path="/WorkersManagement" element={<WorkersManagement />} /> */}
      <Route path="/ShiftManagement" element={<ShiftManagement />} />
      <Route path="/ApprovedShift" element={<ApprovedShift />} />
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
