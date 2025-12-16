
import { useState, useCallback } from 'react';
import { mathExpressionsService } from '../services/mathExpressions';
import { useErrorMessage } from './useErrorMessage';


export const useMathExpressions = (sheetId) => {
    const [expressions, setExpressions] = useState([]);
    const [loading, setLoading] = useState(false);
    const { errorMessage, handleError } = useErrorMessage();

    const fetchExpressions = useCallback(async () => {
        if (!sheetId) return;
        
        setLoading(true);
        try {
            const response = await mathExpressionsService.getExpressionsBySheet(sheetId);
            setExpressions(response.data);
        } 
        catch (error) {
            handleError(error);
        } 
        finally {
            setLoading(false);
        }
    }, [sheetId, handleError]);

    const createExpression = useCallback(async (data) => {
        try {
            const response = await mathExpressionsService.createExpression(sheetId, data);
            setExpressions(prev => [...prev, response.data]);
            return response.data;
        } 
        catch (error) {
            handleError(error);
            throw error;
        }
    }, [sheetId, handleError]);

    const updateExpression = useCallback(async (expressionId, data) => {
        try {
            const response = await mathExpressionsService.updateExpression(sheetId, expressionId, data);
            setExpressions(prev => prev.map(expr => 
                expr.id === expressionId ? response.data : expr
            ));
            return response.data;
        } 
        catch (error) {
            handleError(error);
            throw error;
        }
    }, [sheetId, handleError]);

    const deleteExpression = useCallback(async (expressionId) => {
        try {
            await mathExpressionsService.deleteExpression(sheetId, expressionId);
            setExpressions(prev => prev.filter(expr => expr.id !== expressionId));
        } 
        catch (error) {
            handleError(error);
            throw error;
        }
    }, [sheetId, handleError]);

    return {
        expressions,
        loading,
        errorMessage,
        refetch: fetchExpressions,
        createExpression,
        updateExpression,
        deleteExpression,
    };
};
