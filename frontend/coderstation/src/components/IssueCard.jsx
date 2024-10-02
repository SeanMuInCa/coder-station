import React from 'react'
import { Tag } from 'antd'
const IssueCard = (props) => {
    
  return (
    <div className='mx-16 py-5 flex'>
        <div className='bg-yellow-300 flex-0.5 flex p-10'>
            <div className='mr-20'>
                <p className='text-center'>{props.info.commentNumber}</p>
                <p>Comments</p>
            </div>
            <div>
                <p className='text-center'>{props.info.scanNumber}</p>
                <p>Views</p>
            </div>
        </div>
        <div className='bg-blue-400 flex-1 pt-10 px-5'>
            <p>{props.info.issueTitle}</p>
            <div className='pb-2 mt-8 flex justify-between'>
                <div>
                    <Tag color="green">123</Tag>
                </div>
                <div>
                    <Tag color="blue">456</Tag>
                    <span>{props.info.issueDate}</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default IssueCard