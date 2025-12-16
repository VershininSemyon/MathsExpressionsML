
import React from 'react';
import { Table, Badge, Button, Alert } from 'react-bootstrap';


const ExpressionTable = ({ 
    expressions, 
    onDeleteExpression, 
    showAuthWarning = false 
}) => {
    return (
        <>
            {expressions.length === 0 ? (
                <div className="text-center py-5">
                    <p className="text-muted mb-4">В этом листе еще нет выражений</p>
                </div>
            ) : (
                <Table responsive hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Выражение</th>
                            <th>Результат</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expressions.map((expr, index) => (
                            <tr key={expr.id}>
                                <td>{index + 1}</td>
                                <td className="font-monospace fs-5">{expr.expression_text}</td>
                                <td>
                                    <Badge bg="success" className="fs-6">
                                        {expr.calculation_result}
                                    </Badge>
                                </td>
                                <td>
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => onDeleteExpression(expr.id)}
                                    >
                                        Удалить
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            {showAuthWarning && (
                <Alert variant="warning" className="mt-3">
                    Для рисования выражений необходимо авторизоваться
                </Alert>
            )}
        </>
    );
};

export default ExpressionTable;
