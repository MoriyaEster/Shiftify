import React, { useEffect } from 'react';
import { useUser } from '/src/UserContext.jsx';
import { useNavigate } from 'react-router-dom';

export const UserConnectionChecker = () => {
    const { handleUserConnection } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        const savedUser = sessionStorage.getItem('user');
        console.log("savedUser",savedUser);
        if (savedUser == null) {
        if (handleUserConnection() === false) {
            // Redirect to /Registery
            navigate('/');
        }}
    }, [handleUserConnection, navigate]);

    return null;
};

export default UserConnectionChecker;
