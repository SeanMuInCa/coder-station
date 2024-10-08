import React, { useEffect, useState } from 'react';
import { Tag  } from 'antd';
import { getUserInfo } from '../api/user';
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { getTypeList } from '../redux/typeSlice';
import { getIssueApi } from '../api/issue';
const IssueCard = (props) => {
    const [nickname, setNickname] = useState('');
    const [type, setType] = useState({});
    const info = props.info;
    const typeInfo = useSelector(state=>state.type);
    const dispatch = useDispatch();
    // 30 colors as an array
    const colors = [
        "#FF5733", "#33FF57", "#3357FF", "#FF33A8", "#A833FF", "#33FFF1",
        "#FF8C33", "#33FF8C", "#8C33FF", "#FF3357", "#33A8FF", "#A8FF33",
        "#FFC733", "#33FFC7", "#5733FF", "#FF5733", "#C733FF", "#33FF57",
        "#FFD633", "#33FFB8", "#5733FF", "#FF3366", "#33B8FF", "#A8FF33",
        "#FFA833", "#33FF66", "#8CFF33", "#FF33C7", "#33FFCC", "#B833FF"
      ];
      
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
    
    const handleIssue = async(issue)=>{
        console.log(issue);
        const res = await getIssueApi(issue._id)
        console.log(res);
        
    }

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
        <div className='flex-1 pt-3 px-5 cursor-pointer' onClick={()=>handleIssue(info)}>
            <p className='text-black '>{info.issueTitle}</p>
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