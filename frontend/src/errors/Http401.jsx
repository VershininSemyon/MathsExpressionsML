
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const Http401 = () => {
    const navigate = useNavigate();

    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <Row className="w-100">
                <Col md={6} lg={4} className="mx-auto">
                    <Card className="shadow text-center">
                        <Card.Body className="p-5">
                            <div className="display-1 text-muted mb-4">401</div>
                            <h1 className="h2 mb-3">Неавторизованный доступ</h1>
                            <p className="h6 text-muted mb-4">
                                Для доступа к этой странице необходимо войти в систему.
                            </p>
                            <div className="d-flex flex-column gap-3 mt-4">
                                <Button 
                                    variant="primary" 
                                    size="lg"
                                    onClick={() => navigate('/login')}
                                >
                                    Войти в аккаунт
                                </Button>
                                <Button 
                                    variant="outline-primary" 
                                    onClick={() => navigate('/register')}
                                >
                                    Зарегистрироваться
                                </Button>
                                <Button 
                                    variant="link" 
                                    onClick={() => navigate('/')}
                                >
                                    Вернуться на главную
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Http401;
