import React, { useEffect,useRef } from 'react'
import { useSelector } from 'react-redux'
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/react-editor'
import { Button } from 'antd'
const Comment = (props) => {
    const editorRef = useRef();
    const user = useSelector(state => state.user)
    useEffect(()=>{
        
    },[])
  return (
    <div className=' ml-10 rounded-md p-5 mr-5 text-center'>
        {/* Comment detail */}
        <div>
        {props.commentList.length === 0 ? <div>No comments</div> : <div>1</div>}
        </div>
        {/* textarea */}
        <div>
        {user.isLogin ? <Editor
						previewStyle="vertical"
						height="300px"
						initialEditType="wysiwyg"
						useCommandShortcut={true}
						ref={editorRef}
					/> : <Button type='primary'>Please login to comment</Button>}
        </div>
    </div>
  )
}

export default Comment