import React from "react";
import { Button, List, Popover } from "antd";
import { useSelector } from "react-redux";
const LoginOrAvatar = () => {
	const user = useSelector((state) => state.user);
	let loginStatus = null;
	const content = (
		<List
			dataSource={["Profile", "Logout"]}
			size="large"
			renderItem={(item) => {
				return <List.Item className="cursor-pointer">{item}</List.Item>;
			}}
		/>
	);
	if (user.isLogin) {
		loginStatus = (
			<Popover placement="bottom" content={content}>
				<img src="/icon1.png" alt="avatar" className="rounded-full w-12 h-12"/>
			</Popover>
		);
	} else {
		loginStatus = (
			<Button type="primary" size="large">
				Login / Register
			</Button>
		);
	}
	return <div>{ loginStatus }</div>;
};

export default LoginOrAvatar;
