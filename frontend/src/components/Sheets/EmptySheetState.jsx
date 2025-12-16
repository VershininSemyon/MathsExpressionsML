
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const EmptySheetState = () => {
    return (
        <Card className="text-center p-5">
            <Card.Body>
                <Card.Title>Листов пока нет</Card.Title>
                <Card.Text className="text-muted mb-4">
                    Создайте свой первый лист для распознавания математических выражений
                </Card.Text>
                <Button as={Link} to="/sheets/new" variant="primary">
                    Создать первый лист
                </Button>
            </Card.Body>
        </Card>
    );
};

export default EmptySheetState;
