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


export const WorkHoursManagement = () => {
  
  const { handleUserType, handleUserId, handleWorkPlace, handleUserName , handleUserPhoneNumber,
    handleUserEmail } = useUser();

  const [WorkPlace, setWorkPlace] = useState(handleWorkPlace());
  const [userType, setUserType] = useState(handleUserType());
  const [userID, setUserID] = useState(handleUserId());
  const [userName, setUserName] = useState(handleUserName());


  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  let workerslist

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get(links.url_workers_management+`?userID=${userID}&WorkPlace=${WorkPlace}`); 
              console.log(response.data)
          } catch (error) {
              setError(error);
          }
      };

      fetchData();
    }, []); // This empty array ensures that the effect runs only once, like componentDidMount

    if (error) {
      workerslist = <div>Error: {error.message}</div>;
    } else if (!data) {
        workerslist = <div>Loading...</div>;
    } else {
        // Assuming your response contains the 'users' field
        workerslist =  (
            <div>
                {data.users.map(user => (
                    <div key={userID}>{userName}</div>
                    // Assuming user object has a 'name' field
                ))}
            </div>
        );
    }


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

  //it sends it as integers values
  const handleShowMonth = async () => {
    try {
      console.log(parseInt(selectedDate.$y, 10))
      console.log(parseInt(selectedDate.$M, 10)+1);
      const response = await axios.get(links.url_managers_shifts`?userid=${userID}&work_place=${WorkPlace}&month=${parseInt(selectedDate.$M, 10)+1}&year=${parseInt(selectedDate.$y, 10)}`);
      setData(response.data);
    } catch (error) {
      setError(error);
    }
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
