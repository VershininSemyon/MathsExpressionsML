
import React from 'react';
import Header from './Header';
import Navigation from './Navigation';
import Footer from './Footer';
import { Container, Row, Col } from 'react-bootstrap';


const Layout = ({ children }) => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
        
            <Container fluid className="flex-grow-1">
                <Row className="h-100">
                    <Col xs={12} md={3} lg={2} className="d-none d-md-block p-0">
                        <Navigation />
                    </Col>
                    <Col xs={12} md={9} lg={10} className="p-4">
                        {children}
                    </Col>
                </Row>
            </Container>
        
            <Footer />
        </div>
    );
};

export default Layout;
