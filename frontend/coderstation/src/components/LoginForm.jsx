import { useRef, useState } from "react";
import { Flex, Form, Modal, Radio, Input, Checkbox,Row, Col } from "antd";

const LoginForm = (props) => {
	const [formType, setFormType] = useState(1);
	const [captcha, setCaptcha] = useState(null);
	const [loginInfo, setLoginInfo] = useState({
		username: "",
		password: "",
		rememberMe: false,
		captcha: "",
	});
	const loginFormRef = useRef();
	const updateUserInfo = (info, value, key) => {
		info[key] = value;
		console.log(info);

		// setLoginInfo(info);
	};
	const confirmHandle = () => {
		// TODO: login or register logic
		props.closeForm();
	};
	const changeType = (e) => {
		setFormType(e.target.value);
	};
	let container =
		formType === 1 ? (
			<Form
				name="login"
				autoComplete="off"
				onFinish={confirmHandle}
				labelCol={{
					span: 7,
				}}
				wrapperCol={{
					span: 14,
				}}
				ref={loginFormRef}
			>
				<Form.Item
					label="Username"
					name="username"
					rules={[
						{
							required: true,
							message: "Please input your username!",
						},
					]}
				>
					<Input
						placeholder="Please input your username!"
						value={loginInfo.username}
						onChange={(e) => updateUserInfo(loginInfo, e.target.value, "username")}
					/>
				</Form.Item>

				<Form.Item
					label="Password"
					name="password"
					rules={[
						{
							required: true,
							message: "Please input your password!",
						},
					]}
				>
					<Input.Password
						placeholder="Please input your password!"
						value={loginInfo.password}
						onChange={(e) => updateUserInfo(loginInfo, e.target.value, "password")}
					/>
				</Form.Item>
				<Form.Item
					name="captcha"
					label="Captcha"
					rules={[
						{
							required: true,
							message: "Please input the captcha",
						},
					]}
				>
					<Row align="middle">
						<Col span={16}>
							<Input
								placeholder="please input the captcha"
								value={loginInfo.captcha}
								onChange={(e) =>
									updateUserInfo(loginInfo, e.target.value, "captcha")
								}
							/>
						</Col>
						<Col span={6}>
							<div
								// onClick={captchaClickHandle}
								// dangerouslySetInnerHTML={{ __html: captcha }}
							></div>
						</Col>
					</Row>
				</Form.Item>
				<Form.Item
					name="rememberMe"
					valuePropName="checked"
					wrapperCol={{
						offset: 8,
						span: 16,
					}}
				>
					<Checkbox
						onChange={(e) =>
							updateUserInfo(loginInfo, e.target.checked, "rememberMe")
						}
					>
						Remember me
					</Checkbox>
				</Form.Item>
			</Form>
		) : (
			<Form></Form>
		);
	return (
		<Modal
			title="Login / Register"
			open={props.openForm}
			onOk={confirmHandle}
			onCancel={props.closeForm}
		>
			<Flex vertical gap="middle" className="my-5">
				<Radio.Group
					block
					defaultValue={formType}
					optionType="button"
					buttonStyle="solid"
					onChange={changeType}
				>
					<Radio.Button value={1} className="w-1/2">
						Login
					</Radio.Button>
					<Radio.Button value={2} className="w-1/2">
						Register
					</Radio.Button>
				</Radio.Group>
			</Flex>
			{container}
		</Modal>
	);
};

export default LoginForm;
