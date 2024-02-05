import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header } from './Header';
import { useUser } from '/src/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import EditEmployee from './EditEmployee';
import Button from 'react-bootstrap/Button';

export const Profile = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingField, setEditingField] = useState(null); // Track the field being edited

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

  const handleEditButtonClick = (field) => {
    setShowEditModal(true);
    setEditingField(field);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
    setEditingField(null);
  };

  return (
    <div>
      <Header />
      <h1>Profile Page</h1>
      {/* Loop through user fields and render edit buttons */}
      {Object.keys(user).map((field) => (
        <div key={field}>
          <h2>{field === 'fullName' ? 'Full Name' : field}</h2>
          <Button onClick={() => handleEditButtonClick(field)}>Edit</Button>
        </div>
      ))}
      {/* Render the EditEmployee modal */}
      {showEditModal && <EditEmployee field={editingField} onClose={handleEditModalClose} />}
    </div>
  );
};

export default Profile;
