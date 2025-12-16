
import React from 'react';
import { Card, Table } from 'react-bootstrap';
import { format } from 'date-fns';


const SheetInfoCard = ({ sheet, expressionsCount }) => {
    return (
        <Card className="mb-4">
            <Card.Header>Информация о листе</Card.Header>
            <Card.Body>
                <Table borderless>
                    <tbody>
                        <tr>
                            <td><strong>ID:</strong></td>
                            <td>{sheet.id}</td>
                        </tr>
                        <tr>
                            <td><strong>Название:</strong></td>
                            <td>{sheet.title}</td>
                        </tr>
                        <tr>
                            <td><strong>Дата создания:</strong></td>
                            <td>{format(new Date(sheet.created_at), 'dd.MM.yyyy HH:mm:ss')}</td>
                        </tr>
                        <tr>
                            <td><strong>Дата обновления:</strong></td>
                            <td>{format(new Date(sheet.updated_at), 'dd.MM.yyyy HH:mm:ss')}</td>
                        </tr>
                        <tr>
                            <td><strong>Количество выражений:</strong></td>
                            <td>{expressionsCount}</td>
                        </tr>
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};

export default SheetInfoCard;
