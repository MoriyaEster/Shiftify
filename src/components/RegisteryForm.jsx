import React, { Component } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


export class RegisteryForm extends Component {
    state = {
      fullName: '',
      userID: '',
      phoneNumber: '',
      email: '',
      password: '',
      status: 0
    };
  
    // Handle fields change
    handleChange = input => e => {
      this.setState({ [input]: e.target.value });
    };

    //register
    handleRegister = () => {
        console.log("לחץ הרשמה", this.state)
        //if success
        this.setState({ status: 1 });
        //if error
        // this.setState({ status: -1 });
    }
  
    render() {
      const { fullName, userID, phoneNumber, email, password, status} = this.state;
      const values = { fullName, userID, phoneNumber, email, password, status};
      
      return (<>
        <h1>הרשמה</h1>
        <p>הכנס פרטים</p>
        <TextField
          placeholder="הכנס שם מלא"
          onChange={this.handleChange('fullName')}
          defaultValue={values.fullName}
          dir="rtl"
          />
        <label>:שם מלא</label>
        <br/>
        <TextField
          placeholder="הכנס ת.ז. "
          onChange={this.handleChange('userID')}
          defaultValue={values.userID}
          dir="rtl"
          />
        <label>:.ת.ז</label>
        <br/>
        <TextField
          placeholder="הכנס טלפון"
          onChange={this.handleChange('phoneNumber')}
          defaultValue={values.phoneNumber}
          dir="rtl"
          />
        <label>:טלפון</label>
        <br/>
        <TextField
          placeholder="הכנס אימייל"
          onChange={this.handleChange('email')}
          defaultValue={values.email}
          dir="rtl"
          type="email"
          />
        <label>:אימייל</label>
        <br/>
        <TextField
          placeholder="הכנס סיסמא"
          onChange={this.handleChange('password')}
          defaultValue={values.password}
          dir="rtl"
          type="password"
          />
        <label>:סיסמא</label>
        <br/>
        {/* if employer */}
        {/* <TextField
          placeholder="הכנס מקום עבודה"
          onChange={this.handleChange('password')}
          defaultValue={values.password}
          dir="rtl"
          type="password"
          />
        <label>:מקום עבודה</label>
        <br/> */}
        <Button
              color="primary"
              variant="contained"
              onClick={() => {
                this.handleRegister();
              }}
            > הרשמה</Button>
         {status === 1 && <p>!נרשמת בהצלחה</p>}
         {status === -1 && <p>שגיאה! נסה שוב בבקשה</p>}
        </>)
        
    }
  }
  
  export default RegisteryForm;