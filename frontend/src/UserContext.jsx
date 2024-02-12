import React, { createContext, useContext, useState } from 'react';

// Create the context
const UserContext = createContext();

// Create a provider component to wrap your app with
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    user_id: null,
    user_type: null,
    connected: false,
    work_places: [],
    work_place: null,
    user_name: null,
    phone_number: null,
    email: null

  });

  // Function to handle login
  const handleLogin = (data) => {

    console.log("userID", data.username);
    console.log("employer", data.type);
    setUser({
      user_id: data.username,
      user_type: data.type,
      connected: true,
      work_places: data.workplace,
      user_name: data.name,
      phone_number: "0"+data.phone_number,
      email: data.email
    });
  };

  // Function to handle logout
  const handleLogout = () => {
    setUser({
      user_id: null,
      user_type: null,
      connected: false,
      work_places: [],
      work_place: null,
      user_name: null,
      phone_number: null,
      email: null,
      password: null
    });
  };

  // Function to get user_id
  const handleUserId = () => user.user_id;

  const handlpassword = () => user.password;

  const handleUserType = () => user.user_type;

  const handleUserName = () => user.user_name;

  const handleUserPhoneNumber = () => user.phone_number;

  const handleUserEmail = () => user.email;

  // Function to check if the user is connected
  const handleUserConnection = () => user.connected;

  const handleWorkPlace = () => user.work_place;

  //const handleWorkPlaces = () => user.work_places;
  const handleWorkPlaces = () => {
    // const jsonData = {
    //   "workPlaces": ["Workplace 1", "Workplace 2", "Workplace 3"],
    // };
    // console.log("jsonData", jsonData);
    return user.work_places;  // Return just the array
  };

  const handleWorkPlaceChoosen = (work_place) => {
    setUser((prevUser) => ({
      ...prevUser,
      work_place: work_place
    }));
    // Log the updated state using the callback function
    setUser((updatedUser) => {
      return updatedUser; // Return the updated state
    });
  };

  const handleUserNameChoosen = (user_name) => {
    setUser((prevUser) => ({
      ...prevUser,
      user_name: user_name
    }));
    // Log the updated state using the callback function
    setUser((updatedUser) => {
      return updatedUser; // Return the updated state
    });
  };

  const handleEmailChoosen = (email) => {
    setUser((prevUser) => ({
      ...prevUser,
      email: email
    }));
    // Log the updated state using the callback function
    setUser((updatedUser) => {
      return updatedUser; // Return the updated state
    });
  };

  const handlePhoneNumberChoosen = (phone_number) => {
    setUser((prevUser) => ({
      ...prevUser,
      phone_number: phone_number
    }));
    // Log the updated state using the callback function
    setUser((updatedUser) => {
      return updatedUser; // Return the updated state
    });
  };

  const handlePassWordChoosen = (password) => {
    setUser((prevUser) => ({
      ...prevUser,
      password: password
    }));
    // Log the updated state using the callback function
    setUser((updatedUser) => {
      return updatedUser; // Return the updated state
    });
  };

  // Pass the state and functions to the context provider
  const contextValue = {
    user,
    handleLogin,
    handleLogout,
    handleUserId,
    handleUserType,
    handleUserName,
    handleUserConnection,
    handleWorkPlace,
    handleWorkPlaceChoosen,
    handleUserPhoneNumber,
    handleUserEmail,
    handleWorkPlaces,
    handlpassword,
    handleUserNameChoosen,
    handleEmailChoosen,
    handlePhoneNumberChoosen,
    handlePassWordChoosen
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
