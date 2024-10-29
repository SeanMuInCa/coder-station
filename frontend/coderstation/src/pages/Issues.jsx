import React, { useEffect, useState } from 'react'
import PageHeader from '../components/PageHeader'
import { getIssueListApi } from '../api/issue'
import IssueCard from '../components/IssueCard'
import { Pagination  } from 'antd'
import AskButton from '../components/AskButton'
import Recommendation from '../components/Recommendation'
import TopTen from '../components/TopTen'
import { useSelector } from 'react-redux'
import Category from '../components/Category'

const Issues = (props) => {
  const [issueList, setIssueList] = useState([]);
  const [list, setList] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    current:1,//current page
    pageSize:10,// how many in one page
    total: 0//total amount
  });
  const search = useSelector(state => state.search);
  console.log(search);
  
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

  
  useEffect(() => {
    const filteredList = search.searchMode
      ? issueList
          .filter((item) => item.issueTitle.includes(search.SearchInfo?.keyWord)) // 根据关键词过滤
          .map((item) => <IssueCard info={item} key={item._id} />)
      : issueList.map((item) => <IssueCard info={item} key={item._id} />);
    
    setList(filteredList);  // 设置新的列表
  }, [search.searchMode, search.SearchInfo?.keyWord, issueList]); // 监听search.searchMode和关键词变化
  
  // let list = search.searchMode ? issueList.filter(item => item.issueTitle.includes(search.SearchInfo?.keyWord).map(item => (
  //   <IssueCard info={item} key={item._id}/>
  // ))
  // ):issueList.map(item => (
  //   <IssueCard info={item} key={item._id}/>
  // ))
  // let list = search.searchMode 
  // ? issueList
  //     .filter(item => item.issueTitle.includes(search.SearchInfo?.keyWord))  // 过滤符合条件的项
  //     .map(item => (
  //       <IssueCard info={item} key={item._id} />  // 映射出组件
  //     ))
  // : issueList.map(item => (
  //     <IssueCard info={item} key={item._id} />  // 没有过滤时直接映射
  // ));

  return (
    <div className='max-w-7xl mx-auto bg-slate-50 pb-10'>
      <PageHeader title="Issue List" >
        <Category setIssueList={setIssueList} backToPage={getIssueList}/>
      </PageHeader>
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