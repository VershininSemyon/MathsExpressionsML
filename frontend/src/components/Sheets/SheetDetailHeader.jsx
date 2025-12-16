
import React from 'react';
import { Row, Col, Button, Badge } from 'react-bootstrap';
import { format } from 'date-fns';


const SheetDetailHeader = ({ 
    sheet, 
    expressionsCount, 
    onEdit, 
    onDelete, 
    onDraw 
}) => {
    return (
        <Row className="mb-4 align-items-center">
            <Col>
                <div className="d-flex align-items-center">
                    <h1 className="mb-0">{sheet.title}</h1>
                    <Badge bg="secondary" className="ms-3">
                        {expressionsCount} выражений
                    </Badge>
                </div>
                <p className="text-muted mb-0 mt-2">
                    Создан: {format(new Date(sheet.created_at), 'dd.MM.yyyy HH:mm')}
                </p>
                {sheet.updated_at && (
                    <p className="text-muted mb-0">
                        Обновлен: {format(new Date(sheet.updated_at), 'dd.MM.yyyy HH:mm')}
                    </p>
                )}
            </Col>
            <Col className="text-end">
                <Button variant="outline-primary" className="me-2" onClick={onEdit}>
                    Редактировать
                </Button>
                <Button variant="outline-danger" className="me-2" onClick={onDelete}>
                    Удалить
                </Button>
                <Button variant="primary" onClick={onDraw}>
                    Нарисовать новое выражение
                </Button>
            </Col>
        </Row>
    );
};

export default SheetDetailHeader;
