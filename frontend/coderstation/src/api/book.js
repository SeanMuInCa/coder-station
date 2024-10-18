import request from './request'

export const getAllBookApi = (params) => {
	return request({
		url: '/api/book',
		method: 'get',
		params: { ...params }
	})
}

export const getBookByIdApi = (id) => {
	return request({
		url: '/api/book/' + id,
		method: 'get'
	})
}