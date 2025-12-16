
import React from 'react';
import { Card } from 'react-bootstrap';


const SheetStatsCard = ({ expressions }) => {
    const hasExpressions = expressions.length > 0;

    return (
        <Card>
            <Card.Header>Статистика</Card.Header>
            <Card.Body>
                {hasExpressions ? (
                    <div>
                        <p>
                            <strong>Средний результат:</strong>{' '}
                            {(
                                expressions.reduce((sum, expr) => sum + expr.calculation_result, 0) /
                                expressions.length
                            ).toFixed(2)}
                        </p>
                        <p>
                            <strong>Максимальный результат:</strong>{' '}
                            {Math.max(...expressions.map(e => e.calculation_result)).toFixed(2)}
                        </p>
                        <p>
                            <strong>Минимальный результат:</strong>{' '}
                            {Math.min(...expressions.map(e => e.calculation_result)).toFixed(2)}
                        </p>
                    </div>
                ) : (
                    <p className="text-muted">Нет данных для статистики</p>
                )}
            </Card.Body>
        </Card>
    );
};

export default SheetStatsCard;
