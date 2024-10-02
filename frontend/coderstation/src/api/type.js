import request from "./request";

export const getTypeListApi = () => {
	return request({
		url: '/api/type',
		method:'get'
	})
}