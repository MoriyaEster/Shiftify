import React, { useState } from 'react';
import { Header } from './Header';
import { useUser } from '/src/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import EditEmployee from './EditEmployee';
import { editField } from './api'; // Import the function to send data to the backend

export const Profile = () => {
  const [showFullNameModal, setShowFullNameModal] = useState(false);
  const [showIdModal, setShowIdModal] = useState(false);
  const [showPhoneNumberModal, setShowPhoneNumberModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false); 
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const { handleUserType, handleUserId, handleUserName, handleWorkPlaces, handlpassword, handleUserPhoneNumber, handleUserEmail } = useUser();

  const navigate = useNavigate();

  const handleEditField = (field, value) => {
    // Call the backend API to update the field
    editField(field, value)
      .then(() => {
        // Optionally, you can update the local state or perform other actions after successful update
      })
      .catch((error) => {
        // Handle error
      });
  };

  return (
    <div dir="rtl">
      <Header />
      <h1>פרופיל</h1>
      <div>
        <h2>שם מלא: {handleUserName()}</h2>
        <EditEmployee field="שם מלא" show={showFullNameModal} onClose={() => setShowFullNameModal(false)} onEdit={(value) => handleEditField('fullName', value)} />
      </div>
      <div>
        <h2>תעודת זהות: {handleUserId()}</h2>
        <EditEmployee field="תעודת זהות" show={showIdModal} onClose={() => setShowIdModal(false)} onEdit={(value) => handleEditField('id', value)} />
      </div>
      <div>
        <h2>מספר טלפון: {handleUserPhoneNumber()}</h2>
        <EditEmployee field="מספר טלפון" show={showPhoneNumberModal} onClose={() => setShowPhoneNumberModal(false)} onEdit={(value) => handleEditField('phoneNumber', value)} />
      </div>
      <div>
        <h2>אימייל: {handleUserEmail()}</h2>
        <EditEmployee field="אימייל" show={showEmailModal} onClose={() => setShowEmailModal(false)} onEdit={(value) => handleEditField('email', value)} />
      </div>
      <div>
        <h2>סיסמא: {handlpassword()}</h2>
        <EditEmployee field="סיסמא" show={showPasswordModal} onClose={() => setShowPasswordModal(false)} onEdit={(value) => handleEditField('password', value)} />
      </div>
    </div>
  );
};

export default Profile;
