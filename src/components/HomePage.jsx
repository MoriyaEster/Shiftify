import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; 
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import '/src/App.css';
import { Entry } from './Entry';
import { Header } from './Header';
import {properties } from '/src/properties.jsx';

export const HomePage = () => {
  const navigate = useNavigate(); 

  const { handleUserConnection } = properties();

  useEffect(() => {
    if (handleUserConnection() == 0) {
      // Redirect to /Registery
      navigate('/');
    }
  }, [navigate]);

  // Use useState hook to create state variables
  const [state, setState] = useState({
    step: 0,
    work_place_id: 0,
    userType: 0 // for now 0-employee and 1-epmloyer
  });

  // Assuming you have the Dropdown component defined as before
  const Dropdown = ({ options, onSelect }) => {
    switch (state.step) {
      case 0:
        return (
          <select onChange={(e) => onSelect(e.target.value)} value="">
            <option value="" disabled>
              בחר מקום עבודה
            </option>
            {options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case 1:
        return (
          <select onChange={(e) => onSelect(e.target.value)} value={state.work_place_id}>
            <option value="" disabled>
              בחר מקום עבודה
            </option>
            {options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        );
      default:
        return null;
    }
  };

  const options = [
    { id: 1, value: 'option1', label: 'Option 1' },
    { id: 2, value: 'option2', label: 'Option 2' },
  ];

  const handleOptionSelect = (selectedValue) => {
    // Update the 'step' and 'work_place_id' states using setState
    setState((prevState) => ({ ...prevState, step: 1, work_place_id: selectedValue }));
  };

  // Switch statement outside the return
  let content;
  switch (state.step) {
    case 0:
      break;
    case 1:
      switch (state.userType) {
        case 0: //employee
          content = (
            <>
              <Entry></Entry>
              <NavLink className="form-field" to="/SelectShifts"> הגשת משמרות </NavLink>
              <NavLink className="form-field" to="/ApprovedShift">צפיה במשמרות מאושרות </NavLink>
            </>
          );
          break;
        case 1: //employer
          content = (
            <>
              <div className="form-row">
                <NavLink className="form-field" to="/ShiftManagement">קביעת משמרות </NavLink>
                <NavLink className="form-field" to=".....">ניהול עובדים  </NavLink>
                <NavLink className="form-field" to=".............">ניהול דוח שעות  </NavLink>
              </div>
            </>
          );
          break;
        default:
          //need to send error
          break;
      }
  }

  return (
    <div dir="rtl">
       <Header/>
      <h1>שלום ... </h1>
      <div>
        <h3>בחר מקום עבודה:</h3>
        <Dropdown options={options} onSelect={handleOptionSelect} />
        {content}
      </div>
    </div>
  );
};

export default HomePage;
