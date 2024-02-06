import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '/src/App.css';
import { Header } from './Header';
import { useUser } from '/src/UserContext.jsx';
import Button from '@mui/material/Button';

export const WorkersManagement = () => {
  
  const navigate = useNavigate();

  const { handleUserConnection } = useUser();

  // useEffect(() => {
  //   if (handleUserConnection() == false) {
  //     // Redirect to /Registery
  //     navigate('/');
  //   }
  // }, [navigate]);

  // State to track the selected value of the dropdown
  const [selectedWorker, setSelectedWorker] = useState('');
  const [newWorkerName, setNewWorkerID] = useState('');

  // Dummy work places data for the dropdown options
  const workPlaces = [
    'Workplace 1',
    'Workplace 2',
    'Workplace 3',
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

  const handleGetInfoOfWorker = () => {
    // Add your logic to handle getting info of a worker
    console.log('info of Worker button clicked');
  };

  const handleRemoveWorker = () => {
    // Add your logic to handle removing a worker
    console.log('Remove Worker button clicked');
  };

  const handleInputWorkerID = (event) => {
    setNewWorkerID(event.target.value);
  };

  const handleAddWorker = () => {
    // Add your logic to handle removing a worker
    console.log('Remove Worker button clicked');
  };

  return (
    <div>
      <Header />
      <div dir="rtl">
        <h2>ניהול עובדים</h2>
        <div>
          {/* Dropdown select */}
          <select 
            className='body'
            id="workerSelect"
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
        <div>
          {/* Dropdown select */}
          <select 
            className='body'
            id="workerSelect"
            value={selectedWorker}
            onChange={handleWorkerChange}
            style={{ marginBottom: '5px' , color:'black'}}
          >
            <option value="">עובדים:</option>
            {workers.map((worker, index) => (
              <option key={index} value={worker}>
                {worker}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div>
          <Button 
            color="primary"
            variant="contained"
            onClick={handleGetInfoOfWorker}
            style={{ marginBottom: '5px' }}
            >פרטי עובד
          </Button>
        </div>

        <div>
          <Button 
            color="primary"
            variant="contained"
            onClick={handleRemoveWorker}
            style={{ marginBottom: '60px' }}
            >מחיקת עובד
          </Button>
        </div>

        <div>
          {/* Input box for adding a new worker */}
          <input className='body'
            type="text"
            id="newWorkerName"
            value={newWorkerName}
            onChange={handleInputWorkerID} // כנראה שלא צריך כי יש כפתור
            placeholder="ת.ז:"
            style={{ marginBottom: '5px' }}
          />
        </div>

        <div>
          <Button 
          color="primary"
          variant="contained"
          onClick={handleAddWorker}>הוספת עובד
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WorkersManagement;
