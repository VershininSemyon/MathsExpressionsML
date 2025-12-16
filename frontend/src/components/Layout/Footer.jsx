
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';


const Footer = () => {
    return (
        <footer className="bg-dark text-light mt-5 py-4">
            <Container>
                <Row>
                    <Col md={6}>
                        <h5>Maths Recognition Service</h5>
                        <p className="mb-0">
                            Интерактивное приложение для распознавания математических выражений
                        </p>
                    </Col>
                    <Col md={6} className="text-md-end">
                        <p className="mb-0">
                            &copy; {new Date().getFullYear()} Все права защищены
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
