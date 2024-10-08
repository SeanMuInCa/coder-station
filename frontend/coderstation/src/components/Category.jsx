import { Tag, Flex } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { deepCopy } from "../utils/tools";
import { getIssueListApi } from "../api/issue";
const Category = (props) => {
	const { type } = useSelector((state) => state.type);
	const tagList = [{ typeName: "All" }, ...type];
	const colors = [
		"#FF5733",
		"#33FF57",
		"#3357FF",
		"#FF33A8",
		"#A833FF",
		"#33FFF1",
		"#FF8C33",
		"#33FF8C",
		"#8C33FF",
		"#FF3357",
		"#33A8FF",
		"#A8FF33",
		"#FFC733",
		"#33FFC7",
		"#5733FF",
		"#FF5733",
		"#C733FF",
		"#33FF57",
		"#FFD633",
		"#33FFB8",
		"#5733FF",
		"#FF3366",
		"#33B8FF",
		"#A8FF33",
		"#FFA833",
		"#33FF66",
		"#8CFF33",
		"#FF33C7",
		"#33FFCC",
		"#B833FF",
	];
	const [tempList, setTempList] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			const res = await getIssueListApi();
			setTempList(res.data);
		};
		fetchData();
	}, []);
	const handleClick = (tagName) => {
		if (tagName.typeName === "All") {
			props.backToPage();
		} else {
			const temp = tempList.data.filter((item) => item.typeId === tagName._id);
			console.log(temp);
			props.setIssueList(temp);
		}
	};
	return (
		<Flex
			gap="4px 0"
			wrap
			className="flex items-end justify-start my-auto cursor-pointer"
		>
			{tagList.map((item, index) => {
				return (
					<Tag
						color={colors[type.indexOf(item)]}
						key={index}
						onClick={() => handleClick(item)}
					>
						{item.typeName}
					</Tag>
				);
			})}
		</Flex>
	);
};

export default Category;
