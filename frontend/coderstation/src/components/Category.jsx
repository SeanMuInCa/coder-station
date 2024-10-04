import { Tag, Flex } from "antd";
import { useSelector } from "react-redux";
import React from "react";

const Category = (props) => {
    const  {type}  = useSelector((state) => state.type);
    console.log(type);
	return (
		<Flex
			gap="4px 0"
			wrap
			className="flex items-end justify-start my-auto cursor-pointer"
		>
			{type.map((item)=>{
                return <Tag color={item.color} key={item._id}>{item.typeName}</Tag>
            })}
		</Flex>
	);
};

export default Category;
