import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getIssueApi, updateIssueApi } from '../api/issue';
import { getCommentsFromIssueApi } from '../api/comment';
import Recommendation from '../components/Recommendation';
import TopTen from '../components/TopTen';
import { useSelector } from 'react-redux';
import { Avatar, Card } from 'antd';
import { format } from 'date-fns';
import { getUserInfo } from '../api/user';
import PageHeader from '../components/PageHeader';
import Comment from '../components/Comment';
import { useDispatch } from 'react-redux';
import { initSearchMode } from '../redux/searchSlice'
const IssueDetail = () => {
    const {id} = useParams()
    const user = useSelector(state=>state.user);
    const [publisher, setPublisher] = useState({})
    const [commentList, setCommentList] = useState([]);
    const dispatch = useDispatch();
    const [issue, setIssue] = useState({
      commentNumber: 0,
      issueTitle: "",
      issueContent: "",
      issueDate: "",
    });
    useEffect(()=>{
        const fetchData = async()=>{
            const res = await getIssueApi(id)
            const resPublisher = await getUserInfo(res.data.userId)
            
            setPublisher(resPublisher.data)
            
            setIssue(res.data)
            if(res.data.commentNumber > 0){
              await fetchCommentList()
            }
            updateIssueApi(id, {
              scanNumber: res.data.scanNumber + 1
            })
        }
        fetchData();
        dispatch(initSearchMode(false))
    },[id])
    const fetchCommentList = async ()=>{
      const commentRes = await getCommentsFromIssueApi(id);
            if (commentRes.code === 0) {
              setCommentList(commentRes.data);
            }
    }
    let content = issue.issueContent
  return (
    <div className='max-w-7xl mx-auto bg-slate-50 pb-10'>
      {/* body */}
      <div className='flex'>
        {/* left list */}
        {issue.issueDate && <div className='max-w-5xl flex-1 '>
          <PageHeader title='Issue Detail' hideCategory={true} />
          <Card className=' mt-5 ml-10 mr-5' >
            <div className='text-2xl text-black font-bold p-2 my-2'>{issue.issueTitle}</div>
            <div className='flex justify-around w-2/3 items-center text-lg'>
              <Avatar size='small' src={publisher.avatar} />
              <p>{publisher.nickname}</p>
              <p>Published at : </p>
              <p>{format(new Date(parseFloat(issue.issueDate)), 'yyyy-MM-dd hh:mm:ss EEEE')}</p>
            </div>
          </Card>
          <Card className='ml-10 mt-1 mr-5'>
            {<div dangerouslySetInnerHTML={{ __html: content }} />}
          </Card>
          <Comment commentList={commentList} commentType='issue' fetchCommentList={fetchCommentList} info={issue}/>
        </div>}
        {/* right side */}
        <div className='max-w-80 flex-1 mr-10 text-center mt-10'>
        <Recommendation />
        <TopTen />
        </div>
      </div>
    </div>
  )
}

export default IssueDetail