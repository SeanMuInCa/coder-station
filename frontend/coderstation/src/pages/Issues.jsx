import React, { useEffect, useState } from 'react'
import PageHeader from '../components/PageHeader'
import { getIssueListApi } from '../api/issue'
const Issues = () => {
  const [issueList, setIssueList] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    current:1,
    pageSize:20,
    total: 0
  });
  useEffect(() => {
    getIssueList();
  }, []);
  const getIssueList = async () => {
    const res = await getIssueListApi()
    console.log(res)
    if(res.code === 0){
      const arr = res.data.data.filter(item=> item.issueStatus === true)
      setIssueList(arr)
    }
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