import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookByIdApi } from "../api/book";
import PageHeader from "../components/PageHeader";
import { Image } from "antd";
const BookDetail = () => {
	const { id } = useParams();
	const [bookInfo, setBookInfo] = useState({});
	useEffect(() => {
		const fetchData = async () => {
			const res = await getBookByIdApi(id);
			if (res.code === 0) {
				setBookInfo(res.data);
			}
		};
		fetchData();
	}, []);
	return (
		<div className="max-w-7xl mx-auto bg-slate-50 pb-10">
			<PageHeader title="Book Detail" hideCategory={true} />
			<div className="flex p-2 mx-5">
				{/* left */}
				<Image width={400} src={bookInfo.bookPic} />
				{/* right */}
				<div></div>
			</div>
		</div>
	);
};

export default BookDetail;
