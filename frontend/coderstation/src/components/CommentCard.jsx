import React, { useEffect, useState } from "react";
import { Card, Avatar } from "antd";
import { getUserInfo } from "../api/user";
import { format } from "date-fns";

const CommentCard = (props) => {
	const [publisher, setPublisher] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			const res = await getUserInfo(props.commentInfo.userId);
			if (res.code === 0) setPublisher(res.data);
		};
		if (props.commentInfo) {
			fetchData();
		}
	}, []);
	return (
		<Card>
			<Avatar src={publisher.avatar} className="mr-2" />
			<span className="text-gray-400">
				{format(
					new Date(parseFloat(props.commentInfo.commentDate)),
					"yyyy-MM-dd hh:mm:ss"
				)}
			</span>
			<p className="ml-10 text-gray-400 mb-8">{publisher.nickname}</p>

			<p
				className="text-left px-5"
				dangerouslySetInnerHTML={{ __html: props.commentInfo.commentContent }}
			/>
		</Card>
	);
};

export default CommentCard;
