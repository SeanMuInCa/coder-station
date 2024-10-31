import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { getUserInfo } from '../api/user'; 
import PageHeader from '../components/PageHeader'
const Profile = () => {
  const {id} = useParams();
  const [user, setUser] = useState({})

  useEffect(()=>{
    const fetchData = async()=>{
      const res = await getUserInfo(id);
      console.log(res)
      setUser(res.data)
    }
    fetchData();
  },[id])
  return (
    <div className="max-w-7xl mx-auto bg-white pb-10">
      <PageHeader title='Profile Info' />
      <div className='flex'>
        <div className='w-1/5 p-5 border-r'>
          <img src={user.avatar} alt="" />
        </div>
        <div className='p-10 text-xl flex flex-col gap-5'>
          <div><span>User Nickname: </span>{user.nickname}</div>
          <div><span>User Points: </span>{user.points}</div>
          <div><span>Last Login Date: </span></div>
          <div><span>Register Date: </span></div>
        </div>
      </div>
    </div>
  )
}

export default Profile