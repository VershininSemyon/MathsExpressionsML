
import React from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';


const SheetForm = ({ 
    title, 
    setTitle, 
    errorMessage, 
    isSubmitting, 
    onSubmit, 
    onCancel, 
    submitText = 'Создать лист',
    cancelText = 'Отмена'
}) => {
    return (
        <Form onSubmit={onSubmit}>
            <Form.Group className="mb-4">
                <Form.Label>Название листа</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Введите название листа"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={isSubmitting}
                    required
                />
                <Form.Text className="text-muted">
                    Например: "Домашнее задание" или "Рабочие заметки"
                </Form.Text>
            </Form.Group>

            {errorMessage && (
                <Alert variant="danger" className="mb-4">
                    {errorMessage}
                </Alert>
            )}

            <div className="d-flex justify-content-between">
                <Button
                    variant="outline-secondary"
                    onClick={onCancel}
                    disabled={isSubmitting}
                >
                    {cancelText}
                </Button>
                <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting || !title.trim()}
                >
                    {isSubmitting ? (
                        <>
                            <Spinner animation="border" size="sm" className="me-2" />
                            {submitText.includes('...') ? submitText : `${submitText}...`}
                        </>
                    ) : (
                        submitText
                    )}
                </Button>
            </div>
        </Form>
    );
};

export default SheetForm;
