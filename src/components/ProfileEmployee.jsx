// ProfilePage.js

import React from 'react';
import { Link } from 'react-router-dom';

export const ProfileEmployee = () => {
  // Fields left blank by default
  const user = {
    fullName: '',
    id: '',
    phoneNumber: '',
    email: '',
    password: '',
  };

  return (
    <div>
      <h1>Profile Page</h1>
      <div>
        <h2>Full Name: {user.fullName}</h2>
        <Link to="/edit/fullName">Edit</Link>
      </div>
      <div>
        <h2>ID: {user.id}</h2>
        <Link to="/edit/id">Edit</Link>
      </div>
      <div>
        <h2>Phone Number: {user.phoneNumber}</h2>
        <Link to="/edit/phoneNumber">Edit</Link>
      </div>
      <div>
        <h2>Email: {user.email}</h2>
        <Link to="/edit/email">Edit</Link>
      </div>
      <div>
        <h2>Password: {user.password}</h2>
        <Link to="/edit/password">Edit</Link>
      </div>

      {/* Additional field for workplaces */}
      <div>
        <h2>Workplaces</h2>
        {/* Placeholder content, can be replaced with actual data */}
        <Link to="/workplaces">Edit Workplaces</Link>
      </div>
    </div>
  );
};

export default ProfileEmployee;
