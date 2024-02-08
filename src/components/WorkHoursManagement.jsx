import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '/src/App.css';
import { Header } from './Header';
import { useUser } from '/src/UserContext.jsx';

import UserConnectionChecker from './UserConnectionChecker';

import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';


export const WorkHoursManagement = () => {
  
  const { handleUserType, handleUserId, handleWorkPlace, handleUserName , handleUserPhoneNumber,
    handleUserEmail } = useUser();

  // State to track the selected value of the dropdown
  const [selectedWorker, setSelectedWorker] = useState('');
  const [newWorkerName, setNewWorkerID] = useState('');

  // Dummy work places data for the dropdown options
  const workPlaces = [
    'Workplace 1',
    'Workplace 2',
    'Workplace 3',
    'Workplace 4',
    'Workplace 5',
    'Workplace 6',
    // Add more work places as needed
  ];

  // Dummy worker data for the dropdown options
  const workers = [
    'Worker 1',
    'Worker 2',
    'Worker 3',
    // Add more workers as needed
  ];

  // Event handler for dropdown value change
  const handleWorkerChange = (event) => {
    setSelectedWorker(event.target.value);
  };


  let content;
  switch (userType) {
        case 1: // employer
          content = (
            <>
              <div>
                {/* Dropdown select */}
                <select 
                  className='body'
                  id="workerSelect"
                  value={selectedWorker}
                  onChange={handleWorkerChange}
                  style={{ marginBottom: '5px' ,color:'black'}}
                >
                  <option value="">עובדים:</option>
                  {workers.map((worker, index) => (
                    <option key={index} value={worker}>
                      {worker}
                    </option>
                  ))}
                </select>
              </div>
            </>
          );
          break;
        default:
          // need to send error
          break;
      }
  let clock;
  clock = (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
          'TimePicker',
          'MobileTimePicker',
        ]}
      >
        <DemoItem>
          <MobileTimePicker
            ampm={false}
            />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
  return (
    <div>
      <UserConnectionChecker />
      <Header />
      <div dir="rtl">
        <h2>ניהול דוח שעות</h2>
        <div>
          {/* Dropdown select */}
          <select 
            className='body'
            id="workePlaceSelect"
            value={selectedWorker}
            onChange={handleWorkerChange}
            style={{ marginBottom: '5px' , color:'black'}}
          >
            <option value="">מקומות עבודה:</option>
            {workPlaces.map((Workplace, index) => (
              <option key={index} value={Workplace}>
                {Workplace}
              </option>
            ))}
          </select>
        </div>

        {content}{/* if manager so he can choose also workers */}
        <h4>עבור שבוע אחרון:</h4>
        <div className='container'>
          <h3 className="h3">ראשון</h3>
          <h5 className="h5">dd.mm.yyyy</h5> {/* to change */}
          {clock}
          <h1>-</h1>
          {clock}
        </div>
        <div className='container'>
          <h3 className="h3">שני</h3>
          <h5 className="h5">dd.mm.yyyy</h5> {/* to change */}
          {clock}
          <h1>-</h1>
          {clock}
        </div>
        <div className='container'>
          <h3 className="h3">שלישי</h3>
          <h5 className="h5">dd.mm.yyyy</h5> {/* to change */}
          {clock}
          <h1>-</h1>
          {clock}
        </div>
        <div className='container'>
          <h3 className="h3">רביעי</h3>
          <h5 className="h5">dd.mm.yyyy</h5> {/* to change */}
          {clock}
          <h1>-</h1>
          {clock}
        </div>
        <div className='container'>
          <h3 className="h3">חמישי</h3>
          <h5 className="h5">dd.mm.yyyy</h5> {/* to change */}
          {clock}
          <h1>-</h1>
          {clock}
        </div>
        <div className='container'>
          <h3 className="h3">שישי</h3>
          <h5 className="h5">dd.mm.yyyy</h5> {/* to change */}
          {clock}
          <h1>-</h1>
          {clock}
        </div>
        <div className='container'>
          <h3 className="h3">שבת</h3>
          <h5 className="h5">dd.mm.yyyy</h5> {/* to change */}
          {clock}
          <h1>-</h1>
          {clock}
        </div>
      </div>
    </div>
  );
};

export default WorkHoursManagement;
