import React, { useState } from "react";
import { Button } from "antd";
import { useSelector } from "react-redux";
const LoginOrAvatar = () => {
	const user = useSelector((state) => state.user);
	let loginStatus = null;

	if (user.isLogin) {
		loginStatus = <div>login</div>
	} else {
		loginStatus = (
			<Button type="primary" size="large">
				Login / Register
			</Button>
		);
	}
	return <div>{loginStatus}</div>;
};

export default LoginOrAvatar;
