import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Entry from './Entry';
import { Header } from './Header';
import { useUser } from '/src/UserContext.jsx';

export const HomePage = () => {
  const navigate = useNavigate();

  const { handleUserConnection, handleUserType, handleUserId } = useUser();

  useEffect(() => {
    if (handleUserConnection() === false) {
      navigate('/');
    }
  }, [navigate]);

  const [state, setState] = useState({
    step: 0,
    work_place_value: "",
    userType: handleUserType(),
    userID: handleUserId()
  });

  const Dropdown = ({ options, onSelect }) => {
    return (
      <select onChange={(e) => onSelect(e.target.value)} value={state.work_place_value}>
        <option value="" disabled>
          בחר מקום עבודה
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  };

  const options = [
    { id: 1, value: 'option1', label: 'Option 1' },
    { id: 2, value: 'option2', label: 'Option 2' },
  ];

  const handleOptionSelect = (selectedValue) => {
    setState((prevState) => ({ ...prevState, step: 1, work_place_value: selectedValue }));
  };

  let content;
  switch (state.step) {
    case 1:
      switch (state.userType) {
        case 0: // employee
          content = (
            <>
              <Entry workPlaceValue={state.work_place_value} userID={state.userID} />
              <NavLink className="form-field" to="/SelectShifts">
                הגשת משמרות
              </NavLink>
              <NavLink className="form-field" to="/ApprovedShift">
                צפיה במשמרות מאושרות
              </NavLink>
            </>
          );
          break;
        case 1: // employer
          content = (
            <>
              <div className="form-row">
                <NavLink className="form-field" to="/ShiftManagement">
                  קביעת משמרות
                </NavLink>
                <NavLink className="form-field" to="/WorkersManagement">
                  ניהול עובדים
                </NavLink>
                <NavLink className="form-field" to="/HourlyReport">
                  ניהול דוח שעות
                </NavLink>
              </div>
            </>
          );
          break;
        default:
          // need to send error
          break;
      }
  }

  return (
    <div dir="rtl">
      <Header />
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
