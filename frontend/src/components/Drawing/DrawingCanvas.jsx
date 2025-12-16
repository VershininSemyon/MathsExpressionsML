import React, { useState, useEffect, useRef, useCallback, forwardRef } from 'react';

const DrawingCanvas = forwardRef(({ brushSize, brushHardness, isEraser }, ref) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPoint, setLastPoint] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const getCanvasContext = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    
    const ctx = canvas.getContext('2d');
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    
    if (isEraser) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.strokeStyle = 'rgba(0,0,0,1)';
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = '#000';
    }
    
    ctx.lineWidth = brushSize;
    ctx.globalAlpha = brushHardness;
    
    return ctx;
  }, [brushSize, brushHardness, isEraser]);

  const drawLine = useCallback((x1, y1, x2, y2) => {
    const ctx = getCanvasContext();
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }, [getCanvasContext]);

  const handleMouseDown = useCallback((e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIsDrawing(true);
    setLastPoint({ x, y });
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDrawing) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    drawLine(lastPoint.x, lastPoint.y, x, y);
    setLastPoint({ x, y });
  }, [isDrawing, lastPoint, drawLine]);

  const handleMouseUp = useCallback(() => {
    setIsDrawing(false);
  }, []);

  const handleTouchStart = useCallback((e) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleMouseDown(touch);
  }, [handleMouseDown]);

  const handleTouchMove = useCallback((e) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleMouseMove(touch);
  }, [handleMouseMove]);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    
    if (!canvas || !container) return;
    
    const { width, height } = container.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;
    
    // Восстанавливаем контекст после ресайза
    getCanvasContext();
  }, [getCanvasContext]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [resizeCanvas]);

  useEffect(() => {
    // Экспортируем методы для внешнего использования
    if (ref) {
      ref.current = {
        clear: clearCanvas,
        getCanvas: () => canvasRef.current,
      };
    }
  }, [ref, clearCanvas]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '500px',
        backgroundColor: '#f8f9fa',
        borderRadius: '4px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          cursor: isEraser ? 'crosshair' : 'default',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      />
      
      <div style={{
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        backgroundColor: 'rgba(0,0,0,0.7)',
        color: 'white',
        padding: '5px 10px',
        borderRadius: '4px',
        fontSize: '14px',
      }}>
        {isEraser ? 'Ластик' : 'Кисть'} • Размер: {brushSize}px
      </div>
    </div>
  );
});

DrawingCanvas.displayName = 'DrawingCanvas';

export default DrawingCanvas;
