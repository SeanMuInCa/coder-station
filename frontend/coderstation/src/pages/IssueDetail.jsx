import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getIssueApi } from '../api/issue';

const IssueDetail = () => {
    const {id} = useParams()
    useEffect(()=>{
        const fetchData = async()=>{
            const res = await getIssueApi(id)
            console.log(res);
        }
        fetchData();
    },[id])
  return (
    <div>IssueDetail</div>
  )
}

export default IssueDetail