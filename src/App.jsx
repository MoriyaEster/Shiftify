import React from 'react';
import { ConnectionForm } from './components/ConnectionForm';
import './App.css';
import { RegisteryForm } from './components/RegisteryForm';
import { SelectShifts } from './components/SelectShifts';
import { HomePageEmployee } from './components/HomePageEmployee';
import { ProfileEmployee } from './components/ProfileEmployee';
import { createBrowserRouter,BrowserRouter as Router, Routes, Route, BrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'; // Import only here

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<ConnectionForm />} />
      <Route path="/Registery" element={<RegisteryForm />} />
      <Route path="/SelectShifts" element={<SelectShifts />} />
      <Route path="/HomePageEmployee" element={<HomePageEmployee />} />
      <Route path="/ProfileEmployee" element={<ProfileEmployee />} />

    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
