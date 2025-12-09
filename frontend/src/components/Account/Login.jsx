
import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { useErrorMessage } from '../../hooks/useErrorMessage';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import AlreadyLoggedIn from './AlreadyLoggedIn';
import { Form, Button, Card, Alert, Container, Row, Col } from 'react-bootstrap';
import { login } from '../../services/auth';


const Login = () => {
    const initialFormData = {
        username: "",
        password: ""
    }
    const [formData, setFormData] = useState(initialFormData);
    const {errorMessage, handleError} = useErrorMessage();

    const navigate = useNavigate();
    const {authState, setAuthState} = useContext(AuthContext);

    if (authState?.isAuthenticated){
        return <AlreadyLoggedIn />
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        login(authState, setAuthState, formData).then(() => {
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
                                <h3>Вход в аккаунт</h3>
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

                                <Form.Group className="mb-4">
                                    <Form.Label htmlFor="password">Пароль</Form.Label>
                                    <Form.Control
                                        id="password"
                                        type="password"
                                        placeholder="Введите ваш пароль"
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

                                <div className="d-grid gap-2 mb-4">
                                    <Button variant="primary" type="submit" size="lg">
                                        Войти
                                    </Button>
                                </div>

                                <div className="text-center">
                                    <p className="mb-2">Нет аккаунта?</p>
                                    <Button variant="outline-primary" as="a" href="/register">
                                        Зарегистрироваться
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Login
