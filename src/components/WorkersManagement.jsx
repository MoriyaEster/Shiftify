import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '/src/App.css';
import { Header } from './Header';
import { useUser } from '/src/UserContext.jsx';

export const WorkersManagement = () => {
  
  const navigate = useNavigate();

  const { handleUserConnection } = useUser();

  useEffect(() => {
    if (handleUserConnection() == false) {
      // Redirect to /Registery
      navigate('/');
    }
  }, [navigate]);

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
            id="workerSelect"
            value={selectedWorker}
            onChange={handleWorkerChange}
          >
            <option value="">רשימת עובדים:</option>
            {workers.map((worker, index) => (
              <option key={index} value={worker}>
                {worker}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div>
          <button onClick={handleGetInfoOfWorker}>פרטי עובד</button>
        </div>

        <div>
          <button onClick={handleRemoveWorker} style={{ marginBottom: '60px' }}>מחיקת עובד</button>
        </div>

        <div>
          {/* Input box for adding a new worker */}
          <input
            type="text"
            id="newWorkerName"
            value={newWorkerName}
            onChange={handleInputWorkerID}
            placeholder="ת.ז:"
          />
        </div>

        <div>
          <button onClick={handleAddWorker}>הוספת עובד</button>
        </div>
      </div>
    </div>
  );
};

export default WorkersManagement;
