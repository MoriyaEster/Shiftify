import React, { Component } from 'react';
import UserType from './UserType';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { NavLink } from 'react-router-dom';
import '/src/App.css'

export class ConnectionForm extends Component {
  state = {
    step: 1,
    employee: 0,
    employer: 0,
    userID: '',
    password: '',
    workPlace: ''
    };

  //choose employee or employer
  userIsEmployee = () => {
    const { employee } = this.state;
    this.setState({
      employee: 1
    });
  }

  userIsEmployer = () => {
    const { employer } = this.state;
    this.setState({
      employer: 1
    });
  }

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  // Handle fields change
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  handleConnection = () => {
    // Exclude 'step' property from the state
    const { step, ...stateWithoutStep } = this.state;
    // Convert the modified state object to a JSON string
    const jsonState = JSON.stringify(stateWithoutStep);
    console.log("Form data in JSON format:", jsonState);
}

handlepassword = () => {
 }
  render() {
    const { step } = this.state;
    const { employee, employer } = this.state;
    const { userID, password} = this.state;
    const values = { userID, password};

    switch (step) {
      case 1:
        return (
          <UserType
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            userIsEmployee={this.userIsEmployee}
            userIsEmployer={this.userIsEmployer}
            values={values}
          />
        );
      case 2:
        return (
          <>
          <h1>התחברות</h1>
        <p>הכנס פרטים</p>
        <div className="form-col">
        <br/>
        <div className="form-field">
        <TextField
          placeholder="הכנס ת.ז. "
          onChange={this.handleChange('userID')}
          defaultValue={values.userID}
          dir="rtl"
          />
        <label className="label">:.ת.ז</label>
        </div>
        <br/>
        <div className="form-field">
        <TextField
          placeholder="הכנס סיסמא"
          onChange={this.handleChange('password')}
          defaultValue={values.password}
          dir="rtl"
          type="password"
          />
        <label className="label">:סיסמא</label>
        </div>
        <br/>
        </div>
      <NavLink to="/Registery">הרשמה</NavLink>
        <Button
              color="primary"
              variant="contained"
              onClick={() => {
                this.handleConnection();
              }}
            > התחברות</Button>
          <br/>
          {/* <Button
              color="primary"
              variant="contained"
              onClick={() => {
                this.handlepassword();
              }}
            > שכחתי סיסמא</Button> */}
            </>
        );
      default:
        (console.log('This is a multi-step form built with React.'))
    }
  }
}

export default ConnectionForm;