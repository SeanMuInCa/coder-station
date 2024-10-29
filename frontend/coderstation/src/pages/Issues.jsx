import React, { useEffect, useState } from 'react'
import PageHeader from '../components/PageHeader'
import { getIssueListApi } from '../api/issue'
import IssueCard from '../components/IssueCard'
import { Pagination  } from 'antd'
import AskButton from '../components/AskButton'
import Recommendation from '../components/Recommendation'
import TopTen from '../components/TopTen'


const Issues = (props) => {
  console.log(props);
  const [issueList, setIssueList] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    current:1,//current page
    pageSize:10,// how many in one page
    total: 0//total amount
  });
  
  const getIssueList = async () => {
    const res = await getIssueListApi({
      current: pageInfo.current,
      pageSize: pageInfo.pageSize,
      issueStatus: true
    })
    
    setIssueList(res.data.data);
    setPageInfo({
      current: res.data.currentPage,
      pageSize: res.data.eachPage,
      total: res.data.count
    })
  };
  useEffect(() => {
    getIssueList();
  }, [pageInfo.pageSize, pageInfo.current, props.keyWord])
  
  let list = issueList.map(item => (
    <IssueCard info={item} key={item._id}/>
  ))
  return (
    <div className='max-w-7xl mx-auto bg-slate-50 pb-10'>
      <PageHeader title="Issue List" setIssueList={setIssueList} backToPage={getIssueList}/>
      {/* body */}
      <div className='flex'>
        {/* left list */}
        <div className='max-w-5xl flex-1'>
          {list.length ? list : <div className='text-center text-2xl text-gray-400 mx-auto'>No issue found</div>}
          {list.length >= pageInfo.pageSize && <Pagination align="center" defaultCurrent={pageInfo.current} total={pageInfo.total} onChange={(currentPage)=>setPageInfo({...pageInfo,current:currentPage})}/>}
        </div>
        {/* right side */}
        <div className='max-w-80 flex-1 mr-10 text-center'>
        <AskButton />
        <Recommendation />
        <TopTen />
        </div>
      </div>
    </div>
    
  )
}

export default Issues