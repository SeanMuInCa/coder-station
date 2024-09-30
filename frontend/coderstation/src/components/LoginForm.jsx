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
import { getCaptcha, checkExists, register, login, getUserInfo } from "../api/user";
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
		console.log("clear reg info");

		setRegInfo({
			loginId: "",
			captcha: "",
			nickname: "",
		});
		console.log(regInfo.nickname);
		console.log(loginInfo);
	};
	const clearLoginInfo = () => {
		console.log("clear login info");

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

	const loginConfirmHandle = async() => {
		// login logic
		loginInfo.loginPwd = loginInfo.password;
		const res = await login(loginInfo);
		console.log(res);
		if(res.data){
			//wrong pwd, frozen account, normal
			const data = res.data
			if(!data.data){
				message.error("wrong account or password");
				fetchCaptcha();
			}else if (!data.data.enabled){
				message.error('your account is disabled')
				fetchCaptcha();
			}else{
				localStorage.userToken = data.token;
				const res = await getUserInfo(data.data._id);
				dispatch(initUserInfo(res.data));
				dispatch(updateLoginStatus(true));
				props.closeForm();
			}
		}else{
			message.error('wrong captcha');
			fetchCaptcha();
		}
	};
	const regConfirmHandle = async () => {
		//register logic
		console.log("reg confirm handle");
		const res = await register(regInfo);
		//failed
		if (res.code === 406) {
			message.error("wrong captcha");
			fetchCaptcha();
		} else {
			clearRegInfo();
			message.success("register success, default password is 123456");
			//save data to redux
			dispatch(initUserInfo(res.data));
			//change login status
			dispatch(updateLoginStatus(true));
			closeModal();
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
					<Row>
						<Col>
							<Input
								placeholder="Please input your username!"
								value={loginInfo.loginId}
								onChange={(e) => updateLoginInfo(loginInfo, e.target.value, "loginId")}
							/>
						</Col>
					</Row>
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
					<Row>
						<Col>
							<Input.Password
								placeholder="Please input your password!"
								value={loginInfo.password}
								onChange={(e) => updateLoginInfo(loginInfo, e.target.value, "password")}
							/>
						</Col>
					</Row>
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
					<Button type="primary" onClick={clearLoginInfo}>
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
					<Row>
						<Col>
							<Input
								placeholder="Please input your username!"
								value={regInfo.loginId}
								onChange={(e) => updateRegInfo(regInfo, e.target.value, "loginId")}
							/>
						</Col>
					</Row>
				</Form.Item>

				<Form.Item label="Nickname" name="nickname">
					<Row>
						<Col>
							<Input
								placeholder="Nickname by default is UserXXX"
								value={regInfo.nickname}
								onChange={(e) => updateRegInfo(regInfo, e.target.value, "nickname")}
							/>
						</Col>
					</Row>
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
					<Button type="primary" onClick={clearRegInfo}>
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
