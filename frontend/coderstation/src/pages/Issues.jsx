import React, { useEffect, useState } from 'react'
import PageHeader from '../components/PageHeader'
import { getIssueListApi } from '../api/issue'
import IssueCard from '../components/IssueCard'
import { Pagination  } from 'antd'

const Issues = () => {
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
    console.log(res,'res')
    setIssueList(res.data.data);
    setPageInfo({
      current: res.data.currentPage,
      pageSize: res.data.eachPage,
      total: res.data.count
    })
    // if(res.code === 0){
    //   const arr = res.data.data.filter(item=> item.issueStatus === true)
    //   setIssueList(arr)
    // }
  };
  useEffect(() => {
    
    getIssueList();
  }, [ pageInfo.pageSize, pageInfo.current])
  
  let list = issueList.map(item => (
    <IssueCard info={item} key={item._id}/>
  ))
  return (
    <div className='max-w-7xl mx-auto bg-slate-50'>
      <PageHeader title="Issue List" />
      {/* body */}
      <div>
        {/* left list */}
        <div>
          {list}
          <Pagination align="center" defaultCurrent={pageInfo.current} total={pageInfo.total} onChange={(currentPage)=>setPageInfo({...pageInfo,current:currentPage})}/>
        </div>
        {/* right side */}
        <div></div>
      </div>
    </div>
    
  )
}

export default Issues