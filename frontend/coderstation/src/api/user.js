import request from "./request";

export const getCaptcha = () => {
	return request({
		url: "/res/captcha",
		method: "get",
	});
};

export const checkExists = (username) => {
	return request({
		url: "/api/user/userIsExist/" + username,
		method: "get",
	});
};

export const register = (data) => {
	return request({
		url: "/api/user/",
		method: "post",
		data,
	});
};