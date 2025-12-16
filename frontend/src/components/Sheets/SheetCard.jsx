
import React from 'react';
import { Card, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const SheetCard = ({ sheet, onDelete }) => {
    return (
        <Col md={6} lg={4} className="mb-4">
            <Card className="h-100">
                <Card.Body>
                    <Card.Title>{sheet.title}</Card.Title>
                    <Card.Text className="text-muted">
                        Создан: {new Date(sheet.created_at).toLocaleDateString()}
                    </Card.Text>
                    <Card.Text>
                        Выражений: {sheet.maths_expressions_count || 0}
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between">
                    <Button
                        as={Link}
                        to={`/sheets/${sheet.id}`}
                        variant="outline-primary"
                        size="sm"
                    >
                        Открыть
                    </Button>
                    <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => onDelete(sheet.id)}
                    >
                        Удалить
                    </Button>
                </Card.Footer>
            </Card>
        </Col>
    );
};

export default SheetCard;
