import React, { useEffect, useState } from 'react'
import { getTopTenUserApi } from '../api/user'
import { Card } from 'antd'
import RankItem from './RankItem'
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
        return <RankItem key= {item._id} user={item} index={index}/>
      })}
    </Card>
  )
}

export default TopTen