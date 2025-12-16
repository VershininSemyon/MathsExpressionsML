
import React, { useState } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSheets } from '../hooks/useSheets';
import { useErrorMessage } from '../hooks/useErrorMessage';
import SheetForm from '../components/Sheets/SheetForm';


const CreateSheetPage = () => {
    const [title, setTitle] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {errorMessage, handleError} = useErrorMessage();
    
    const navigate = useNavigate();
    const { createSheet } = useSheets();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!title.trim()) {
            handleError("Название не может быть пустым!")
            return;
        }

        setIsSubmitting(true);

        try {
            const newSheet = await createSheet({ title });
            navigate(`/sheets/${newSheet.id}`);
        } 
        catch (err) {
            handleError(err);
        } 
        finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        navigate('/sheets');
    };

    return (
        <Container className="py-4">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="shadow">
                        <Card.Body className="p-4">
                            <Card.Title className="text-center mb-4">
                                <h3>Создание нового листа</h3>
                            </Card.Title>
                            
                            <SheetForm
                                title={title}
                                setTitle={setTitle}
                                errorMessage={errorMessage}
                                isSubmitting={isSubmitting}
                                onSubmit={handleSubmit}
                                onCancel={handleCancel}
                                submitText="Создать лист"
                                cancelText="Отмена"
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CreateSheetPage;
