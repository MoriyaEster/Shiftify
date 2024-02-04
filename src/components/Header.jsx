import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '/src/App.css' 

export class Header extends Component {
    
    render() {
      return (
        <>
        <div className="img-container">
        <Link to="/HomePage">
            <img className="img-backbutton" src="src/photos/backbutton.jpg" alt="backbutton" />
        </Link>
        <img className="img-logo" src="src/photos/logo.png" alt="logo" />
        <Link to="/Profile">
            <img className="img-profile" src="src/photos/profile.jpg" alt="profile" />
        </Link>
        </div>
        </>
      );
    }
  }
  
  export default Header;