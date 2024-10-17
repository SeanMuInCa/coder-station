import request from './request'

export const getAllBookApi = (params) => {
	return request({
		url: '/api/book',
		method: 'get',
		params: { ...params }
	})
}