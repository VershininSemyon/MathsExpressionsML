
import React, {useContext} from 'react'
import { Card, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { authService } from '../../services/authService';


const AlreadyLoggedIn = () => {
    const {initialAuthState, authState, setAuthState} = useContext(AuthContext);

    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <Row className="w-100">
                <Col md={6} lg={4} className="mx-auto">
                    <Card className="shadow text-center">
                        <Card.Body className="p-4">
                            <Alert variant="success" className="mb-4">
                                <Alert.Heading>Вы уже авторизованы</Alert.Heading>
                                <p className="mb-0">Вы вошли в аккаунт пользователя <strong>{authState.userData.username}</strong></p>
                            </Alert>

                            <p className="text-muted mb-4">Хотите выйти из аккаунта?</p>
                            
                            <div className="d-grid">
                                <Button 
                                    variant="outline-danger" 
                                    onClick={() => authService.logout(initialAuthState, setAuthState)}
                                    size="lg"
                                >
                                    Выйти из профиля
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default AlreadyLoggedIn
