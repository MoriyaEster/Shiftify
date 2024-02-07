import React, { createContext, useContext, useState } from 'react';

// Create the context
const UserContext = createContext();

// Create a provider component to wrap your app with
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    user_id: null,
    user_type: null,
    connected: false,
  });

  // Function to handle login
  const handleLogin = (data) => {
    
    const parsedData = JSON.parse(data);
    console.log("parsedData", parsedData);
    console.log("userID", parsedData.userID);
    console.log("employer", parsedData.employer);
    setUser({
      user_id: parsedData.userID,
      user_type: parsedData.employer,
      connected: true,
    });
  };

  // Function to handle logout
  const handleLogout = () => {
    setUser({
      user_id: null,
      user_type: null,
      connected: false,
      work_place: null
    });
  };

  // Function to get user_id
  const handleUserId = () => user.user_id;

  const handleUserType = () => user.user_type;

  // Function to check if the user is connected
  const handleUserConnection = () => user.connected;

  const handleWorkPlace = () => user.work_place;

  const handleWorkPlaceChoosen = (work_place) => {
    setUser({
      work_place: work_place
    });
    console.log("work_place", work_place);
  }

  // Pass the state and functions to the context provider
  const contextValue = {
    user,
    handleLogin,
    handleLogout,
    handleUserId,
    handleUserType,
    handleUserConnection,
    handleWorkPlace,
    handleWorkPlaceChoosen
  };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

// Create a custom hook to use the context
export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};
