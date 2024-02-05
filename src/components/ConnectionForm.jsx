import React, { useState } from 'react';
import UserType from './UserType';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { NavLink, useNavigate } from 'react-router-dom';
// import { properties } from '/src/properties.jsx';
import '/src/App.css';
import { useUser } from '/src/UserContext.jsx';

export const ConnectionForm = () => {
    const [state, setState] = useState({
        step: 1,
        employee: 0,
        employer: 0,
        userID: '',
        password: '',
        workPlace: ''
    });

    const navigate = useNavigate();
    const { handleLogin } = useUser();  // Using the hook from properties.jsx

    const userIsEmployee = () => {
        setState(prevState => ({
            ...prevState,
            employee: 1
        }));
    };

    const userIsEmployer = () => {
        setState(prevState => ({
            ...prevState,
            employer: 1
        }));
    };

    const nextStep = () => {
        setState(prevState => ({
            ...prevState,
            step: prevState.step + 1
        }));
    };

    const handleChange = input => e => {
        setState(prevState => ({
            ...prevState,
            [input]: e.target.value
        }));
    };

    const handleConnection = () => {
        const { step, ...stateWithoutStep } = state;
        const jsonState = JSON.stringify(stateWithoutStep);
        console.log("Form data in JSON format:", jsonState);
        handleLogin(jsonState);
        navigate('/HomePage');
    };

    const values = { userID: state.userID, password: state.password };

    switch (state.step) {
        case 1:
            return (
                <UserType
                    nextStep={nextStep}
                    handleChange={handleChange}
                    userIsEmployee={userIsEmployee}
                    userIsEmployer={userIsEmployer}
                    values={values}
                />
            );
        case 2:
            return (
                <>
                    <h1>התחברות</h1>
                    <p>הכנס פרטים</p>
                    <div className="form-col">
                        <br />
                        <div className="form-field">
                            <TextField
                                placeholder="הכנס ת.ז. "
                                onChange={handleChange('userID')}
                                defaultValue={values.userID}
                                dir="rtl"
                            />
                            <label className="label">:.ת.ז</label>
                        </div>
                        <br />
                        <div className="form-field">
                            <TextField
                                placeholder="הכנס סיסמא"
                                onChange={handleChange('password')}
                                defaultValue={values.password}
                                dir="rtl"
                                type="password"
                            />
                            <label className="label">:סיסמא</label>
                        </div>
                        <br />
                    </div>
                    <NavLink to={{
                        pathname: `/Registery/${state.employer}`
                    }}>הרשמה</NavLink>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={handleConnection}
                    > התחברות</Button>
                    <br />
                </>
            );
        default:
            (console.log('This is a multi-step form built with React.'));
    }
};

export default ConnectionForm;