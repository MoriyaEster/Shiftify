import React from 'react';
import { ConnectionForm } from './components/ConnectionForm';
import './App.css';
import { RegisteryForm } from './components/RegisteryForm';
import { SelectShifts } from './components/SelectShifts';
import { HomePage } from './components/HomePage';
import { Profile } from './components/Profile';
import { EditEmployee} from './components/EditEmployee';
import { WorkersManagement } from './components/WorkersManagement';
import { WorkHoursManagement } from './components/WorkHoursManagement';
import { ShiftManagement } from './components/ShiftManagement';
import { ApprovedShift } from './components/ApprovedShift';
import { UserProvider } from './UserContext';
import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

import { createBrowserRouter,BrowserRouter as Router, Routes, Route, BrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';


const supabase = createClient(
  "https://zrlktsabdcwchgdxkywd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpybGt0c2FiZGN3Y2hnZHhreXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg1MTEyNzYsImV4cCI6MjAyNDA4NzI3Nn0.hF9L12hTmqhWhDGTLlCD43SsEjXt8Xs7GmsypqnRv7E" 
);


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<ConnectionForm />} />
      <Route path="/Registery" element={<RegisteryForm />}>
        <Route path=":employer" element={<RegisteryForm />}/>
      </Route>
      <Route path="/SelectShifts" element={<SelectShifts />} />
      <Route path="/HomePage" element={<HomePage />} />
      <Route path="/Profile" element={<Profile />} /> 
      <Route path="/EditEmployee" element={<EditEmployee />} /> 
      <Route path="/WorkersManagement" element={<WorkersManagement />} /> 
      <Route path="/WorkHoursManagement" element={<WorkHoursManagement />} /> 
      <Route path="/ShiftManagement" element={<ShiftManagement />} />
      <Route path="/ApprovedShift" element={<ApprovedShift />} />
    </Route>
  )
)

function App() {
  return (
    <UserProvider>
      <SessionContextProvider supabaseClient={supabase}>
    <RouterProvider router={router} />
    </SessionContextProvider>
    </UserProvider>
  );
}

export default App;