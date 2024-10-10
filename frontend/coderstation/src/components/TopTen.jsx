import React, { useEffect, useState } from 'react'
import { getTopTenUserApi } from '../api/user'
import { Card } from 'antd'
const TopTen = () => {
    const [topTen, setTopTen] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        const res = await getTopTenUserApi();
        setTopTen(res.data)
      };
      fetchData();
    }, [])
  return (
    <Card
        title="Top 10 Users"
    >
      {topTen.map((item, index) =>{
        return <div key={item._id} className='flex justify-between items-center my-2'>
            <p className='px-5'>{index+1}</p>
            <p className='w-10 h-10'><img src={item.avatar} alt="" /></p>
            <p className='text-left flex-1 px-5'>{item.nickname}</p>
            <p>{item.points}</p>
        </div>
      })}
    </Card>
  )
}

export default TopTen