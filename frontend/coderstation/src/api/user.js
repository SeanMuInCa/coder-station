import request from "./request";

export const getCaptcha = () => {
	return request({
		url: "/res/captcha",
		method: "get",
	});
};
