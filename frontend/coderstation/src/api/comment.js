import request from "./request";

export const getCommentsFromIssueApi = (id) => {
	return request({
		url: '/api/comment/issuecomment/'+id,
		method: "get"
	});
};

export const addCommentApi = (data) => {
	return request({
		url: '/api/comment',
		method: "post",
		data
	});
};

export const getCommentsFromBookApi = (id) => {
	return request({
		url: '/api/comment/bookcomment/'+id,
		method: "get"
	});
};