import React from 'react'

const RankItem = (props) => {
  return (
    <div key={props.user._id} className='flex justify-between items-center my-2'>
            <p className='px-5'>{props.index+1}</p>
            <p className='w-10 h-10'><img src={props.user.avatar} alt="" /></p>
            <p className='text-left flex-1 px-5'>{props.user.nickname}</p>
            <p>{props.user.points}</p>
        </div>
  )
}

export default RankItem