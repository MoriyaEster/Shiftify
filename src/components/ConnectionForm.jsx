import React, { Component } from 'react';
import UserType from './UserType';

export class ConnectionForm extends Component {
  state = {
    step: 1,
    employee: 0,
    employer: 0,
    userID: '',
    password: ''
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
          <h2>{employee}{employer}</h2>
          <h1> hiii </h1>
          </>
        );
      default:
        (console.log('This is a multi-step form built with React.'))
    }
  }
}

export default ConnectionForm;