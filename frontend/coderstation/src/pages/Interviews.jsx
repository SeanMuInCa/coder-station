import React, { useEffect, useState, useMemo } from "react";
import {
	getInterviewApi,
	getInterviewInTypeApi,
	getInterviewByIdApi,
} from "../api/interviews";
import PageHeader from "../components/PageHeader";
import { Pagination, Tabs, Tree, Card } from "antd";
import InterviewCard from "../components/InterviewCard";
import { useSelector, useDispatch } from "react-redux";
import { getTypeList } from "../redux/typeSlice";
import NoData from '../components/NoData'
const Interviews = () => {
	const [expandedKeys, setExpandedKeys] = useState([]);
	const [autoExpandParent, setAutoExpandParent] = useState(true);
	const { type } = useSelector((state) => state.type);
	const [listByType, setListByType] = useState([]);
	const dispatch = useDispatch();
	const [question, setQuestion] = useState(null);
	const onExpand = (newExpandedKeys) => {
		setExpandedKeys(newExpandedKeys);
		setAutoExpandParent(false);
	};
	const [pageInfo, setPageInfo] = useState({
		current: 1,
		pageSize: 10,
		total: 0,
	});
	const [interviewList, setInterviewList] = useState([]);

	// Fetch type list from Redux
	useEffect(() => {
		if (!type.length) {
			dispatch(getTypeList());
		}
	}, [dispatch, type.length]);

	// Fetch interview data and interviews in type
	useEffect(() => {
		const fetchData = async () => {
			const res = await getInterviewApi({
				current: pageInfo.current,
				pageSize: pageInfo.pageSize,
			});
			if (res.code === 0) {
				setInterviewList(res.data);
				setPageInfo({
					current: res.data.currentPage,
					pageSize: res.data.eachPage,
					total: res.data.count,
				});
			}

			// Ensure type data is loaded before making this API call
			if (type.length) {
				const temp = await getInterviewInTypeApi();
				let tempArr = [];
				for (let index = 0; index < temp.data.length; index++) {
					let tempObj = {
						title: type[index]?.typeName,
						key: index,
						children:
							temp.data[index].length > 0
								? temp.data[index].map((item) => {
										return {
											title: item.interviewTitle,
											key: item._id,
										};
								}) : [],
					};
					tempArr.push(tempObj);
				}
				setListByType(tempArr);
			}
		};
		fetchData();
	}, [pageInfo.current, pageInfo.pageSize, type]);

	// Memoize tree data based on listByType
	const treeData = useMemo(() => {
		const loop = (data) =>
			data.map((item) => {
				if (item.children) {
					return {
						title: item.title,
						key: item.key,
						children: loop(item.children),
					};
				}
				return {
					title: item.title,
					key: item.key,
				};
			});
		return loop(listByType);
	}, [listByType]); // Added listByType as dependency

	let list = interviewList.data?.map((item) => (
		<InterviewCard key={item._id} interview={item} />
	));

	let content1 = (
		<>
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
	);

	const onCheck = async (selectedKeys) => { 
		if (typeof selectedKeys[0] === "string") {
			const res = await getInterviewByIdApi(selectedKeys[0]);
			if (res.code === 0) {
				setQuestion(res.data);
			}
		}
	};

	let content2 = (
		<div className="flex">
			<Tree
				className="text-xl w-1/3 h-lvh overflow-y-auto"
				onExpand={onExpand}
				expandedKeys={expandedKeys}
				autoExpandParent={autoExpandParent}
				treeData={treeData} // Using the memoized treeData
				onSelect={onCheck}
			/>
			<div className="w-2/3 h-lvh overflow-y-auto">
      {question !== null ? <Card className="" title={question.interviewTitle}>
				<div
					className=" overflow-y-auto text-balance ..."
					dangerouslySetInnerHTML={{ __html: question.interviewContent }}
				></div>
			</Card> : <NoData />}
      </div>
		</div>
	);

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
							label: id === "1" ? `All` : "By Type",
							key: id,
							children: id === "1" ? content1 : content2,
						};
					})}
				/>
			</div>
		</div>
	);
};

export default Interviews;
