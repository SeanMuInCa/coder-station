import request from "./request";

export const getCommentsFromIssueApi = (id) => {
	return request({
		url: '/api/comment/issuecomment/'+id,
		method: "get"
	});
};