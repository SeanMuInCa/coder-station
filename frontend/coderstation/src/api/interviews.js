import request from "./request";

export const getInterviewApi = (params) => {
	return request({
		url: '/api/interview/',
		method: "get",
        params: { ...params }
	});
};