import React, { Component } from 'react';
import Button from '@mui/material/Button';
import '/src/App.css'

export class UserType extends Component {
    continue = e => {
      this.props.nextStep();
    };

    buttonClickEmployee = e => {
      this.props.userIsEmployee();
    }

    buttonClickEmployer = e => {
      this.props.userIsEmployer();
  }
  
    render() {
      return (
        <>
        <div className="form-col">
        <div className="form-field">
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                this.buttonClickEmployee();
                this.continue();
              }}
            > עובד</Button>
            </div>
            <br/>
            <div className="form-field">
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                this.buttonClickEmployer();
                this.continue();
              }}
            > מעסיק</Button>
            </div>
            </div>
        </>
      );
    }
  }
  
  export default UserType;