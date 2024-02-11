import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useForm, Controller } from 'react-hook-form';
import { useParams} from 'react-router-dom';
import { ModelPopUp } from './ModelPopUp';
import { useUser} from '/src/UserContext.jsx';
import { Link } from 'react-router-dom';
import '/src/App.css';
import axios from 'axios';
import * as links from '/src/axios-handler.jsx';

export const RegisteryForm = () => {
  const { handleSubmit, control } = useForm();
  const { handleLogin } = useUser();
  const { employer } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(null);
  const [contentPOPUP, setContentPOPUP] = useState(null);

  const handleRegister = async (data) => {
    let employeeValue;
  
    const newData = {
      user_type: employer,
      ...data
    };

    
    console.log("newData:", newData);
    console.log("jsonData:", jsonData);
    console.log(links.url_register)
    const response = await axios.post(links.url_register, newData)
    console.log("response:", response);
    try {
      //check the status
      setStatus(200);
      setContentPOPUP("נרשמת בהצלחה");
      setShowModal(true);
      
      await handleLogin(jsonData);
    } catch (error) {
      console.error("Registration failed:", error);
      setStatus(-1);
      setContentPOPUP("שגיאה! נסה שוב בבקשה");
      setShowModal(true);
    }
  }

  useEffect(() => {
    console.log("ContentPOPUP:", contentPOPUP);
    console.log("Status:", status);
    console.log("ShowModal:", showModal);
  }, [contentPOPUP, status, showModal]);

  let content;

  switch (employer) {
    case '0':
      break;
    case '1':
      content = (
        <Controller
          name="workplace"
          control={control}
          defaultValue=""
          rules={{ required: 'שדה חובה' }}
          render={({ field, fieldState }) => (
            <>
              <div className="form-field">
                <TextField
                  placeholder="הכנס מקום עבודה"
                  {...field}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  dir="rtl"
                />
                <label className="label">:מקום עבודה</label>
              </div>
              <br />
            </>
          )}
        />
      );
      break;
    default:
      break;
  }

  return (
    <>
      <div dir="rtl">
        <Link to="/">
          <img className="img-backbutton" src="/src/photos/backbutton.jpg" alt="backbutton" />
        </Link>
        <img className="img-logo" src="/src/photos/logo.png" alt="logo" />
      </div>   
      <h1>הרשמה</h1>
      <p>הכנס פרטים</p>
      <form onSubmit={handleSubmit(handleRegister)}>
      <div className="form-col">
        <Controller
          name="fullName"
          control={control}
          defaultValue=""
          rules={{ required: 'שדה חובה' }}
          render={({ field, fieldState }) => (
            <>
            <div className="form-field">
              <TextField
                placeholder="הכנס שם מלא"
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                dir="rtl"
                />
                <label className="label">:שם מלא</label>
              </div>
              <br />
            </>
          )}
        />
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
            <>
            <div className="form-field">
              <TextField
                placeholder="הכנס ת.ז."
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                dir="rtl"
                />
                <label className="label">:.ת.ז</label>
              </div>
              <br />
            </>
          )}
        />
        <Controller
          name="phoneNumber"
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
            <>
            <div className="form-field">
              <TextField
                placeholder="הכנס טלפון"
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                dir="rtl"
                />
                <label className="label">:טלפון</label>
              </div>
              <br />
            </>
          )}
        />

        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{
            required: 'שדה חובה',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'כתובת אימייל לא תקינה'
            }
          }}
          render={({ field, fieldState }) => (
            <>
            <div className="form-field">
              <TextField
                placeholder="הכנס אימייל"
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                dir="rtl"
                />
                <label className="label">:אימייל</label>
              </div>
              <br />
            </>
          )}
        />

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
            <>
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
              <br />
            </>
          )}
        />
        {/* if employer need to have workplace */}
        {content}
        <Button
          color="primary"
          variant="contained"
          type="submit"
        >
          הרשמה
        </Button>
        </div>
        <ModelPopUp show={showModal} onClose={() => setShowModal(false)} status={status} content={contentPOPUP}/>
      </form>
    </>
  );
};

export default RegisteryForm;
