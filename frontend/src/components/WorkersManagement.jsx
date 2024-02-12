import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '/src/App.css';
import { Header } from './Header';
import Button from '@mui/material/Button';
import { ModelPopUp } from './ModelPopUp';
import { useUser } from '/src/UserContext.jsx';
import axios from 'axios';
import * as links from '/src/axios-handler.jsx';

import UserConnectionChecker from './UserConnectionChecker';

export const WorkersManagement = () => {

  const { handleUserType, handleUserId, handleWorkPlace, handleUserName , handleUserPhoneNumber,
    handleUserEmail } = useUser();

  const [WorkPlace, setWorkPlace] = useState(handleWorkPlace());
  const [userID, setUserID] = useState(handleUserId());
  const [userPhone, setUserPhone] = useState(handleUserPhoneNumber());
  const [userEmail, setEmail] = useState(handleUserEmail());
  const [userName, setUserName] = useState(handleUserName());
 
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);


  //get request to get the employees of manager userId and Workplace WorkPlace
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
  const [newWorkerID, setNewWorkerID] = useState('');

  //for popup
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(null);
  const [contentPOPUP, setContentPOPUP] = useState(null);

  // Dummy worker data for the dropdown options, after the backend delete it
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

  const handleRemoveWorker = async () => {
    try {
      const response = await axios.delete(links.url_workers_management, {
        params: {
          userid: userID,
          work_place: WorkPlace
        }
      });
      console.log(response);
      //if status =>
      setStatus(200);
      setContentPOPUP("העובד נמחק בהצלחה");
      setShowModal(true);
    } catch (error) {
      console.error("Error removing worker:", error);
    }
  };

  const handleInputWorkerID = (event) => {
    setNewWorkerID(event.target.value);
  };

  const handleAddWorker = async () => {
    try {
      const response = await axios.post(links.url_workers_management, null, {
        params: {
          userid: newWorkerID,
          work_place: WorkPlace
        }
      });
      console.log(response);
      //if status =>
      setStatus(200);
      setContentPOPUP("הוספת עובד בהצלחה");
      setShowModal(true);
    } catch (error) {
      console.error("Error adding worker:", error);
    }
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
            id="workerSelect"
            value={selectedWorker}
            onChange={handleWorkerChange}
            style={{ marginBottom: '5px' , color:'black'}}
          >
            <option value="">עובדים:</option>
            {workers.map(worker => (
            <option key={worker.id} value={worker.id}>
              {worker.name}
            </option>
          ))}
          </select>
        </div>

        {/* Buttons */}
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
            onChange={handleInputWorkerID} 
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
