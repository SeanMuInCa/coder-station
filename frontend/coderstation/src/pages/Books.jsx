import React, { useEffect, useState } from "react";
import { getAllBookApi } from "../api/book";
import PageHeader from "../components/PageHeader";
import BookCard from "../components/BookCard";
import { Pagination } from "antd";
const Books = () => {
	const [pageInfo, setPageInfo] = useState({
		current: 1,
		pageSize: 10,
		total: 0,
	});
	const [bookList, setBookList] = useState([]);
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
	let list = bookList.data?.map((item) => (
		<BookCard key={item._id} book={item} />
	));
	return (
		<>
			<div className="max-w-7xl mx-auto bg-slate-50">
				<PageHeader hideCategory={true} title="Book List" />
			</div>
			<div className="flex max-w-7xl mx-auto bg-slate-50 pb-10 justify-evenly flex-wrap">
				{list?.length ? (
					list
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
