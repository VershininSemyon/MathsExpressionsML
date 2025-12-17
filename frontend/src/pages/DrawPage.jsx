
import React, { useState, useRef, useContext } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext/AuthContext';
import { useMLRecognition } from '../hooks/useMLRecognition';
import { useMathExpressions } from '../hooks/useMathExpressions';
import DrawingCanvas from '../components/Drawing/DrawingCanvas';
import BrushSettings from '../components/Drawing/BrushSettings';


const DrawPage = () => {
    const { sheetId } = useParams();
    const { authState } = useContext(AuthContext);
    const { createExpression } = useMathExpressions(sheetId);
    const { recognizeExpression, processing } = useMLRecognition(sheetId);
    
    const [brushSize, setBrushSize] = useState(10);
    const [brushHardness, setBrushHardness] = useState(0.5);
    const [isEraser, setIsEraser] = useState(false);
    const [expression, setExpression] = useState('');
    const [result, setResult] = useState('');
    const [error, setError] = useState('');
    
    const canvasRef = useRef(null);

    const handleClearCanvas = () => {
        if (canvasRef.current) {
            canvasRef.current.clear();
        }
    };

    const handleRecognize = async () => {
        if (!authState.isAuthenticated) {
            setError('Для распознавания необходимо авторизоваться');
            return;
        }

        if (!sheetId) {
            setError('Выберите лист для сохранения результатов');
            return;
        }

        const canvas = canvasRef.current?.getCanvas();
        if (!canvas) return;

        try {
            canvas.toBlob(async (blob) => {
                try {
                    const recognitionResult = await recognizeExpression(blob);
                    
                    if (recognitionResult.success) {
                        setExpression(recognitionResult.expression);
                        setResult(recognitionResult.result);
                        
                        await createExpression({
                            expression_text: recognitionResult.expression,
                            calculation_result: parseFloat(recognitionResult.result),
                        });
                    } 
                    else {
                        setError(recognitionResult.error || 'Ошибка распознавания');
                    }
                } 
                catch (err) {
                    setError('Ошибка при отправке изображения');
                }
            }, 'image/png');
        } 
        catch (err) {
            setError('Ошибка при обработке изображения');
        }
    };

    if (!authState.isAuthenticated) {
        return (
            <Container className="py-5 text-center">
                <Alert variant="warning">
                    Для использования функции рисования необходимо{' '}
                    <Alert.Link href="/login">войти в аккаунт</Alert.Link>
                </Alert>
            </Container>
        );
    }

    return (
        <Container fluid className="py-4">
            <Row className="mb-4">
                <Col>
                    <h1>Рисование математических выражений</h1>
                    <p className="text-muted">
                        Нарисуйте математическое выражение, и система распознает его
                    </p>
                </Col>
            </Row>

            {error && (
                <Alert variant="danger" className="mb-4" dismissible onClose={() => setError('')}>
                    {error}
                </Alert>
            )}

            <Row>
                <Col lg={8} className="mb-4">
                    <Card className="h-100">
                        <Card.Body className="p-0">
                            <DrawingCanvas
                                ref={canvasRef}
                                brushSize={brushSize}
                                brushHardness={brushHardness}
                                isEraser={isEraser}
                            />
                        </Card.Body>
                        <Card.Footer className="d-flex justify-content-between">
                            <Button variant="outline-danger" onClick={handleClearCanvas}>
                                Очистить холст
                            </Button>
                            <Button
                                variant="primary"
                                onClick={handleRecognize}
                                disabled={processing}
                            >
                                {processing ? (
                                    <>
                                        <Spinner animation="border" size="sm" className="me-2" />
                                        Распознавание...
                                    </>
                                ) : (
                                    'Распознать'
                                )}
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>

                <Col lg={4}>
                    <Card className="mb-4">
                        <Card.Header>Настройки кисти</Card.Header>
                        <Card.Body>
                            <BrushSettings
                                brushSize={brushSize}
                                setBrushSize={setBrushSize}
                                brushHardness={brushHardness}
                                setBrushHardness={setBrushHardness}
                                isEraser={isEraser}
                                setIsEraser={setIsEraser}
                            />
                        </Card.Body>
                    </Card>

                    <Card>
                        <Card.Header>Результаты</Card.Header>
                        <Card.Body>
                            {expression && (
                                <>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Распознанное выражение:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={expression}
                                            readOnly
                                            className="fw-bold fs-4"
                                        />
                                    </Form.Group>
                                    
                                    <Form.Group>
                                        <Form.Label>Результат:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={result}
                                            readOnly
                                            className="fw-bold fs-4 text-success"
                                        />
                                    </Form.Group>
                                </>
                            )}
                            
                            {!expression && (
                                <div className="text-center text-muted py-4">
                                    <p>Нарисуйте выражение и нажмите "Распознать"</p>
                                    <small>Поддерживаются: цифры 0-9, операторы + - * / .</small>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default DrawPage;
