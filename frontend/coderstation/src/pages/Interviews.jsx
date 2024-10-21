import React, { useEffect, useState } from "react";
import { getInterviewApi } from "../api/interviews";
import PageHeader from "../components/PageHeader";
const Interviews = () => {
  const [pageInfo, setPageInfo] = useState({
		current: 1,
		pageSize: 10,
		total: 0,
	});
	const [interviewList, setInterviewList] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			const res = await getInterviewApi({
				current: pageInfo.current,
				pageSize: pageInfo.pageSize,
			});
			if (res.code === 0) {
        console.log(res);
        
				setInterviewList(res.data);
				setPageInfo({
					current: res.data.currentPage,
					pageSize: res.data.eachPage,
					total: res.data.count,
				});
			}
		};
		fetchData();
	}, [pageInfo.current, pageInfo.pageSize]);
  return (
    <div className="max-w-7xl mx-auto bg-slate-50">
      <div >
				<PageHeader hideCategory={true} title="Interviews List" />
			</div>
    </div>
  )
}

export default Interviews