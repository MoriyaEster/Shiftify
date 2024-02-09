import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function EditEmployee({ field, onEdit }) {
  const [show, setShow] = useState(false);
  const [fieldValue, setFieldValue] = useState('');

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleSaveChanges = () => {
    // Call the onEdit function passed from the parent component
    onEdit(fieldValue);
    // Close the modal
    handleClose();
  };

  return (
    <div dir="rtl">
      <button onClick={handleShow}>ערוך {field}</button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ערוך {field}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            value={fieldValue}
            onChange={(e) => setFieldValue(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            סגור
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            שמור שינויים
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditEmployee;
