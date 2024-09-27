import { useRef, useState, useEffect } from "react";
import {
	Flex,
	Form,
	Modal,
	Radio,
	Input,
	Checkbox,
	Row,
	Col,
	Button,
} from "antd";
import { getCaptcha, checkExists, register } from "../api/user";

// TODO: the loginid share in login and register
const LoginForm = (props) => {
	const [formType, setFormType] = useState(1);
	const [captcha, setCaptcha] = useState(null);
	const [loginInfo, setLoginInfo] = useState({
		loginId: "",
		password: "",
		rememberMe: false,
		captcha: "",
	});
	const [regInfo, setRegInfo] = useState({
		loginId: "",
		captcha: "",
		nickname: "",
	});
	const loginFormRef = useRef();
	const regFormRef = useRef();

	const clearRegInfo = () => {
		setRegInfo({
			loginId: "",
			captcha: "",
			nickname: "",
		});
	};
	const clearLoginInfo = () => {
		setLoginInfo({
			loginId: "",
			password: "",
			rememberMe: false,
			captcha: "",
		});
	};
	const fetchCaptcha = async () => {
		const res = await getCaptcha();
		setCaptcha(res);
	};
	useEffect(() => {
		fetchCaptcha();
	}, [props.openForm]); // listen openForm changes , refetch the captcha
	const updateUserInfo = (info, value, key, setInfo) => {
		setInfo({
			...info,
			[key]: value,
		});
		console.log('info', info,value,key,setInfo);
		
	};
	const loginConfirmHandle = () => {
		// TODO: login or register logic
		console.log("login confirm handle");

		props.closeForm();
	};
	const regConfirmHandle = async() => {
		console.log("reg confirm handle");
		console.log(regInfo,'regInfo');
		console.log(loginInfo,'loginInfo');
		
		const res = await register(regInfo)
		//failed
		if(res.code === 406){
			fetchCaptcha();
		}else{
			props.closeForm();
			clearRegInfo();
		}
		console.log(res);
	};
	const changeType = (e) => {
		fetchCaptcha();
		setFormType(e.target.value);
	};

	const checkExistingUsername = async () => {
		if(regInfo.loginId.trim() === "") return;
		const res = await checkExists(regInfo.loginId);
		//true means existing
		return res.data && Promise.reject("username already exists");
	};
	const closeModal = () => {
		clearLoginInfo();
		clearRegInfo();
		props.closeForm();
	};
	let container =
		formType === 1 ? (
			<Form
				name="login"
				autoComplete="off"
				onFinish={loginConfirmHandle}
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
					name="loginId"
					rules={[
						{
							required: true,
							message: "Please input your username!",
						},
					]}
				>
					<Input
						placeholder="Please input your username!"
						value={loginInfo.loginId}
						onChange={(e) =>
							updateUserInfo(loginInfo, e.target.value, "loginId", setLoginInfo)
						}
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
						onChange={(e) =>
							updateUserInfo(loginInfo, e.target.value, "password", setLoginInfo)
						}
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
								placeholder="captcha"
								value={loginInfo.captcha}
								onChange={(e) =>
									updateUserInfo(loginInfo, e.target.value, "captcha", setLoginInfo)
								}
							/>
						</Col>
						<Col span={6}>
							<div
								className="cursor-pointer"
								onClick={fetchCaptcha}
								dangerouslySetInnerHTML={{ __html: captcha }}
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
							updateUserInfo(loginInfo, e.target.checked, "rememberMe", setLoginInfo)
						}
					>
						Remember me
					</Checkbox>
				</Form.Item>
				<Form.Item
					wrapperCol={{
						offset: 8,
						span: 16,
					}}
				>
					<Button type="primary" htmlType="submit" style={{ marginRight: 20 }}>
						Login
					</Button>
					<Button type="primary" htmlType="submit">
						Reset
					</Button>
				</Form.Item>
			</Form>
		) : (
			<Form
				name="register"
				autoComplete="off"
				onFinish={regConfirmHandle}
				labelCol={{
					span: 7,
				}}
				wrapperCol={{
					span: 14,
				}}
				ref={regFormRef}
			>
				<Form.Item
					label="Username"
					name="loginId"
					rules={[
						{
							required: true,
							message: "Please input your username!",
						},
						{ validator: checkExistingUsername },
					]}
					// validateTrigger="onBlur"
				>
					<Input
						placeholder="Please input your username!"
						value={regInfo.loginId}
						onChange={(e) =>
							updateUserInfo(regInfo, e.target.value, "loginId", setRegInfo)
						}
					/>
				</Form.Item>

				<Form.Item label="Nickname" name="nickname">
					<Input
						placeholder="Nickname by default is UserXXX"
						value={regInfo.nickname}
						onChange={(e) =>
							updateUserInfo(regInfo, e.target.value, "nickname", setRegInfo)
						}
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
								placeholder="captcha"
								value={regInfo.captcha}
								onChange={(e) =>
									updateUserInfo(regInfo, e.target.value, "captcha", setRegInfo)
								}
							/>
						</Col>
						<Col span={6}>
							<div
								className="cursor-pointer"
								onClick={fetchCaptcha}
								dangerouslySetInnerHTML={{ __html: captcha }}
							></div>
						</Col>
					</Row>
				</Form.Item>

				<Form.Item
					wrapperCol={{
						offset: 8,
						span: 16,
					}}
				>
					<Button type="primary" htmlType="submit" style={{ marginRight: 20 }}>
						Register
					</Button>
					<Button type="primary" htmlType="submit">
						Reset
					</Button>
				</Form.Item>
			</Form>
		);
	return (
		<Modal
			footer={null}
			title="Login / Register"
			open={props.openForm}
			onCancel={closeModal}
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
