import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useUser } from '/src/UserContext.jsx';
import '/src/App.css';

export class Header extends Component {



  logout = () => {
    const { handleLogout } = useUser();
    handleLogout();
  }


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
          <Link to="/">
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                this.logout();
              }}
            > התנתקות</Button>
          </Link>
        </div>
      </>
    );
  }
}

export default Header;
