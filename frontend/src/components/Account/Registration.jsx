
import React, {useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { useErrorMessage } from '../../hooks/useErrorMessage';
import { Form, Button, Card, Alert, Container, Row, Col } from 'react-bootstrap';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { authService } from '../../services/authService';


const Registration = () => {
    const initialFormData = {
        username: "",
        email: "",
        password: ""
    }
    const [formData, setFormData] = useState(initialFormData);
    const {errorMessage, handleError} = useErrorMessage();
    const {initialAuthState, authState, setAuthState} = useContext(AuthContext);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        authService.register(initialAuthState, authState, setAuthState, formData).then(() => {
                navigate('/');
            })
            .catch((err) => {
                handleError(err);
            });
    }


    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <Row className="w-100">
                <Col md={6} lg={4} className="mx-auto">
                    <Card className="shadow">
                        <Card.Body className="p-4">
                            <Card.Title className="text-center mb-4">
                                <h3>Создание аккаунта</h3>
                            </Card.Title>
                            
                            <Form method="POST" onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="username">Никнейм</Form.Label>
                                    <Form.Control
                                        id="username"
                                        type="text"
                                        placeholder="Введите ваш никнейм"
                                        value={formData.username}
                                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="email">Почта</Form.Label>
                                    <Form.Control
                                        id="email"
                                        type="email"
                                        placeholder="Введите вашу почту"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label htmlFor="password">Пароль</Form.Label>
                                    <Form.Control
                                        id="password"
                                        type="password"
                                        placeholder="Введите пароль"
                                        value={formData.password}
                                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                                        required
                                    />
                                </Form.Group>

                                {errorMessage && (
                                    <Alert variant="danger" className="mb-3">
                                        Ошибка: {errorMessage}
                                    </Alert>
                                )}

                                <div className="d-grid gap-2 mb-3">
                                    <Button variant="primary" type="submit" size="lg">
                                        Создать аккаунт
                                    </Button>
                                </div>
                                <div className="text-center">
                                    <p className="mb-2">Уже есть аккаунт?</p>
                                    <Button variant="outline-secondary" as="a" href="/login">
                                        Войти
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Registration
