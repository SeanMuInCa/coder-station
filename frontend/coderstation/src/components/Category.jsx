import { Tag, Flex } from "antd";
import { useSelector } from "react-redux";

const Category = () => {
    const  {type}  = useSelector((state) => state.type);
    const list = [{typeName:'All'},...type]
    const colors =  ['#f50','#2db7f5','#87d068','#108ee9','#ff6600','#00cc66','#cc00cc','#ccff00','#ffcc00','#cc0000']
	return (
		<Flex
			gap="4px 0"
			wrap
			className="flex items-end justify-start my-auto cursor-pointer"
		>
			{list.map((item,index)=>{
                return <Tag color={colors[type.indexOf(item)]} key={index}>{item.typeName}</Tag>
            })}
		</Flex>
	);
};

export default Category;
