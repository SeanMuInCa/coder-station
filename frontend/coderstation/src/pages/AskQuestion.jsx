import React, { useEffect, useState } from "react";
import { Button, Card, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useSelector, useDispatch } from "react-redux";
import { getTypeList } from "../redux/typeSlice";
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/react-editor'
const AskQuestion = () => {
    const {userInfo} = useSelector((state) => state.user);
    const {type} = useSelector((state) => state.type);
    const dispatch = useDispatch();
    const [userId, setUserId] = useState("");
	const [question, setQuestion] = useState({
		issueTitle: "",
		issueContent: "",
		userId: userInfo._id || "",
		typeId: "",
	});
	useEffect(()=>{
        if(!type.length){
            // 派发 action 来发送请求，获取到数据填充到状态仓库
            dispatch(getTypeList());
        }
		if(userInfo){
			setUserId(userInfo._id);
		}
    },[])
	const handleClick = async() => {
        await setQuestion({
			...question,
			userId: userId,
		});
		console.log(question);
	};
	return (
		<Card className="max-w-7xl mx-auto bg-slate-50 pb-10">
			<Form onFinish={handleClick}>
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
					<Input
						placeholder="Ask a public question"
						value={question.issueTitle}
						onChange={(e) => setQuestion({ ...question, issueTitle: e.target.value })}
					/>
				</Form.Item>
				<Form.Item
					name={"type"}
					label="Question Type"
					rules={[
						{
							required: true,
						},
					]}
                    className="w-1/5"
				>
					<Select onChange={(value) => setQuestion({ ...question, typeId: value })}>
						{type.map((item)=>{
                            return <Select.Option key={item._id} value={item._id}>{item.typeName}</Select.Option>
                        })}
					</Select>
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
					{/* <TextArea
						showCount
						value={question.issueContent}
						maxLength={100}
						onChange={(e) =>
							setQuestion({ ...question, issueContent: e.target.value })
						}
						style={{
							height: 120,
							resize: "none",
						}}
					/> */}
					<Editor
						previewStyle="vertical"
						initialValue='type your question content here'
						height="600px"
						initialEditType="markdown"
						useCommandShortcut={true}
						hideModeSwitch={true}
					/>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Form>
		</Card>
	);
};

export default AskQuestion;
