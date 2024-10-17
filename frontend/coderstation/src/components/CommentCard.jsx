import React from 'react'
import { Card } from 'antd'
const CommentCard = (props) => {
  return (
    <Card>
        <p className='text-left' dangerouslySetInnerHTML={{ __html: props.commentInfo.commentContent }} />
    </Card>
  )
}

export default CommentCard