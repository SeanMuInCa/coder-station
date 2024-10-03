import React, { useEffect, useState } from 'react'
import { Tag  } from 'antd'
import { getUserInfo } from '../api/user'
import { useSelector } from 'react-redux'
import { format } from 'date-fns'
const IssueCard = (props) => {
    const [nickname, setNickname] = useState('');
    const [type, setType] = useState('');
    const info = props.info;
    const typeInfo = useSelector(state=>state.type);
    
    
    useEffect(()=>{
        const getName = async ()=>{
            const res = await getUserInfo(info.userId);
            // console.log(res);
            setNickname(res.data.nickname)
        }
        getName();
    },[info.userId])

    useEffect(()=>{
        // setType(typeInfo.type.filter(item => item._id === info.typeId ))
        //todo: render types
        typeInfo.type.map(item => {
            if(item._id === info.typeId){
                setType(item.typeName)
            }
        })
    },[info.typeId, typeInfo.type])
  return (
    <div className='mx-16 pt-5 pb-2 flex border-b-2'>
        <div className='flex-0.5 flex py-6 px-5 text-gray-400'>
            <div className='mr-16 flex flex-col justify-between'>
                <p className='text-center'>{info.commentNumber}</p>
                <p>Comments</p>
            </div>
            <div className='mr-16 flex flex-col justify-between'>
                <p className='text-center'>{info.scanNumber}</p>
                <p>Views</p>
            </div>
        </div>
        <div className='flex-1 pt-3 px-5'>
            <p className='text-black'>{info.issueTitle}</p>
            <div className='pb-2 mt-8 flex justify-between'>
                <div>
                    <Tag color="green">{type}</Tag>
                </div>
                <div>
                    <Tag color="blue">{nickname}</Tag>
                    <span>{format(new Date(parseFloat(info.issueDate)), 'yyyy-MM-dd')}</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default IssueCard