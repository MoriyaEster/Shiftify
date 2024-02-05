import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from '@mui/material/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

export function ModelRegistery({ show, onClose, status, content }) {
    const navigate = useNavigate();

    const handleClose = () => {
        // Close the modal
        onClose();

        // Navigate to "/HomePage"
        navigate('/HomePage');
    };

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title dir="rtl">ססטוס</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div dir="rtl">
                        {content}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={handleClose}
                    >
                        סגירה
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModelRegistery;
