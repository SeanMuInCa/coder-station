import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { getUserInfo } from '../api/user'; 
const Profile = () => {
  const {id} = useParams();
  const user = useSelector(state=>state.user);
  useEffect(()=>{
    const fetchData = async()=>{
      const res = await getUserInfo(id);
      console.log(res)
    }
    fetchData();
  },[id])
  console.log(id)
  return (
    <div className="max-w-7xl mx-auto bg-white pb-10">
      Profile
    </div>
  )
}

export default Profile