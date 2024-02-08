import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '/src/App.css';
import { Header } from './Header';
import Button from '@mui/material/Button';
import { ModelPopUp } from './ModelPopUp';
import { useUser } from '/src/UserContext.jsx';

import UserConnectionChecker from './UserConnectionChecker';

export const WorkersManagement = () => {

  const { handleUserType, handleUserId, handleWorkPlaceChoosen, handleUserName , handleUserPhoneNumber,
    handleUserEmail } = useUser();

  const [userType, setUserType] = useState(handleUserType());
  const [userID, setUserID] = useState(handleUserId());
  const [userPhone, setUserPhone] = useState(handleUserPhoneNumber());
  const [userEmail, setEmail] = useState(handleUserEmail());
  const [userName, setUserName] = useState(handleUserName());
  const [userWorkPlace, setWorkPlace] = useState(handleWorkPlaceChoosen());

  // State to track the selected value of the dropdown
  const [selectedWorker, setSelectedWorker] = useState('');
  const [newWorkerName, setNewWorkerID] = useState('');

  //for popup
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(null);
  const [contentPOPUP, setContentPOPUP] = useState(null);

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

  let info;
  const handleGetInfoOfWorker = () => {
    // Add your logic to handle getting info of a worker
    info = (
      <h1>gdsgu</h1>
    );
    console.log('info of Worker button clicked');
  };

  const handleRemoveWorker = () => {
    // Add your logic to handle removing a worker
    console.log('Remove Worker button clicked');
    //popup!
      //need to check the status
      setStatus(200);
      setContentPOPUP("מחקת עובד בהצלחה ");
      setShowModal(true);
  };

  const handleInputWorkerID = (event) => {
    setNewWorkerID(event.target.value);
  };

  const handleAddWorker = () => {
    // Add your logic to handle removing a worker
    console.log('Remove Worker button clicked');
    //popup!
      //need to check the status
      setStatus(200);
      setContentPOPUP("הוספת עובד בהצלחה ");
      setShowModal(true);

  };

  return (
    <div>
      <UserConnectionChecker />
      <Header />
      <div dir="rtl">
        <h2>ניהול עובדים</h2>
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
          {info}
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
      <ModelPopUp show={showModal} onClose={() => setShowModal(false)} status={status} content={contentPOPUP}/>
    </div>
  );
};

export default WorkersManagement;
