// ProfilePage.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Profile = () => {
  // Fields left blank by default
  const user = {
    fullName: '',
    id: '',
    phoneNumber: '',
    email: '',
    password: '',
  };

  // Use state to track user type
  const [userType, setUserType] = useState('employer');

  // Content for employee
  const employeeContent = (
    <>
      <div>
        <h2>Workplaces</h2>
        {/* Placeholder content, can be replaced with actual data */}
        <Link to="/workplaces">Edit Workplaces</Link>
      </div>
    </>
  );

  // Content for employer
  const employerContent = (
    <>
      <div>
        <h2>Employees List</h2>
        {/* Placeholder content, can be replaced with actual data */}
        <Link to="/employeesList">View Employees List</Link>
      </div>
    </>
  );

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

      {/* Conditional rendering based on user type */}
      {userType === 'employee' && employeeContent}
      {userType === 'employer' && employerContent}
    </div>
  );
};

export default Profile;
