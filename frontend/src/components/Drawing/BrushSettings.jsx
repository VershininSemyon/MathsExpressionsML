
import React from 'react';
import { Form, ButtonGroup, ToggleButton } from 'react-bootstrap';


const BrushSettings = ({
        brushSize,
        setBrushSize,
        brushHardness,
        setBrushHardness,
        isEraser,
        setIsEraser,
    }) => {
    const brushSizes = [5, 10, 15, 20, 25, 30];
    const hardnessValues = [
        { value: 0.2, label: 'Мягкая' },
        { value: 0.5, label: 'Средняя' },
        { value: 0.8, label: 'Жесткая' },
    ];

    return (
        <>
            <Form.Group className="mb-4">
                <Form.Label className="d-flex justify-content-between">
                    <span>Размер кисти: {brushSize}px</span>
                </Form.Label>
                <Form.Range
                    min="1"
                    max="50"
                    value={brushSize}
                    onChange={(e) => setBrushSize(parseInt(e.target.value))}
                />
                <div className="d-flex justify-content-between mt-2">
                    {brushSizes.map((size) => (
                        <ButtonGroup key={size} className="me-2">
                            <ToggleButton
                                id={`brush-size-${size}`}
                                type="radio"
                                variant={brushSize === size ? 'primary' : 'outline-primary'}
                                checked={brushSize === size}
                                onChange={() => setBrushSize(size)}
                                size="sm"
                            >
                                {size}
                            </ToggleButton>
                        </ButtonGroup>
                    ))}
                </div>
            </Form.Group>

            <Form.Group className="mb-4">
                <Form.Label>Жесткость кисти</Form.Label>
                <Form.Range
                    min="0.1"
                    max="1"
                    step="0.1"
                    value={brushHardness}
                    onChange={(e) => setBrushHardness(parseFloat(e.target.value))}
                />
                <div className="d-flex justify-content-between mt-2">
                    {hardnessValues.map(({ value, label }) => (
                        <ButtonGroup key={value} className="me-2">
                            <ToggleButton
                                id={`hardness-${value}`}
                                type="radio"
                                variant={brushHardness === value ? 'secondary' : 'outline-secondary'}
                                checked={brushHardness === value}
                                onChange={() => setBrushHardness(value)}
                                size="sm"
                            >
                                {label}
                            </ToggleButton>
                        </ButtonGroup>
                    ))}
                </div>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Check
                    type="switch"
                    id="eraser-switch"
                    label="Режим ластика"
                    checked={isEraser}
                    onChange={(e) => setIsEraser(e.target.checked)}
                />
            </Form.Group>
        </>
    );
};

export default BrushSettings;
