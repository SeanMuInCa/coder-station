import request from "./request";

export const getIssueListApi = (params) => {
	return request({
		url: '/api/issue/',
		method: "get",
        params: { ...params }
	});
};