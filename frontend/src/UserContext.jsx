import React, { createContext, useContext, useState, useEffect  } from 'react';

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

   // Load user information from sessionStorage on component mount
   useEffect(() => {
    const savedUser = sessionStorage.getItem('user');
    console.log("get User: ",savedUser);
    if (savedUser != null) {
      setUser(JSON.parse(savedUser));
      console.log("user: ",user);
    }
  }, []);

  //save user if it changed
  useEffect(() => {
    if (user.user_id != null) {
    sessionStorage.setItem('user', JSON.stringify(user));
    console.log("put user: ",sessionStorage.getItem('user'));
    }
  }, [user]);

  // Function to handle logout
  const handleLogout = () => {
    sessionStorage.removeItem('user');
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
  const handleUserId = () => {
    if (user.user_id == null) {
      const savedUser = sessionStorage.getItem('user');
      if(savedUser != null)
      return savedUser.user_id;
    }
    return user.user_id;}

  const handlpassword = () => {
    if (user.password == null) {
      const savedUser = sessionStorage.getItem('user');
      if(savedUser != null)
      return savedUser.password;
    }
    return user.password;};

  const handleUserType = () => {
    if (user.user_type == null) {
      const savedUser = sessionStorage.getItem('user');
      if(savedUser != null)
      return savedUser.user_type;
    }
    return user.user_type;};

  const handleUserName = () => {
    if (user.user_name == null) {
      const savedUser = sessionStorage.getItem('user');
      if(savedUser != null)
      return savedUser.user_name;
    }
    return user.user_name;};

  const handleUserPhoneNumber = () => {
    if (user.phone_number == null) {
      const savedUser = sessionStorage.getItem('user');
      if(savedUser != null)
      return savedUser.phone_number;
    }
    return user.phone_number;};

  const handleUserEmail = () => {
    if (user.email == null) {
      const savedUser = sessionStorage.getItem('user');
      if(savedUser != null)
      return savedUser.email;
    }
    return user.email;};

  // Function to check if the user is connected
  const handleUserConnection = () => {
    if (user.connected == null) {
      const savedUser = sessionStorage.getItem('user');
      if(savedUser != null)
      return savedUser.connected;
    }
    return user.connected;};

  const handleWorkPlace = () => {
    if (user.work_place == null) {
      const savedUser = sessionStorage.getItem('user');
      if(savedUser != null)
      return savedUser.work_place;
    }
    return user.work_place;};

  //const handleWorkPlaces = () => user.work_places;
  const handleWorkPlaces = () => {
    if (user.work_places == null) {
      const savedUser = sessionStorage.getItem('user');
      if(savedUser != null)
      return savedUser.work_places;
    }
    return user.work_places;};

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
