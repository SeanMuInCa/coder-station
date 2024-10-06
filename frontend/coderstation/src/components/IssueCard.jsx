import React, { useEffect, useState } from 'react';
import { Tag  } from 'antd';
import { getUserInfo } from '../api/user';
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { getTypeList } from '../redux/typeSlice';

const IssueCard = (props) => {
    const [nickname, setNickname] = useState('');
    const [type, setType] = useState({});
    const info = props.info;
    const typeInfo = useSelector(state=>state.type);
    const dispatch = useDispatch();
    const colors = ['#f50','#2db7f5','#87d068','#108ee9','#ff6600','#00cc66','#cc00cc','#ccff00','#ffcc00','#cc0000']
    useEffect(()=>{
        const getName = async ()=>{
            const res = await getUserInfo(info.userId);
            setNickname(res.data.nickname)
        }
        getName();
    },[info.userId]);

    useEffect(()=>{
        // setType(typeInfo.type.filter(item => item._id === info.typeId ))
        //todo: render types
        if(typeInfo.type.length){
            typeInfo.type.map(item => {
                if(item._id === info.typeId){
                    setType(item);
                }
            })
        }else{
            dispatch(getTypeList());
        }
    },[dispatch, typeInfo.type, info.typeId]);


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
                    <Tag color={colors[typeInfo.type.indexOf(type)]}>{type.typeName}</Tag>
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