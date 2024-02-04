import { useState, useEffect } from 'react';

export const properties = () => {
    const [state, setState] = useState({
        userType: 0,
        userID: 0,
        userConnection: 0
    });

    useEffect(() => {
        // Now you can log the updated state
        console.log("login user =", state);
        console.log("login con =", state.userConnection);
    }, [state]); // useEffect will run whenever state changes

    const handleLogin = (jsonData) => {
        console.log("json ", jsonData);
        const parsedData = JSON.parse(jsonData);
        console.log("employer ", parsedData.employer);
        console.log("userid ", parsedData.userID);
        setState((prevState) => ({ ...prevState, userID: parsedData.userID, userType: parsedData.employer, userConnection: 1}));
        console.log("state ", state);
    };


    const handleLogout = () => {
        setState({
            userType: "",
            userID: "",
            userConnection: 0
        });
    };

    const handleUserId = () => {
        return state.userID;
    };

    const handleUserConnection = () => {
        return state.userConnection;
    };

    return {
        state,
        handleLogin,
        handleLogout,
        handleUserId,
        handleUserConnection,
    };
};

export default properties;