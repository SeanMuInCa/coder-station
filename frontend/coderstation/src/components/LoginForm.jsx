import { useRef, useState } from "react";
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

const LoginForm = (props) => {
	const [formType, setFormType] = useState(1);
	const [captcha, setCaptcha] = useState(null);
	const [loginInfo, setLoginInfo] = useState({
		username: "",
		password: "",
		rememberMe: false,
		captcha: "",
	});
  const [regInfo, setRegInfo] = useState({
    username: '',
    captcha:'',
    nickname:''
  })
	const loginFormRef = useRef();
  const regFormRef = useRef();
	const updateUserInfo = (info, value, key, setInfo) => {
		info[key] = value;
		console.log(info);

		// setInfo(info);
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
						onChange={(e) => updateUserInfo(loginInfo, e.target.value, "username", setLoginInfo)}
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
						onChange={(e) => updateUserInfo(loginInfo, e.target.value, "password", setLoginInfo)}
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
          {/* 我没找到这里问题在哪 */}
					{/* <Row align="middle">
						<Col span={16}> */}
							<Input
              className="w-1/2"
								placeholder="captcha"
								value={loginInfo.captcha}
								onChange={(e) => updateUserInfo(loginInfo, e.target.value, "captcha", setLoginInfo)}
							/>
						{/* </Col>
						<Col span={6}>
							<div
							// onClick={captchaClickHandle}
							// dangerouslySetInnerHTML={{ __html: captcha }}
							></div>
						</Col>
					</Row> */}
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
				onFinish={confirmHandle}
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
						value={regInfo.username}
						onChange={(e) => updateUserInfo(regInfo, e.target.value, "username", setRegInfo)}
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
          {/* 我没找到这里问题在哪 */}
					{/* <Row align="middle">
						<Col span={16}> */}
							<Input
              className="w-1/2"
								placeholder="captcha"
								value={regInfo.captcha}
								onChange={(e) => updateUserInfo(regInfo, e.target.value, "captcha", setRegInfo)}
							/>
						{/* </Col>
						<Col span={6}>
							<div
							// onClick={captchaClickHandle}
							// dangerouslySetInnerHTML={{ __html: captcha }}
							></div>
						</Col>
					</Row> */}
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
