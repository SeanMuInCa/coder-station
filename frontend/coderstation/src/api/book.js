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
export const updateBookApi = (id, data) =>{
	return request({
		url: '/api/book/' + id,
		method: "patch",
		data
	});
}