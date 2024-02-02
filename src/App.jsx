import React from 'react';
import { ConnectionForm } from './components/ConnectionForm';
import './App.css';
import { RegisteryForm } from './components/RegisteryForm';
import { SelectShifts } from './components/SelectShifts';
import { HomePage } from './components/HomePage';
import { ProfileEmployee } from './components/ProfileEmployee';
import { ProfileEmployer } from './components/ProfileEmployer';
import { WorkersManagement } from './components/WorkersManagement';
import { ShiftManagement } from './components/ShiftManagement';

import { createBrowserRouter,BrowserRouter as Router, Routes, Route, BrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<ConnectionForm />} />
      <Route path="/Registery" element={<RegisteryForm />}>
        <Route path=":employer" element={<RegisteryForm />}/>
      </Route>
      <Route path="/SelectShifts" element={<SelectShifts />} />
      <Route path="/HomePage" element={<HomePage />} />
      <Route path="/ProfileEmployee" element={<ProfileEmployee />} /> 
      <Route path="/ProfileEmployer" element={<ProfileEmployer />} /> 
      <Route path="/WorkersManagement" element={<WorkersManagement />} />
      <Route path="/ShiftManagement" element={<ShiftManagement />} />
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
