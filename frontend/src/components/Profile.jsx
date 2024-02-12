import React, { useState } from 'react';
import { Header } from './Header';
import { useUser} from '/src/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import EditEmployee from './EditEmployee';
import axios from 'axios';
import * as links from '/src/axios-handler.jsx';
import UserConnectionChecker from './UserConnectionChecker';


export const Profile = () => {
  const [showFullNameModal, setShowFullNameModal] = useState(false);
  const [showIdModal, setShowIdModal] = useState(false);
  const [showPhoneNumberModal, setShowPhoneNumberModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false); 
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const { handleUserType, handleUserId, handleUserName, handleWorkPlaces, handlpassword, handleUserPhoneNumber, handleUserEmail, handleUserNameChoosen, handleEmailChoosen, handlePhoneNumberChoosen, handlePassWordChoosen } = useUser();


  const handleEditField = async (json) => {
    // Call the backend API to update the field
    const response = await axios.post(links.url_users, json)
    .then(async function(response) {
      console.log("json", json);
      // Handle successful response if needed
    })
    .catch(async function(error) {
      // Handle error
      console.log("json", json);
      // Optionally, provide user feedback or take specific actions based on the error
    });
  };


  return (
    <div dir="rtl">
      <Header />
      <UserConnectionChecker />
      <h1>פרופיל</h1>
      <div>
        <h2>שם מלא: {handleUserName()}</h2>
        <EditEmployee field="שם מלא" show={showFullNameModal} onClose={() => setShowFullNameModal(false)} onEdit={(value) => {handleEditField({'user_id':handleUserId(), 'user_name': value}); handleUserNameChoosen(value);}} />
      </div>
      <div>
        <h2>מספר טלפון: {handleUserPhoneNumber()}</h2>
        <EditEmployee field="מספר טלפון" show={showPhoneNumberModal} onClose={() => setShowPhoneNumberModal(false)} onEdit={(value) => {handleEditField({'user_id':handleUserId(), 'phone_number': value}); handlePhoneNumberChoosen(value)} }/>
      </div>
      <div>
        <h2>אימייל: {handleUserEmail()}</h2>
        <EditEmployee field="אימייל" show={showEmailModal} onClose={() => setShowEmailModal(false)} onEdit={(value) => {handleEditField({'user_id':handleUserId(), 'email': value}); handleEmailChoosen(value)}} />
      </div>
      <div>
        <h2>סיסמא: ##########</h2>
        <EditEmployee field="סיסמא" show={showPasswordModal} onClose={() => setShowPasswordModal(false)} onEdit={(value) => {handleEditField({'user_id':handleUserId(), 'password': value}); handlePassWordChoosen(value)}} />
      </div>
    </div>
  );
};

export default Profile;
