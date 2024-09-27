import request from "./request";

export const getCaptcha = () => {
	return request({
		url: "/res/captcha",
		method: "get",
	});
};

export const checkExists = (username) => {
	return request({
		url: "/res/api/user/userIsExist/" + username,
		method: "get",
	});
};