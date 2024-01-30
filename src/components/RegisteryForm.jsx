import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useForm, Controller } from 'react-hook-form';

export const RegisteryForm = () => {
  const { handleSubmit, control, reset, watch } = useForm();

  const handleRegister = (data) => {
    console.log("לחץ הרשמה", data);
    // Perform your registration logic here
    // If success, update the status
    // reset({ status: 1 });
    // If error
    // reset({ status: -1 });
  }

  return (
    <>
      <h1>הרשמה</h1>
      <p>הכנס פרטים</p>
      <form onSubmit={handleSubmit(handleRegister)}>
        <Controller
          name="fullName"
          control={control}
          defaultValue=""
          rules={{ required: 'שדה חובה' }}
          render={({ field, fieldState }) => (
            <>
              <TextField
                placeholder="הכנס שם מלא"
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                dir="rtl"
              />
              <label>:שם מלא</label>
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
              <TextField
                placeholder="הכנס ת.ז."
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                dir="rtl"
              />
              <label>:.ת.ז</label>
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
              <TextField
                placeholder="הכנס טלפון"
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                dir="rtl"
              />
              <label>:טלפון</label>
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
              <TextField
                placeholder="הכנס אימייל"
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                dir="rtl"
              />
              <label>:אימייל</label>
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
              <TextField
                placeholder="הכנס סיסמא"
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                dir="rtl"
                type="password"
              />
              <label>:סיסמא</label>
              <br />
            </>
          )}
        />

        <Button
          color="primary"
          variant="contained"
          type="submit"
        >
          הרשמה
        </Button>

        {/* {watch('status') === 1 && <p>!נרשמת בהצלחה</p>}
        {watch('status') === -1 && <p>שגיאה! נסה שוב בבקשה</p>} */}
      </form>
    </>
  );
};

export default RegisteryForm;
