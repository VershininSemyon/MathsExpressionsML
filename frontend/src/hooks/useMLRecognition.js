
import { useState, useCallback } from 'react';
import { mlService } from '../services/mlService';
import { useErrorMessage } from './useErrorMessage';

export const useMLRecognition = (sheetId) => {
  const [recognitionResult, setRecognitionResult] = useState(null);
  const [processing, setProcessing] = useState(false);
  const { errorMessage, handleError } = useErrorMessage();

  const recognizeExpression = useCallback(async (imageBlob) => {
    if (!sheetId) {
      throw new Error('Sheet ID is required for recognition');
    }
    
    setProcessing(true);
    try {
      const formData = new FormData();
      formData.append('image', imageBlob);
      
      const response = await mlService.recognizeExpression(sheetId, formData);
      setRecognitionResult(response.data);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    } finally {
      setProcessing(false);
    }
  }, [sheetId, handleError]);

  return {
    recognitionResult,
    processing,
    errorMessage,
    recognizeExpression,
  };
};
