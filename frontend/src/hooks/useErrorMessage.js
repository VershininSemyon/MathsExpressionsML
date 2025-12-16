
import { useState, useCallback } from "react";


export const useErrorMessage = () => {
    const [errorMessage, setErrorMessage] = useState("");

    const handleError = useCallback((err) => {
        if (typeof err === 'object') {
            if (err.response && err.response.data) {
                const errorData = err.response.data;
    
                const errorMessages = Object.entries(errorData).map(([errorKey, errorValue]) => {
                    const errorText = Array.isArray(errorValue) ? errorValue.join(", ") : errorValue;
                    return `${errorKey}: ${errorText}`;
                });
    
                setErrorMessage(errorMessages.join(";\n"));
            } 
            else {
                setErrorMessage("Произошла ошибка");
            }
        } 
        else if (typeof err === 'string') {
            setErrorMessage(err);
        }
    }, []);

    const clearError = useCallback(() => {
        setErrorMessage("");
    }, []);
    
    return { errorMessage, handleError, clearError };
};
