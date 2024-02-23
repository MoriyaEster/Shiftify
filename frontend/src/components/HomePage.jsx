import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Entry from './Entry';
import { Header } from './Header';
import { useUser } from '/src/UserContext.jsx';
import UserConnectionChecker from './UserConnectionChecker';

export const HomePage = () => {

  const { handleUserConnection, handleUserType, handleUserId, handleWorkPlaceChoosen, handleUserName, handleWorkPlaces } = useUser();

  const [state, setState] = useState({
    step: 0,
    work_place_value: "",
    userType: "",
    userID: "",
    userName: "",
    workPlaces: []
  });

  useEffect(() => {
    const fetchData = async () => {
      const userType = handleUserType();
      const userID = handleUserId();
      const userName = handleUserName();
      const workPlaces = handleWorkPlaces();

      setState((prevState) => ({ ...prevState, userType, userID, userName, workPlaces }));
    };

    fetchData();
  }, [state.userID]); 

  const Dropdown = ({ options, onSelect }) => {
    return (
      <select onChange={(e) => onSelect(e.target.value)} value={state.work_place_value}>
        <option value="" disabled>
                   
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.value}>
            {option.value}
          </option>
        ))}
      </select>
    );
  };

  const generateOptions = () => {
    console.log("state", state);
    return state.workPlaces.map((workPlace, index) => ({
      id: index + 1,
      value: workPlace,
    }));
  };

  const handleOptionSelect = (selectedValue) => {
    setState((prevState) => ({ ...prevState, step: 1, work_place_value: selectedValue }));
    handleWorkPlaceChoosen(selectedValue);
  };

  const options = generateOptions();


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
              <NavLink className="form-field" to="/WorkHoursManagement">
                צפיה בדו"ח שעות
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
                <NavLink className="form-field" to="/WorkHoursManagement">
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
      <UserConnectionChecker />
      <h1 className="welcome-heading">שלום {state.userName} </h1>
      <div>
        <h3>בחר מקום עבודה:</h3>
        <Dropdown options={options} onSelect={handleOptionSelect} />
        {content}
      </div>
    </div>
  );
};

export default HomePage;