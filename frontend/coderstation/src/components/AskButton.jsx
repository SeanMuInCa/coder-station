import React from 'react'
import { Button,message } from 'antd'
const AskButton = (props) => {
    const handleClick = ()=>{
        if(props.isLogin){
            //router
        }else message.warning('Please login first')
    }
  return (
    <div >
        <Button type='primary' className='w-full h-20 text-3xl' onClick={handleClick}>Ask Question</Button>
    </div>
  )
}

export default AskButton