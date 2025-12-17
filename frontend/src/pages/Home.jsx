
import React, { useContext } from 'react';
import { 
    Container, 
    Row, 
    Col, 
    Card, 
    Button, 
    Badge, 
    ListGroup
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext/AuthContext';


const Home = () => {
    const { authState } = useContext(AuthContext);

    return (
        <Container className="py-5">
            <Card className="bg-light border-0 p-5 rounded-3 mb-5 shadow-sm">
                <Row className="align-items-center">
                    <Col lg={8}>
                        <h1 className="display-4 fw-bold mb-4">
                            Математический распознаватель выражений
                        </h1>
                        <p className="lead mb-4">
                            Интерактивное приложение для распознавания рукописных математических выражений. 
                            Рисуйте, распознавайте и вычисляйте результаты в реальном времени.
                        </p>
                        {authState.isAuthenticated ? (
                            <div className="d-flex gap-3">
                                <Button 
                                    as={Link} 
                                    to="/sheets" 
                                    variant="primary" 
                                    size="lg"
                                    className="px-4"
                                >
                                    Мои листы
                                </Button>
                                <Button 
                                    as={Link} 
                                    to="/sheets/new" 
                                    variant="outline-primary" 
                                    size="lg"
                                    className="px-4"
                                >
                                    Создать новый лист
                                </Button>
                            </div>
                        ) : (
                            <div className="d-flex gap-3">
                                <Button 
                                    as={Link} 
                                    to="/login" 
                                    variant="primary" 
                                    size="lg"
                                    className="px-4"
                                >
                                    Войти в аккаунт
                                </Button>
                                <Button 
                                    as={Link} 
                                    to="/register" 
                                    variant="outline-primary" 
                                    size="lg"
                                    className="px-4"
                                >
                                    Зарегистрироваться
                                </Button>
                            </div>
                        )}
                    </Col>
                    <Col lg={4} className="text-center">
                        <div className="p-4 bg-white rounded-3 shadow-sm">
                            <h2 className="h4 mb-3">🎨✏️🧮</h2>
                            <p className="text-muted">
                                Рисуйте ➔ Распознавайте ➔ Вычисляйте
                            </p>
                        </div>
                    </Col>
                </Row>
            </Card>

            <Row className="mb-5">
                <Col>
                    <h2 className="text-center mb-4">Возможности приложения</h2>
                </Col>
            </Row>

            <Row className="g-4 mb-5">
                <Col md={4}>
                    <Card className="h-100 border-0 shadow-sm">
                        <Card.Body className="text-center p-4">
                            <div className="display-4 mb-3">🎨</div>
                            <Card.Title>Интуитивное рисование</Card.Title>
                            <Card.Text>
                                Рисуйте математические выражения на виртуальном холсте с 
                                настраиваемой кистью и ластиком.
                            </Card.Text>
                            <ListGroup variant="flush" className="text-start">
                                <ListGroup.Item className="border-0">
                                    <Badge bg="success" className="me-2">✓</Badge>
                                    Настройка размера кисти
                                </ListGroup.Item>
                                <ListGroup.Item className="border-0">
                                    <Badge bg="success" className="me-2">✓</Badge>
                                    Регулировка жесткости
                                </ListGroup.Item>
                                <ListGroup.Item className="border-0">
                                    <Badge bg="success" className="me-2">✓</Badge>
                                    Режим ластика
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="h-100 border-0 shadow-sm">
                        <Card.Body className="text-center p-4">
                            <div className="display-4 mb-3">🤖</div>
                            <Card.Title>Умное распознавание</Card.Title>
                            <Card.Text>
                                Используйте машинное обучение для автоматического 
                                распознавания нарисованных математических символов.
                            </Card.Text>
                            <ListGroup variant="flush" className="text-start">
                                <ListGroup.Item className="border-0">
                                    <Badge bg="success" className="me-2">✓</Badge>
                                    Цифры 0-9
                                </ListGroup.Item>
                                <ListGroup.Item className="border-0">
                                    <Badge bg="success" className="me-2">✓</Badge>
                                    Операторы + - * /
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="h-100 border-0 shadow-sm">
                        <Card.Body className="text-center p-4">
                            <div className="display-4 mb-3">📊</div>
                            <Card.Title>Организация результатов</Card.Title>
                            <Card.Text>
                                Сохраняйте и организуйте распознанные выражения 
                                в тематических листах с историей вычислений.
                            </Card.Text>
                            <ListGroup variant="flush" className="text-start">
                                <ListGroup.Item className="border-0">
                                    <Badge bg="success" className="me-2">✓</Badge>
                                    Создание листов
                                </ListGroup.Item>
                                <ListGroup.Item className="border-0">
                                    <Badge bg="success" className="me-2">✓</Badge>
                                    Автоматические вычисления
                                </ListGroup.Item>
                                <ListGroup.Item className="border-0">
                                    <Badge bg="success" className="me-2">✓</Badge>
                                    Статистика результатов
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mb-5">
                <Col lg={8} className="mx-auto">
                    <Card className="border-0 shadow-sm">
                        <Card.Header className="bg-white border-0">
                            <h3 className="mb-0">Как это работает</h3>
                        </Card.Header>
                        <Card.Body>
                            <Row className="align-items-center">
                                <Col md={3} className="text-center mb-3 mb-md-0">
                                    <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto" 
                                         style={{ width: '80px', height: '80px' }}>
                                        <span className="h3 mb-0">1</span>
                                    </div>
                                </Col>
                                <Col md={9}>
                                    <h5>Создайте лист</h5>
                                    <p className="text-muted mb-0">
                                        Зарегистрируйтесь и создайте новый лист для организации ваших 
                                        математических выражений.
                                    </p>
                                </Col>
                            </Row>
                            
                            <hr className="my-4" />
                            
                            <Row className="align-items-center">
                                <Col md={3} className="text-center mb-3 mb-md-0">
                                    <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto" 
                                         style={{ width: '80px', height: '80px' }}>
                                        <span className="h3 mb-0">2</span>
                                    </div>
                                </Col>
                                <Col md={9}>
                                    <h5>Нарисуйте выражение</h5>
                                    <p className="text-muted mb-0">
                                        Используйте инструменты рисования для создания математического 
                                        выражения на холсте.
                                    </p>
                                </Col>
                            </Row>
                            
                            <hr className="my-4" />
                            
                            <Row className="align-items-center">
                                <Col md={3} className="text-center mb-3 mb-md-0">
                                    <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto" 
                                         style={{ width: '80px', height: '80px' }}>
                                        <span className="h3 mb-0">3</span>
                                    </div>
                                </Col>
                                <Col md={9}>
                                    <h5>Распознайте и сохраните</h5>
                                    <p className="text-muted mb-0">
                                        Нажмите "Распознать" для обработки изображения и автоматического 
                                        сохранения результата в ваш лист.
                                    </p>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {!authState.isAuthenticated && (
                <Row className="mb-5">
                    <Col className="text-center">
                        <Card className="border-0 bg-primary text-white">
                            <Card.Body className="p-5">
                                <h2 className="mb-3">Начните использовать прямо сейчас!</h2>
                                <p className="lead mb-4">
                                    Присоединяйтесь к сообществу пользователей нашего математического распознавателя.
                                </p>
                                <div className="d-flex justify-content-center gap-3">
                                    <Button 
                                        as={Link} 
                                        to="/register" 
                                        variant="light" 
                                        size="lg"
                                        className="px-4"
                                    >
                                        Начать бесплатно
                                    </Button>
                                    <Button 
                                        as={Link} 
                                        to="/login" 
                                        variant="outline-light" 
                                        size="lg"
                                        className="px-4"
                                    >
                                        Уже есть аккаунт
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}

            <Row className="mb-5">
                <Col>
                    <h3 className="text-center mb-4">Примеры выражений</h3>
                    <div className="d-flex flex-wrap justify-content-center gap-3">
                        <Badge bg="light" text="dark" className="p-3 fs-6 border">
                            <code>12 + 34 = 46</code>
                        </Badge>
                        <Badge bg="light" text="dark" className="p-3 fs-6 border">
                            <code>15 - 8 = 7</code>
                        </Badge>
                        <Badge bg="light" text="dark" className="p-3 fs-6 border">
                            <code>45 × 2 = 90</code>
                        </Badge>
                        <Badge bg="light" text="dark" className="p-3 fs-6 border">
                            <code>100 ÷ 4 = 25</code>
                        </Badge>
                    </div>
                </Col>
            </Row>

            <Row>
                <Col className="text-center">
                    <hr className="mb-4" />
                    <p className="text-muted">
                        Математический распознаватель выражений 
                    </p>
                    <div className="d-flex justify-content-center gap-3">
                        <small className="text-muted">
                            Технологии: React, Django, Machine Learning
                        </small>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
