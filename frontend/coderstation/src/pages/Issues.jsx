import React, { useEffect, useState } from 'react'
import PageHeader from '../components/PageHeader'
import { getIssueListApi } from '../api/issue'
const Issues = () => {
  const [issueList, setIssueList] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    current:1,//current page
    pageSize:10,// how many in one page
    total: 0//total amount
  });
  useEffect(() => {
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
    getIssueList();
  }, [pageInfo.current, pageInfo.pageSize]);
  
  let list = issueList.map(item => (
    <div key={item._id}>
      {item.title}
    </div>
  ))
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