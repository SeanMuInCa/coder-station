import React from "react";
import { Card, Collapse } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const InterviewCard = (props) => {
	const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const handleClick = ()=>{
        navigate(props.interview._id)
    }
	let label = user.isLogin ? 'Check the answer' : 'Login to check the answer'
	return (
		<Card className="my-5" 
        title={props.interview.interviewTitle}
        extra={user.isLogin?<span className="text-blue-500 font-bold cursor-pointer" onClick={handleClick}>Open in New Tab</span>:<span>Open in New Tab</span>}
        >
			<Collapse
				size="large"
				collapsible={user.isLogin ? '' : "disabled"}
				items={[
					{
						key: "1",
						label,
						children: (
							<div
                                className="max-h-80 overflow-y-auto text-balance ..."
								dangerouslySetInnerHTML={{ __html: props.interview.interviewContent }}
							></div>
						),
					},
				]}
			/>
		</Card>
	);
};

export default InterviewCard;
