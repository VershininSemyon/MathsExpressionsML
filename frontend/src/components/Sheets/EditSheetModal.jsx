
import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';


const EditSheetModal = ({ 
    show, 
    onHide, 
    title, 
    setTitle, 
    onSubmit 
}) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Редактировать лист</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Название листа</Form.Label>
                        <Form.Control
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button variant="secondary" className="me-2" onClick={onHide}>
                            Отмена
                        </Button>
                        <Button variant="primary" type="submit">
                            Сохранить
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditSheetModal;
