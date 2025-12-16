
import api from "./api";


export const mlService = {
    recognizeExpression: (sheetId, imageData) => {
        return api.post(`sheets/${sheetId}/recognize/`, imageData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
  
    checkTaskStatus: (taskId) => api.get(`tasks/${taskId}/status/`),
};
