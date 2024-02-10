import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '/src/App.css';
import { Header } from './Header';
import { useUser } from '/src/UserContext.jsx';
import Button from '@mui/material/Button';


import UserConnectionChecker from './UserConnectionChecker';

import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import dayjs from 'dayjs';

export const WorkHoursManagement = () => {
  
  const { handleUserType, handleUserId, handleWorkPlace, handleUserName , handleUserPhoneNumber,
    handleUserEmail } = useUser();

  const [userType, setUserType] = useState(handleUserType());
  const [userID, setUserID] = useState(handleUserId());
  const [userPhone, setUserPhone] = useState(handleUserPhoneNumber());
  const [userEmail, setEmail] = useState(handleUserEmail());
  const [userName, setUserName] = useState(handleUserName());
  const [userWorkPlace, setWorkPlace] = useState(handleWorkPlace());

  // State to track the selected value of the dropdown
  const [selectedWorker, setSelectedWorker] = useState('');
  const [newWorkerName, setNewWorkerID] = useState('');

  

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

  const [selectedDate, setSelectedDate] = useState(new Date());
 
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleShowMonth = () => {
    console.log('Show month button clicked');
    console.log(parseInt(selectedDate.$y, 10))
    console.log(parseInt(selectedDate.$M, 10)+1);
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

  return (
    <div>
      <UserConnectionChecker />
      <Header />
      <div dir="rtl">
        <h2>ניהול דוח שעות</h2>
        {content}{/* if manager so he can choose also workers */}
        <div dir="ltr">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker', 'DatePicker', 'DatePicker']}>
              <DatePicker 
                label={"חודש לבדיקה"} 
                views={['month', 'year']}
                onChange={handleDateChange}
                disableFuture 
                />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <div>
          <Button 
            color="primary"
            variant="contained"
            onClick={handleShowMonth}
            style={{ marginBottom: '60px' }}
            >הצג דוח
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WorkHoursManagement;
