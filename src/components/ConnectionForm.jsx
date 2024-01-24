import React, { Component } from 'react';
import UserType from './UserType';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

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
    console.log("התחבר", this.state.userID, this.state.password);
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
        console.log({employee},{employer});
        return (
          <>
          <h1>התחברות</h1>
        <p>הכנס פרטים</p>
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
          placeholder="הכנס סיסמא"
          onChange={this.handleChange('password')}
          defaultValue={values.password}
          dir="rtl"
          type="password"
          />
        <label>:סיסמא</label>
        <br/>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            navigate('/Registery');
          }}
        > הרשמה</Button>
        <Button
              color="primary"
              variant="contained"
              onClick={() => {
                this.handleConnection();
              }}
            > התחברות</Button>
          <br/>
          <Button
              color="primary"
              variant="contained"
              onClick={() => {
                this.handlepassword();
              }}
            > שכחתי סיסמא</Button>
        </>
        );
      default:
        (console.log('This is a multi-step form built with React.'))
    }
  }
}

export default ConnectionForm;