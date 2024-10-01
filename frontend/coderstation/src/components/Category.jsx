import { Tag, Flex } from "antd";

import React from "react";

const Category = (props) => {
	return (
		<Flex
			gap="4px 0"
			wrap
			className="flex items-end justify-start my-auto cursor-pointer"
		>
			<Tag color="#f50">#f50</Tag>
			<Tag color="#2db7f5">#2db7f5</Tag>
			<Tag color="#87d068">#87d068</Tag>
			<Tag color="#108ee9">#108ee9</Tag>
		</Flex>
	);
};

export default Category;
