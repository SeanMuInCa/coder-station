import React, { useEffect, useState } from 'react'
import PageHeader from '../components/PageHeader'
import { getIssueListApi } from '../api/issue'
const Issues = () => {
  const [issueList, setIssueList] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    current:1,
    pageSize:10,
    total: 0
  });
  useEffect(() => {
    getIssueList();
  }, [pageInfo.current, pageInfo.pageSize]);
  const getIssueList = async () => {
    const res = await getIssueListApi({
      current: pageInfo.current,
      pageSize: pageInfo.pageSize,
      issueStatus: true
    })
    console.log(res)
    setIssueList(res.data.data);
    setPageInfo({
      current: res.data.current,
      pageSize: res.data.pageSize,
      total: res.data.total
    })
    // if(res.code === 0){
    //   const arr = res.data.data.filter(item=> item.issueStatus === true)
    //   setIssueList(arr)
    // }
  };
  return (
    <div className='max-w-7xl mx-auto bg-slate-50'>
      <PageHeader title="Issue List" />
      {/* body */}
      <div>
        {/* left list */}
        <div></div>
        {/* right side */}
        <div></div>
      </div>
    </div>
    
  )
}

export default Issues