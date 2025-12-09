
import { useState } from "react";


export const useErrorMessage = () => {
    const [errorMessage, setErrorMessage] = useState("");

    const handleError = (err) => {
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

    return {errorMessage, handleError};
}
