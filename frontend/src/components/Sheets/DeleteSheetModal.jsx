
import React from 'react';
import { Modal, Button } from 'react-bootstrap';


const DeleteSheetModal = ({ 
    show, 
    onHide, 
    sheetTitle, 
    onDelete 
}) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Удаление листа</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Вы уверены, что хотите удалить лист <strong>"{sheetTitle}"</strong>?</p>
                <p className="text-danger">
                    Это действие невозможно отменить. Все выражения в этом листе также будут удалены.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Отмена
                </Button>
                <Button variant="danger" onClick={onDelete}>
                    Удалить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteSheetModal;
