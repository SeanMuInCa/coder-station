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
	message,
} from "antd";
import { getCaptcha, checkExists, register } from "../api/user";
import { useDispatch } from "react-redux";
import { initUserInfo, updateLoginStatus } from "../redux/userSlice";

// TODO: the loginid share in login and register
const LoginForm = (props) => {
	const [formType, setFormType] = useState(1);
	const [captcha, setCaptcha] = useState(null);
	const dispatch = useDispatch();
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
		console.log('clear reg info');
		
		setRegInfo({
			loginId: "",
			captcha: "",
			nickname: "",
		});
		console.log(regInfo.nickname);
		console.log(loginInfo);
	};
	const clearLoginInfo = () => {
		console.log('clear login info');

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
	const updateLoginInfo = (info, value, key) => {
		setLoginInfo({
			...info,
			[key]: value,
		});
	};
	const updateRegInfo = (info, value, key) => {
		setRegInfo({
			...info,
			[key]: value,
		});
	};
	const loginConfirmHandle = () => {
		// TODO: login or register logic
		console.log("login confirm handle");

		props.closeForm();
	};
	const regConfirmHandle = async () => {
		console.log("reg confirm handle");
		console.log(regInfo, "regInfo");
		console.log(loginInfo, "loginInfo");

		const res = await register(regInfo);
		//failed
		if (res.code === 406) {
			message.error("wrong captcha");
			fetchCaptcha();
		} else {
			props.closeForm();
			clearRegInfo();
			message.success("register success, default password is 123456");
			//save data to redux
			dispatch(initUserInfo(res.data));
			//change login status
			dispatch(updateLoginStatus(true));
		}
	};
	const changeType = (e) => {
		fetchCaptcha();
		setFormType(e.target.value);
	};

	const checkExistingUsername = async () => {
		if (regInfo.loginId) {
			const res = await checkExists(regInfo.loginId);
			//true means existing
			return res.data && Promise.reject("username already exists");
		}
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
						onChange={(e) => updateLoginInfo(loginInfo, e.target.value, "loginId")}
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
						onChange={(e) => updateLoginInfo(loginInfo, e.target.value, "password")}
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
								onChange={(e) => updateLoginInfo(loginInfo, e.target.value, "captcha")}
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
							updateLoginInfo(loginInfo, e.target.checked, "rememberMe")
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
					// how???
					name="regId"
					rules={[
						{
							required: true,
							message: "Please input your username!",
						},
						{ validator: checkExistingUsername },
					]}
					validateTrigger="onBlur"
				>
					<Input
						placeholder="Please input your username!"
						value={regInfo.loginId}
						onChange={(e) => updateRegInfo(regInfo, e.target.value, "loginId")}
					/>
				</Form.Item>

				<Form.Item label="Nickname" name="nickname">
					<Input
						placeholder="Nickname by default is UserXXX"
						value={regInfo.nickname}
						onChange={(e) => updateRegInfo(regInfo, e.target.value, "nickname")}
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
								onChange={(e) => updateRegInfo(regInfo, e.target.value, "captcha")}
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
