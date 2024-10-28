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

export const addIssueApi = (data) =>{
	return request({
		url: '/api/issue/',
		method: "post",
		data
	});
}

export const updateIssueApi = (id, data) =>{
	return request({
		url: '/api/issue/' + id,
		method: "patch",
		data
	});
}