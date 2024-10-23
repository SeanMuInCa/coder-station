import React, { useEffect, useState } from "react";
import { getInterviewApi, getInterviewInTypeApi } from "../api/interviews";
import PageHeader from "../components/PageHeader";
import { Pagination, Tabs } from "antd";
import InterviewCard from "../components/InterviewCard";
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
				setInterviewList(res.data);
        console.log(res.data);
        
				setPageInfo({
					current: res.data.currentPage,
					pageSize: res.data.eachPage,
					total: res.data.count,
				});
			}
      const temp = await getInterviewInTypeApi();
      console.log(temp,'type');
		};
		fetchData();
	}, [pageInfo.current, pageInfo.pageSize]);

	let list = interviewList.data?.map((item) => (
		<InterviewCard key={item._id} interview={item} />
	));
  let content1 = <>
  <div>
      {list?.length ? (
				list
			) : (
				<div className="text-center text-2xl text-gray-400 mx-auto">
					No book found
				</div>
			)}
      </div>
			<div>
				{
					<Pagination
						className="cursor-pointer"
						align="center"
						defaultCurrent={pageInfo.current}
						total={pageInfo.total}
						onChange={(currentPage, pageSize) =>
							setPageInfo({ ...pageInfo, current: currentPage, pageSize })
						}
					/>
				}
			</div>
  </>
  let content2 = 'abc'
	return (
		<div className="max-w-7xl mx-auto bg-slate-50">
			<div>
				<PageHeader hideCategory={true} title="Interviews List" />
        <Tabs
        className="ml-10"
        defaultActiveKey="1"
        size="large"
        items={new Array(2).fill(null).map((_, i) => {
          const id = String(i + 1);
          return {
            label: id==='1'?`All`:'By Type',
            key: id,
            children: id==='1'?content1:content2,
          };
        })}
        />
			</div>
		</div>
	);
};

export default Interviews;
