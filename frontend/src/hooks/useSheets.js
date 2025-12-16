
import { useState, useEffect, useCallback } from 'react';
import { sheetsService } from '../services/sheets';
import { useErrorMessage } from './useErrorMessage';


export const useSheets = () => {
    const [sheets, setSheets] = useState([]);
    const [loading, setLoading] = useState(false);
    const { errorMessage, handleError } = useErrorMessage();

    const fetchSheets = useCallback(async () => {
        setLoading(true);
        try {
            const response = await sheetsService.getAllSheets();
            setSheets(response.data);
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    }, [handleError]);

    const createSheet = useCallback(async (data) => {
        try {
            const response = await sheetsService.createSheet(data);
            setSheets(prev => [...prev, response.data]);
            return response.data;
        } 
        catch (error) {
            handleError(error);
            throw error;
        }
    }, [handleError]);

    const updateSheet = useCallback(async (id, data) => {
        try {
            const response = await sheetsService.updateSheet(id, data);
            setSheets(prev => prev.map(sheet => 
                sheet.id === id ? response.data : sheet
            ));
            return response.data;
        } 
        catch (error) {
            handleError(error);
            throw error;
        }
    }, [handleError]);

    const deleteSheet = useCallback(async (id) => {

        try {
            await sheetsService.deleteSheet(id);
            setSheets(prev => prev.filter(sheet => sheet.id !== id));
        } 
        catch (error) {
            handleError(error);
            throw error;
        }
    }, [handleError]);

    useEffect(() => {
        fetchSheets();
    }, [fetchSheets]);

    return {
        sheets,
        loading,
        errorMessage,
        refetch: fetchSheets,
        createSheet,
        updateSheet,
        deleteSheet,
    };
};
