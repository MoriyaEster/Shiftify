import React, { useEffect } from 'react';
import { useUser } from '/src/UserContext.jsx';
import { useNavigate } from 'react-router-dom';

export const UserConnectionChecker = () => {
    const { handleUserConnection } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (handleUserConnection() === false) {
            // Redirect to /Registery
            navigate('/');
        }
    }, [handleUserConnection, navigate]);

    // You can render something here if needed, or just return null
    return null;
};

export default UserConnectionChecker;
