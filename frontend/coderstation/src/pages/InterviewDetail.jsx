import React, { useEffect,useState } from "react";
import PageHeader from "../components/PageHeader";
import { Card } from "antd";
import { useParams } from "react-router-dom";
import { getInterviewByIdApi } from '../api/interviews'
const InterviewDetail = () => {
    const {id} = useParams();
    const [interviewInfo,setInterviewInfo] = useState({})
    useEffect(()=>{
        const fetchData = async()=>{
            const res = await getInterviewByIdApi(id);
            if(res.code === 0) setInterviewInfo(res.data)
        }
        fetchData()
    },[id])
	return (
		<div className="max-w-7xl mx-auto bg-slate-50">
			<PageHeader hideCategory={true} title="Interview Detail" />
			<Card className="" title={interviewInfo.interviewTitle}>
				<div
					className="overflow-x-hidden text-wrap break-normal whitespace-normal"
					dangerouslySetInnerHTML={{ __html: interviewInfo.interviewContent }}
				></div>
			</Card>
		</div>
	);
};

export default InterviewDetail;
