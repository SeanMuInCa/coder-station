import React from "react";
import { Tag, Flex } from "antd";
const PageHeader = (props) => {
	return (
		<div className="flex py-10">
			<h1 className="text-4xl font-bold  flex-0.5 mx-10">{props.title}</h1>
			<div className="flex-1 flex items-center">
				<Flex gap="4px 0" wrap className="flex items-end justify-start my-auto cursor-pointer">
					<Tag color="#f50">#f50</Tag>
					<Tag color="#2db7f5">#2db7f5</Tag>
					<Tag color="#87d068">#87d068</Tag>
					<Tag color="#108ee9">#108ee9</Tag>
				</Flex>
			</div>
		</div>
	);
};

export default PageHeader;
