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

export const login = (data) => {
	return request({
		url: "/api/user/login",
		method: "post",
		data,
	});
};

export const getUserInfo = (id) => {
	return request({
		url: "/api/user/" + id,
		method: "get",
	});
};

export const keepStatus = ()=>{
	return request({
		url: "/api/user/whoami",
		method: "get",
	});
}

export const getTopTenUserApi = ()=>{
	return request({
		url: "/api/user/pointsrank",
		method: "get",
	});
}

export const updateUserInfoApi = (id,data)=>{
	return request({
		url: "/api/user/" + id,
		method: "patch",
		data
	})
}
export const uploadAvatarApi = (data)=>{
	return request({
		url: "/api/upload",
		method: "post",
		data
	})
}