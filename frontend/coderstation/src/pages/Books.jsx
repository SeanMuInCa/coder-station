import React, { useEffect, useState } from "react";
import { getAllBookApi } from "../api/book";
import PageHeader from "../components/PageHeader";
import BookCard from "../components/BookCard";
import { Pagination } from "antd";
import { useSelector } from 'react-redux'
const Books = () => {
	const [pageInfo, setPageInfo] = useState({
		current: 1,
		pageSize: 10,
		total: 0,
	});
	const [bookList, setBookList] = useState([]);
	const search = useSelector(state => state.search);
	useEffect(() => {
		const fetchData = async () => {
			const res = await getAllBookApi({
				current: pageInfo.current,
				pageSize: pageInfo.pageSize,
			});
			if (res.code === 0) {
				setBookList(res.data);
				setPageInfo({
					current: res.data.currentPage,
					pageSize: res.data.eachPage,
					total: res.data.count,
				});
			}
		};
		fetchData();
	}, [pageInfo.current, pageInfo.pageSize]);
	// let list = bookList.data?.map((item) => (
	// 	<BookCard key={item._id} book={item} />
	// ));
	useEffect(() => {
		const filteredList = search.searchMode
		  ? bookList
			  .filter((item) => item.issueTitle.includes(search.SearchInfo?.keyWord)) // 根据关键词过滤
			  .map((item) => <BookCard info={item} key={item._id} />)
		  : bookList.map((item) => <BookCard info={item} key={item._id} />);
		
		  setBookList(filteredList);  // 设置新的列表
	  }, [search.searchMode, search.SearchInfo?.keyWord, issueList]); // 监听search.searchMode和关键词变化
	return (
		<>
			<div className="max-w-7xl mx-auto bg-slate-50">
				<PageHeader hideCategory={true} title="Book List" />
			</div>
			<div className="flex max-w-7xl mx-auto bg-slate-50 pb-10 justify-evenly flex-wrap">
				{bookList?.length ? (
					bookList
				) : (
					<div className="text-center text-2xl text-gray-400 mx-auto">
						No book found
					</div>
				)}
			</div>
			<div className="max-w-7xl mx-auto bg-slate-50">
				{
					<Pagination
						align="center"
						defaultCurrent={pageInfo.current}
						total={pageInfo.total}
						onChange={(currentPage) =>
							setPageInfo({ ...pageInfo, current: currentPage })
						}
					/>
				}
			</div>
		</>
	);
};

export default Books;
