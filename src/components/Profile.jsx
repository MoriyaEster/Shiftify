import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { useUser } from '/src/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import EditEmployee from './EditEmployee';
import UserConnectionChecker from './UserConnectionChecker';

export const Profile = () => {
  const [showFullNameModal, setShowFullNameModal] = useState(false);
  const [showIdModal, setShowIdModal] = useState(false);
  const [showPhoneNumberModal, setShowPhoneNumberModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false); // Add state for email modal
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const { handleUserType, handleUserId,  handleUserName, handleWorkPlaces,handlpassword,handleUserPhoneNumber,
    handleUserEmail} = useUser();

  // Fields left blank by default
  const user = {
    fullName: handleUserName(),
    id: handleUserId(),
    phoneNumber: handleUserPhoneNumber(),
    email: handleUserEmail(),
    password: handlpassword(),
  };

  
  return (
    <div dir="rtl">
    <UserConnectionChecker />
      <Header />
      <h1>פרופיל</h1>
      <div>
        <h2>שם מלא: {user.fullName}</h2>
        <EditEmployee field="שם מלא" show={showFullNameModal} onClose={() => setShowFullNameModal(false)} />
      </div>
      <div>
        <h2>תעודת זהות: {user.id}</h2>
        <EditEmployee field="תעודת זהות" show={showIdModal} onClose={() => setShowIdModal(false)} />
      </div>
      <div>
        <h2>מספר טלפון: {user.phoneNumber}</h2>
        <EditEmployee field="מספר טלפון" show={showPhoneNumberModal} onClose={() => setShowPhoneNumberModal(false)} />
      </div>
      <div>
        <h2>אימייל: {user.email}</h2>
        <EditEmployee field="אימייל" show={showEmailModal} onClose={() => setShowEmailModal(false)} />
      </div>
      <div>
        <h2>סיסמא: {user.password}</h2>
        <EditEmployee field="סיסמא" show={showPasswordModal} onClose={() => setShowPasswordModal(false)} />
      </div>
    </div>
  );
};

export default Profile;
