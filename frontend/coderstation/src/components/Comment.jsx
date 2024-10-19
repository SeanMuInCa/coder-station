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
import { getBookByIdApi } from "../api/book";

const Comment = (props) => {
    const {id} = useParams()
	const editorRef = useRef();
	const user = useSelector((state) => state.user);
    console.log(props);
    
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
            // temp obj avoid setState
            const updatedComment = {
                ...newComment,
                commentContent,
                userId: user.userInfo._id,
                commentType: props.commentType === 'issue' ? 1 : 2,
            };
    
            // 发送评论数据到 API
            const res = await addCommentApi(updatedComment);
            if(res.code === 0) {
                message.success("Comment successfully");
    
                // 清空编辑器
                editorRef.current.getInstance().setHTML('');
                
                
                props.fetchCommentList();
            }
        } else {
            message.error("Please input something");
        }
    };
    
	useEffect(() => {
        fetchData();
    }, []);
    const fetchData =  async () => {
        let res = null
        if(props.commentType === 'issue'){
            res = await getIssueApi(id)
            setNewComment({
                ...newComment,
                issueId:res?.data._id,
                typeId:res?.data.typeId
            })
        }else if(props.commentType === 'book'){
            res = await getBookByIdApi(id)
            
            setNewComment({
                ...newComment,
                bookId:res?.data._id,
                typeId:res?.data.typeId
            })
        }
    }
    let list = props.commentList.data?.map((item)=> <CommentCard key={item._id} commentInfo={item}/>)
    let showList = list?.slice((pageInfo.current - 1) * pageInfo.pageSize,pageInfo.current*pageInfo.pageSize)
	return (
		<div className=" ml-5 rounded-md p-5">
			{/* Comment detail */}
			<div className=" my-5">
				{props.commentList.length === 0 ? <div className="text-center">No comments</div> : showList}
                {list?.length >= pageInfo.pageSize && <Pagination className="my-5" align="center" defaultCurrent={pageInfo.current} total={list?.length} pageSize={pageInfo.pageSize} onChange={(currentPage)=>setPageInfo({...pageInfo,current:currentPage})}/>}
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
                    <Button type="primary" className="mt-5" onClick={handleClick}>Submit Comment</Button>
                    </>
                    
				) : (
					<Button type="primary" disabled>Please login to comment</Button>
				)}
			</div>
		</div>
	);
};

export default Comment;
