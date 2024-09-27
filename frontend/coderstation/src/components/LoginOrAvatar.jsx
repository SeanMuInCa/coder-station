import React from "react";
import { Button, List, Popover } from "antd";
import { useSelector } from "react-redux";
const LoginOrAvatar = (props) => {
	const user = useSelector((state) => state.user);
	let loginStatus = null;
	let userLogo = '/icon1.png';
	const content = (
		<List
			dataSource={["Profile", "Logout"]}
			size="large"
			renderItem={(item) => {
				return <List.Item className="cursor-pointer hover:text-blue-400">{item}</List.Item>;
			}}
		/>
	);
	if (user.isLogin) {
		userLogo = user.userInfo.avatar;
		loginStatus = (
			<Popover placement="bottom" content={content}>
				<img src={userLogo} alt="avatar" className="rounded-full w-12 h-12"/>
			</Popover>
		);
	} else {
		loginStatus = (
			<Button type="primary" size="large" onClick={props.loginHandle}>
				Login / Register
			</Button>
		);
	}
	return <div>{ loginStatus }</div>;
};

export default LoginOrAvatar;
