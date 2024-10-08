import request from "./request";

export const getIssueListApi = (params) => {
	return request({
		url: '/api/issue/',
		method: "get",
        params: { ...params }
	});
};

export const getIssueApi = (id) => {
	return request({
		url: '/api/issue/'+id,
		method: "get"
	});
};