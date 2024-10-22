import request from "./request";

export const getInterviewApi = (params) => {
	return request({
		url: '/api/interview/',
		method: "get",
        params: { ...params }
	});
};

export const getInterviewByIdApi = (id) => {
	return request({
		url: '/api/interview/'+id,
		method: "get"
	});
};