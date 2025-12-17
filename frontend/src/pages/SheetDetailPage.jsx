
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Spinner,
    Alert,
    Tabs,
    Tab,
} from 'react-bootstrap';
import { useSheets } from '../hooks/useSheets';
import { useMathExpressions } from '../hooks/useMathExpressions';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext/AuthContext';
import SheetDetailHeader from '../components/Sheets/SheetDetailHeader';
import ExpressionTable from '../components/Sheets/ExpressionTable';
import SheetInfoCard from '../components/Sheets/SheetInfoCard';
import SheetStatsCard from '../components/Sheets/SheetStatsCard';
import EditSheetModal from '../components/Sheets/EditSheetModal';
import DeleteSheetModal from '../components/Sheets/DeleteSheetModal';


const SheetDetailPage = () => {
    const { sheetId } = useParams();
    const navigate = useNavigate();
    const { authState } = useContext(AuthContext);
    
    const { sheets, loading: sheetsLoading, updateSheet, deleteSheet } = useSheets();
    const {
        expressions,
        loading: expressionsLoading,
        deleteExpression,
        errorMessage,
    } = useMathExpressions(sheetId);
    
    const [sheet, setSheet] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editForm, setEditForm] = useState({
        title: '',
    });

    useEffect(() => {
        if (sheets.length > 0 && sheetId) {
            const foundSheet = sheets.find(s => s.id === parseInt(sheetId));
            if (foundSheet) {
                setSheet(foundSheet);
                setEditForm({ title: foundSheet.title });
            } 
            else {
                navigate('/sheets');
            }
        }
    }, [sheets, sheetId, navigate]);

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedSheet = await updateSheet(sheetId, editForm);
            setSheet(updatedSheet);
            setShowEditModal(false);
        } catch (error) {
            console.error('Error updating sheet:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteSheet(sheetId);
            setShowDeleteModal(false);
            navigate('/sheets');
        } catch (error) {
            console.error('Error deleting sheet:', error);
        }
    };

    const handleDeleteExpression = async (expressionId) => {
        if (window.confirm('Вы уверены, что хотите удалить это выражение?')) {
            try {
                await deleteExpression(expressionId);
            } catch (error) {
                console.error('Error deleting expression:', error);
            }
        }
    };

    const handleStartDrawing = () => {
        navigate(`/draw/${sheetId}`);
    };

    if (sheetsLoading || expressionsLoading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" />
                <p className="mt-3">Загрузка...</p>
            </Container>
        );
    }

    if (!sheet) {
        return (
            <Container className="text-center mt-5">
                <Alert variant="warning">
                    Лист не найден
                </Alert>
                <Button as={Link} to="/sheets" variant="primary">
                    Вернуться к списку листов
                </Button>
            </Container>
        );
    }

    return (
        <Container className="py-4">
            <SheetDetailHeader
                sheet={sheet}
                expressionsCount={expressions.length}
                onEdit={() => setShowEditModal(true)}
                onDelete={() => setShowDeleteModal(true)}
                onDraw={handleStartDrawing}
            />

            {errorMessage && (
                <Alert variant="danger" className="mb-4">
                    {errorMessage}
                </Alert>
            )}

            <Tabs defaultActiveKey="expressions" className="mb-4">
                <Tab eventKey="expressions" title="Математические выражения">
                    <Card>
                        <Card.Header className="d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">Выражения</h5>
                        </Card.Header>
                        <Card.Body>
                            <ExpressionTable
                                expressions={expressions}
                                onDeleteExpression={handleDeleteExpression}
                                showAuthWarning={!authState.isAuthenticated}
                            />
                            {expressions.length === 0 && authState.isAuthenticated && (
                                <div className="text-center mt-3">
                                    <Button 
                                        variant="primary" 
                                        onClick={handleStartDrawing}
                                    >
                                        Нарисовать первое выражение
                                    </Button>
                                </div>
                            )}
                            {expressions.length === 0 && !authState.isAuthenticated && (
                                <Alert variant="warning" className="mt-3">
                                    Авторизуйтесь для рисования выражений
                                </Alert>
                            )}
                        </Card.Body>
                    </Card>
                </Tab>

                <Tab eventKey="info" title="Информация">
                    <Row>
                        <Col md={6}>
                            <SheetInfoCard 
                                sheet={sheet} 
                                expressionsCount={expressions.length} 
                            />
                        </Col>
                        <Col md={6}>
                            <SheetStatsCard expressions={expressions} />
                        </Col>
                    </Row>
                </Tab>
            </Tabs>

            <EditSheetModal
                show={showEditModal}
                onHide={() => setShowEditModal(false)}
                title={editForm.title}
                setTitle={(value) => setEditForm({ title: value })}
                onSubmit={handleEditSubmit}
            />

            <DeleteSheetModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                sheetTitle={sheet.title}
                onDelete={handleDelete}
            />

            <div className="mt-4">
                <Button variant="outline-secondary" as={Link} to="/sheets">
                    ← Вернуться к списку листов
                </Button>
            </div>
        </Container>
    );
};

export default SheetDetailPage;
