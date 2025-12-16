
import React from 'react';
import { Row } from 'react-bootstrap';
import SheetCard from './SheetCard';


const SheetList = ({ sheets, onDelete }) => {
    return (
        <Row>
            {sheets.map((sheet) => (
                <SheetCard 
                    key={sheet.id} 
                    sheet={sheet} 
                    onDelete={onDelete}
                />
            ))}
        </Row>
    );
};

export default SheetList;
