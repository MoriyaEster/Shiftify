import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { useUser } from '/src/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import EditEmployee from './EditEmployee';

export const Profile = () => {
  const [showFullNameModal, setShowFullNameModal] = useState(false);
  const [showIdModal, setShowIdModal] = useState(false);
  const [showPhoneNumberModal, setShowPhoneNumberModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false); // Add state for email modal
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // Fields left blank by default
  const user = {
    fullName: '',
    id: '',
    phoneNumber: '',
    email: '',
    password: '',
  };

  const navigate = useNavigate();
  const { handleUserConnection } = useUser();

  useEffect(() => {
    if (handleUserConnection() === false) {
      // Redirect to /Registery
      navigate('/');
    }
  }, [navigate]);

  return (
    <div>
      <Header />
      <h1>Profile Page</h1>
      <div>
        <h2>Full Name: {user.fullName}</h2>
        <EditEmployee field="Full Name" show={showFullNameModal} onClose={() => setShowFullNameModal(false)} />
      </div>
      <div>
        <h2>ID: {user.id}</h2>
        <EditEmployee field="ID" show={showIdModal} onClose={() => setShowIdModal(false)} />
      </div>
      <div>
        <h2>Phone Number: {user.phoneNumber}</h2>
        <EditEmployee field="Phone Number" show={showPhoneNumberModal} onClose={() => setShowPhoneNumberModal(false)} />
      </div>
      <div>
        <h2>Email: {user.email}</h2>
        <EditEmployee field="Email" show={showEmailModal} onClose={() => setShowEmailModal(false)} />
      </div>
      <div>
        <h2>Password: {user.password}</h2>
        <EditEmployee field="Password" show={showPasswordModal} onClose={() => setShowPasswordModal(false)} />
      </div>
    </div>
  );
};

export default Profile;
