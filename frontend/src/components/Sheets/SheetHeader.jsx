
import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const SheetHeader = () => {
    return (
        <Row className="mb-4 align-items-center">
            <Col>
                <h1>Мои листы</h1>
            </Col>
            <Col className="text-end">
                <Button as={Link} to="/sheets/new" variant="primary">
                    + Создать новый лист
                </Button>
            </Col>
        </Row>
    );
};

export default SheetHeader;
