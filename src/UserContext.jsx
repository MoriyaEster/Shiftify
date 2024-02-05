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
    });
  };

  // Function to get user_id
  const handleUserId = () => user.user_id;

  const handleUserType = () => user.user_type;

  // Function to check if the user is connected
  const handleUserConnection = () => user.connected;

  // Pass the state and functions to the context provider
  const contextValue = {
    user,
    handleLogin,
    handleLogout,
    handleUserId,
    handleUserType,
    handleUserConnection,
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
