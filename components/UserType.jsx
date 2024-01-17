import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export class UserType extends Component {
    continue = e => {
      e.preventDefault();
      this.props.nextStep();
    };

    handleButtonClick = (user_type) => {
        //action 1
        const { values, handleChange } = this.props;
        if (user_type == "employee") {
            handleChange('employee');
            
        }
        else {handleChange('employer');}
        
        
    }
  
    render() {
      const { values, handleChange } = this.props;
      return (
        <MuiThemeProvider>
          <>
              <Button
                color="primary"
                variant="contained"
                onClick={this.continue}
              > עובד</Button>
          </>
        </MuiThemeProvider>
      );
    }
  }
  
  export default FormUserDetails;