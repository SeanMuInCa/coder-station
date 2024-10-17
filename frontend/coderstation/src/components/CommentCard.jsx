import React, { useEffect, useState } from 'react'
import { Card, Avatar } from 'antd'
import { getUserInfo } from '../api/user'
import { format } from 'date-fns';

const CommentCard = (props) => {
    const [publisher, setPublisher] = useState({})
    
    useEffect(() => {
        const fetchData = async () => {
            const res = await getUserInfo(props.commentInfo.userId)
            if(res.code === 0) setPublisher(res.data)
        }
        if(props.commentInfo){
            fetchData()
        }
    }, [])
  return (
    <Card>
        <p className='text-left' dangerouslySetInnerHTML={{ __html: props.commentInfo.commentContent }} />
        <Avatar src={publisher.avatar} />
        <p>{publisher.nickname}</p>
        <p>{format(new Date(parseFloat(props.commentInfo.commentDate)), 'yyyy-MM-dd EEEE')}</p>
    </Card>
  )
}

export default CommentCard