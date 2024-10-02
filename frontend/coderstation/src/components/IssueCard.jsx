import React from 'react'
import { Tag } from 'antd'
const IssueCard = (props) => {
    const info = props.info
  return (
    <div className='mx-16 py-5 flex border-b-2'>
        <div className='flex-0.5 flex p-5'>
            <div className='mr-16 flex flex-col justify-between'>
                <p className='text-center'>{info.commentNumber}</p>
                <p>Comments</p>
            </div>
            <div className='mr-16 flex flex-col justify-between'>
                <p className='text-center'>{info.scanNumber}</p>
                <p>Views</p>
            </div>
        </div>
        <div className='flex-1 pt-5 px-5'>
            <p>{info.issueTitle}</p>
            <div className='pb-2 mt-8 flex justify-between'>
                <div>
                    <Tag color="green">123</Tag>
                </div>
                <div>
                    <Tag color="blue">456</Tag>
                    <span>{info.issueDate}</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default IssueCard