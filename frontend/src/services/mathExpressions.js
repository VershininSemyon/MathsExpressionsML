
import api from "./api";


export const mathExpressionsService = {
	getExpressionsBySheet: (sheetId) => api.get(`sheets/${sheetId}/maths_expressions/`),

	createExpression: (sheetId, data) => api.post(`sheets/${sheetId}/maths_expressions/`, data),

	getExpression: (sheetId, expressionId) => api.get(`sheets/${sheetId}/maths_expressions/${expressionId}/`),

	updateExpression: (sheetId, expressionId, data) => api.put(`sheets/${sheetId}/maths_expressions/${expressionId}/`, data),

	partialUpdateExpression: (sheetId, expressionId, data) => api.patch(`sheets/${sheetId}/maths_expressions/${expressionId}/`, data),

	deleteExpression: (sheetId, expressionId) => api.delete(`sheets/${sheetId}/maths_expressions/${expressionId}/`),
};
