
import api from "./api";


export const sheetsService = {
    getAllSheets: () => api.get("sheets/", ),

    createSheet: (data) => api.post("sheets/", data),

    getSheet: (id) => api.get(`sheets/${id}/`),

    updateSheet: (id, data) => api.put(`sheets/${id}/`, data),

    partialUpdateSheet: (id, data) => api.patch(`sheets/${id}/`, data),

    deleteSheet: (id) => api.delete(`sheets/${id}/`),
};
