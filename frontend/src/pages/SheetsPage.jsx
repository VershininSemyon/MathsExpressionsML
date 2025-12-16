
import React from 'react';
import { Container, Spinner, Alert } from 'react-bootstrap';
import { useSheets } from '../hooks/useSheets';
import SheetHeader from '../components/Sheets/SheetHeader';
import SheetList from '../components/Sheets/SheetList';
import EmptySheetState from '../components/Sheets/EmptySheetState';


const SheetsPage = () => {
    const { sheets, loading, errorMessage, deleteSheet } = useSheets();

    const handleDelete = async (id) => {
        if (window.confirm('Вы уверены, что хотите удалить этот лист?')) {
            await deleteSheet(id);
        }
    };

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" />
                <p className="mt-3">Загрузка листов...</p>
            </Container>
        );
    }

    return (
        <Container className="py-4">
            <SheetHeader />
            
            {errorMessage && (
                <Alert variant="danger" className="mb-4">
                    {errorMessage}
                </Alert>
            )}

            {sheets.length === 0 ? (
                <EmptySheetState />
            ) : (
                <SheetList sheets={sheets} onDelete={handleDelete} />
            )}
        </Container>
    );
};

export default SheetsPage;
