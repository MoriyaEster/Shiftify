import React, { useState, useEffect } from 'react';
import UserType from './UserType';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useForm, Controller } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import '/src/App.css';
import { useUser } from '/src/UserContext.jsx';
import { ModelPopUp } from './ModelPopUp';
import axios from 'axios';
import * as links from '/src/axios-handler.jsx';

export const ConnectionForm = () => {
    const [state, setState] = useState({
        step: 1,
        employee: 0,
        employer: 0,
        userID: '',
        password: ''
    });
    const { handleSubmit, control } = useForm();
    const [showModal, setShowModal] = useState(false);
    const [status, setStatus] = useState(null);
    const [contentPOPUP, setContentPOPUP] = useState(null);

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
        }), () => {
            // Log the updated state after the state is set
            const { step, ...stateWithoutStep } = state;
            const jsonState = JSON.stringify(stateWithoutStep);
            console.log("Form data in JSON format:", jsonState);
        });
    };

    useEffect(() => {
        console.log("ContentPOPUP:", contentPOPUP);
        console.log("Status:", status);
        console.log("ShowModal:", showModal);
    }, [contentPOPUP, status, showModal]);

    const handleConnection = async (data) => {
        //axios 
        const newData = {
            type: state.employer,
            ...data
        };

        const response = await axios.post(links.url_login, newData)
        console.log("response:", response);

        // Use the callback function of setState to get the latest state
        const jsonState = JSON.stringify(newData);
        console.log("state.employer:", state.employer);
        console.log("Form data in JSON format:", jsonState);
        try {
            //check the status
            setStatus(200);
            setContentPOPUP("התחברת בהצלחה");
            setShowModal(true);

            await handleLogin(jsonState);
            console.log("Form data in JSON format:", jsonState);
        } catch (error) {
            console.error("Registration failed:", error);
            setStatus(-1);
            setContentPOPUP("שגיאה! נסה שוב בבקשה");
            setShowModal(true);
        }
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
                    <form onSubmit={handleSubmit(handleConnection)}>
                        <div className="form-col">
                            <br />
                            <Controller
                                name="userID"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'שדה חובה',
                                    pattern: {
                                        value: /^[0-9]+$/,
                                        message: 'יש להזין רק מספרים'
                                    }
                                }}
                                render={({ field, fieldState }) => (
                                    <div className="form-field">
                                        <TextField
                                            placeholder="הכנס ת.ז. "
                                            {...field}
                                            error={!!fieldState.error}
                                            helperText={fieldState.error?.message}
                                            dir="rtl"
                                        />
                                        <label className="label">:.ת.ז</label>
                                    </div>
                                )}
                            />
                            <br />
                            <Controller
                                name="password"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'שדה חובה',
                                    minLength: {
                                        value: 5,
                                        message: 'סיסמה צריכה להיות לפחות 5 תווים'
                                    }
                                }}
                                render={({ field, fieldState }) => (
                                    <div className="form-field">
                                        <TextField
                                            placeholder="הכנס סיסמא"
                                            {...field}
                                            error={!!fieldState.error}
                                            helperText={fieldState.error?.message}
                                            dir="rtl"
                                            type="password"
                                        />
                                        <label className="label">:סיסמא</label>
                                    </div>
                                )}
                            />
                            <br />
                        </div>
                        <NavLink to={{
                            pathname: `/Registery/${state.employer}`
                        }}>הרשמה</NavLink>
                        <Button
                            color="primary"
                            variant="contained"
                            type="submit"
                        > התחברות</Button>
                        <br />
                    </form>
                    <ModelPopUp show={showModal} onClose={() => setShowModal(false)} status={status} content={contentPOPUP} />
                </>
            );
        default:
            break;
    }
};

export default ConnectionForm;