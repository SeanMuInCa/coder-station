import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getIssueApi } from '../api/issue';
import { getCommentsFromIssueApi } from '../api/comment';
import Recommendation from '../components/Recommendation';
import TopTen from '../components/TopTen';
import { useSelector } from 'react-redux';
const IssueDetail = () => {
    const {id} = useParams()
    const user = useSelector(state=>state.user)
    console.log(user);
    useEffect(()=>{
        const fetchData = async()=>{
            const res = await getIssueApi(id)
            console.log(res,'issue detail');
            if(res.data.commentNumber > 0){
              const res = await getCommentsFromIssueApi(id)
              console.log(res,'comment detail');
            }
        }
        fetchData();
    },[id])
  return (
    <div className='max-w-7xl mx-auto bg-slate-50 pb-10'>
      {/* body */}
      <div className='flex'>
        {/* left list */}
        <div className='max-w-5xl flex-1 p-10'>
          <h2>Issue Detail</h2>
          <div className='bg-yellow-300 mt-5'>
            <h2>title</h2>
            <h2>raina published at xxxx-xx-xx</h2>
          </div>
          <div className='bg-white rounded-lg shadow-lg p-5 mt-5'>
          </div>
        </div>
        {/* right side */}
        <div className='max-w-80 flex-1 mr-10 text-center'>
        <Recommendation />
        <TopTen />
        </div>
      </div>
    </div>
  )
}

export default IssueDetail