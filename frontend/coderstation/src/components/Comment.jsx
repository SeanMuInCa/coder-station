import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { Button, message, Pagination } from "antd";
import CommentCard from "./CommentCard";
import { useParams } from 'react-router-dom';
import { getIssueApi } from "../api/issue";
import { addCommentApi } from "../api/comment";
import { isEmptyHtml } from '../utils/tools'

const Comment = (props) => {
    const {id} = useParams()
	const editorRef = useRef();
	const user = useSelector((state) => state.user);
    const [newComment, setNewComment]= useState({
        userId:'',
        typeId:'',
        commentContent:'',
        commentType:'',
        bookId:'',
        issueId:''
    })
    const [pageInfo, setPageInfo] = useState({
        current:1,//current page
        pageSize:3,// how many in one page
        // total: 0//total amount
      });
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
    let list = props.commentList.data?.map((item)=> <CommentCard key={item._id} commentInfo={item}/>)
    let showList = list?.slice((pageInfo.current - 1) * pageInfo.pageSize,pageInfo.current*pageInfo.pageSize)
	return (
		<div className=" ml-5 rounded-md p-5">
			{/* Comment detail */}
			<div className=" my-5">
				{props.commentList.length === 0 ? <div className="text-center">No comments</div> : showList}
                {list?.length >= pageInfo.pageSize && <Pagination align="center" defaultCurrent={pageInfo.current} total={list?.length} pageSize={pageInfo.pageSize} onChange={(currentPage)=>setPageInfo({...pageInfo,current:currentPage})}/>}
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
