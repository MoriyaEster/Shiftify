import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useForm, Controller } from 'react-hook-form';
import '/src/App.css'
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export const RegisteryForm = () => {
  const { handleSubmit, control, reset, watch } = useForm();
  const { employer } = useParams();
  console.log(`employer ${employer}`);

  const handleRegister = (data) => {
    console.log("לחץ הרשמה", data);
    const jsonData = JSON.stringify(data);
    console.log("Form data in JSON format:", jsonData);
    // Perform your registration logic here
    // If success, update the status
    // reset({ status: 1 });
    // If error
    // reset({ status: -1 });
  }

  // if employer need to have workplace
  let content;
  console.log("befor switch",employer)
  switch (employer) {
    case '0':
      break;
    case '1':
      content = <Controller
      name="fullName"
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
    />;
      break;
    default:
      break;
  }

  return (
    <>
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
        {/* {watch('status') === 1 && <p>!נרשמת בהצלחה</p>}
        {watch('status') === -1 && <p>שגיאה! נסה שוב בבקשה</p>} */}
    </form>
    </>
  );
};

export default RegisteryForm;
