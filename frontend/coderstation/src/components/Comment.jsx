import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { Button, message } from "antd";
import CommentCard from "./CommentCard";
import { useParams } from 'react-router-dom';
import { getIssueApi } from "../api/issue";
import { addCommentApi } from "../api/comment";
import { isEmptyHtml } from '../utils/tools'
console.log(isEmptyHtml('<p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p>'));
const Comment = (props) => {
    const {id} = useParams()
	const editorRef = useRef();
	const user = useSelector((state) => state.user);
    console.log(user);
    const [newComment, setNewComment]= useState({
        userId:'',
        typeId:'',
        commentContent:'',
        commentType:'',
        bookId:'',
        issueId:''
    })
    const handleClick = async () => {
        const commentContent = editorRef.current.getInstance().getHTML();
		if(!isEmptyHtml(commentContent)){
            setNewComment({
                ...newComment,
                commentContent,
                userId:user.userInfo._id,
                commentType:1,
            })
            // const res = await addCommentApi(newComment)
            // console.log(res);
            console.log(newComment);
            
        }else message.error("Please input something")
	};
	useEffect(() => {
        const fetchData =  async () => {
            const res = await getIssueApi(id)
            console.log(res);
            setNewComment({
                ...newComment,
                issueId:res.data._id,
                typeId:res.data.typeId
            })
        }
        fetchData();
    }, []);
	return (
		<div className=" ml-5 rounded-md p-5  text-center">
			{/* Comment detail */}
			<div className=" my-5">
				{props.commentList.length === 0 ? <div>No comments</div> : props.commentList.data?.map((item)=> <CommentCard key={item._id} commentInfo={item}/>)}
			</div>
			{/* textarea */}
			<div>
				{user.isLogin ? (
					<>
                    <Editor
						height="300px"
						initialEditType="wysiwyg"
						useCommandShortcut={true}
                        hideModeSwitch={true}
						ref={editorRef}
					/>
                    <Button type="primary" className="mt-5" onClick={handleClick}>Comment Submit</Button>
                    </>
                    
				) : (
					<Button type="primary" >Please login to comment</Button>
				)}
			</div>
            
		</div>
	);
};

export default Comment;
