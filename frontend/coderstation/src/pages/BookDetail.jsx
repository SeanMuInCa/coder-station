import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookByIdApi } from "../api/book";
import PageHeader from "../components/PageHeader";
import { Image, Button, message, Popconfirm } from "antd";
import { useSelector } from "react-redux";
import { getCommentsFromBookApi } from "../api/comment";
import Comment from "../components/Comment";
import { updateBookApi } from "../api/book";
import { getUserInfo, updateUserInfoApi } from "../api/user";

const BookDetail = () => {
	const { id } = useParams();
	const [bookInfo, setBookInfo] = useState({});
	const [commentList, setCommentList] = useState([]);
	const user = useSelector((state) => state.user);

	useEffect(() => {
		const fetchData = async () => {
			const res = await getBookByIdApi(id);
			if (res.code === 0) {
				setBookInfo(res.data);

				// 使用 res.data.commentNumber 直接判断，而不是 bookInfo
				if (res.data.commentNumber > 0) {
					await fetchCommentList();
				}
				updateBookApi(id, {
					scanNumber: res.data.scanNumber + 1,
				});
			}
		};

		fetchData();
	}, [id]); // Ensure 'id' is in the dependency array
	const fetchCommentList = async () => {
		const commentRes = await getCommentsFromBookApi(id);
		if (commentRes.code === 0) {
			setCommentList(commentRes.data);
		}
	};
	const handleDownload = async () => {
		const res = await getUserInfo(user.userInfo._id);
		if (res.data.points >= bookInfo.requirePoints) {
			const res1 = await updateUserInfoApi(res.data._id, {
				points: res.data.points - bookInfo.requirePoints,
			});
			if (res1.code === 0) window.open(bookInfo.downloadLink, "_blank");
		}else{
      message.error('you do not have enough points');
    }
	};
	return (
		<div className="max-w-7xl mx-auto bg-white pb-10">
			<PageHeader title="Book Detail" hideCategory={true} />
			<div className="flex p-2 mx-5">
				{/* left */}
				<div className="flex flex-col items-center">
					<Image width={400} className="flex-1" src={bookInfo.bookPic} />
					{user.isLogin && (
						<div className="text-center">
							<p className="mt-5">Spend {bookInfo.requirePoints} Points To</p>
							<Popconfirm
								title="Download Confirmation"
								description="Are you sure to spend your points for this book?"
								onConfirm={handleDownload}
								okText="Yes"
								cancelText="No"
							>
								<Button type="primary" className="mt-2">
									Download
								</Button>
							</Popconfirm>
						</div>
					)}
				</div>
				{/* right */}
				<div className="flex-1 ml-5">
					<h1 className="text-center text-3xl font-bold mb-5">
						{bookInfo.bookTitle}
					</h1>
					<div dangerouslySetInnerHTML={{ __html: bookInfo.bookIntro }}></div>
				</div>
			</div>
			<div>
				<Comment
					commentList={commentList}
					commentType="book"
					fetchCommentList={fetchCommentList}
					info={bookInfo}
				/>
			</div>
		</div>
	);
};

export default BookDetail;
