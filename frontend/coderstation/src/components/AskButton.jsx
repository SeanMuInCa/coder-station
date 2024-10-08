import React from 'react'
import { Button,message } from 'antd'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const AskButton = () => {
    const userInfo = useSelector(state => state.user)
    const navigate = useNavigate()
    const handleClick = ()=>{
        if(userInfo.isLogin){
            //router
        }else message.warning('Please login first')
    }
  return (
    <div className='mb-5'>
        <Button type='primary' className='w-full text-lg font-bold' size='large' onClick={handleClick}>I want to Ask...</Button>
    </div>
  )
}

export default AskButton