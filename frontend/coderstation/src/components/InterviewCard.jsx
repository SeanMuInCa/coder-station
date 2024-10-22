import React from "react";
import { Card, Collapse } from "antd";

const InterviewCard = (props) => {
	return (
		<Card className="my-5" title={props.interview.interviewTitle}>
			<Collapse
				size="large"
				items={[
					{
						key: "1",
						label: "Check the answer",
						children: (
							<div
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
