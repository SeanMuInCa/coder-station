import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getUserInfo } from '../api/user'; 
import PageHeader from '../components/PageHeader'
import { format } from 'date-fns';
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
          <div><span>Last Login Date: </span>{format(new Date(parseFloat(user.lastLoginDate)), 'yyyy-MM-dd')}</div>
          <div><span>Register Date: </span>{format(new Date(parseFloat(user.registerDate)), 'yyyy-MM-dd')}</div>
        </div>
      </div>
    </div>
  )
}

export default Profile