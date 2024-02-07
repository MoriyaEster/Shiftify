import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function EditEmployee({ field }) {
  const [show, setShow] = useState(false);
  const [fieldValue, setFieldValue] = useState('');

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleEdit = () => {
    // Handle edit logic here
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
          <Button variant="primary" onClick={handleEdit}>
            שמור שינויים
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditEmployee;
