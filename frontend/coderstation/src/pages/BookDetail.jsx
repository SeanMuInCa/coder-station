import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookByIdApi } from "../api/book";
import PageHeader from "../components/PageHeader";
import { Image, Button } from "antd";
import { useSelector } from "react-redux";
const BookDetail = () => {
	const { id } = useParams();
	const [bookInfo, setBookInfo] = useState({});
	const user = useSelector((state) => state.user);
	useEffect(() => {
		const fetchData = async () => {
			const res = await getBookByIdApi(id);
			if (res.code === 0) {
        console.log(res.data);
        
				setBookInfo(res.data);
			}
		};
		fetchData();
	}, []);
	return (
		<div className="max-w-7xl mx-auto bg-white pb-10">
			<PageHeader title="Book Detail" hideCategory={true} />
			<div className="flex p-2 mx-5">
				{/* left */}
				<div className="flex flex-col items-center">
					<Image width={400} className="flex-1" src={bookInfo.bookPic} />
					{user.isLogin && <a href={bookInfo.downloadLink} target="_blank" rel="noreferrer"><Button type="primary" className="mt-5">Free Download</Button></a>}
				</div>
				{/* right */}
				<div className="flex-1 ml-5">
					<h1 className="text-center text-3xl font-bold mb-5">
						{bookInfo.bookTitle}
					</h1>
					<div dangerouslySetInnerHTML={{ __html: bookInfo.bookIntro }}></div>
				</div>
			</div>
		</div>
	);
};

export default BookDetail;
