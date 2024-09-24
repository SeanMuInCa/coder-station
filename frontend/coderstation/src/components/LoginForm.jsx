import React from "react";
import { Flex, Modal, Radio } from "antd";

const LoginForm = (props) => {
	const confirmHandle = () => {
		// TODO: login or register logic
		props.closeForm();
	};

	return (
		<Modal
			title="Login / Register"
			open={props.openForm}
			onOk={confirmHandle}
			onCancel={props.closeForm}
		>
			<Flex vertical gap="middle">
				<Radio.Group
					block
					defaultValue="1"
					optionType="button"
					buttonStyle="solid"
				>
          <Radio.Button value="1" className="w-1/2">Login</Radio.Button>
          <Radio.Button value="2" className="w-1/2">Register</Radio.Button>
        </Radio.Group>
			</Flex>
		</Modal>
	);
};

export default LoginForm;
