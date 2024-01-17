import React, { Component } from 'react';
import {ThemeProvider, MuiThemeProvider} from "@material-ui/core/styles";
import Button from '@mui/material/Button';


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
          <MuiThemeProvider>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                this.buttonClickEmployee();
                this.continue();
              }}
            > עובד</Button>

            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                this.buttonClickEmployer();
                this.continue();
              }}
            > מעסיק</Button>
          </MuiThemeProvider>
        </>
      );
    }
  }
  
  export default UserType;