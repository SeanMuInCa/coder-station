import React, { useState } from "react";
import { Card, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
const AskQuestion = () => {
    const [question, setQuestion] = useState({
        issueTitle: "",
        issueContent: "",
        userId:'',
        typeId:''
    })
	return (
		<Card className="max-w-7xl mx-auto bg-slate-50 pb-10">
			<Form>
				<Form.Item
					name={"title"}
					label="Question Title"
					rules={[
						{
							required: true,
							message: "Please input your title!",
						},
					]}
				>
					<Input placeholder="Ask a public question" value={question.issueTitle}/>
				</Form.Item>
				<Form.Item
					name={"content"}
					label="Question Content"
					rules={[
						{
							required: true,
							message: "Please input your content!",
						},
					]}
				>
					<TextArea
						showCount
                        value={question.issueContent}
						maxLength={100}
						//   onChange={onChange}
						style={{
							height: 120,
							resize: "none",
						}}
					/>
				</Form.Item>
			</Form>
		</Card>
	);
};

export default AskQuestion;
