
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Http404 = () => {
    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <Row className="w-100">
                <Col md={8} lg={6} xl={5} className="mx-auto">
                    <Card className="shadow text-center border-0">
                        <Card.Body className="p-5">
                            <div className="display-1 text-primary fw-bold mb-4">
                                404
                            </div>
                            
                            <h2 className="h1 mb-3">Страница не найдена</h2>
                            
                            <p className="lead text-muted mb-4">
                                К сожалению, запрашиваемая страница не существует. 
                                Возможно, она была перемещена или удалена.
                            </p>
                            
                            <p className="text-muted mb-4">
                                Проверьте правильность URL-адреса или вернитесь на главную страницу.
                            </p>

                            <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                                <Button 
                                    variant="primary" 
                                    size="lg" 
                                    as={Link} 
                                    to="/"
                                    className="me-md-3"
                                >
                                    ← Вернуться на главную
                                </Button>
                                
                                <Button 
                                    variant="outline-secondary" 
                                    size="lg"
                                    onClick={() => window.history.back()}
                                >
                                    Назад
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Http404;
