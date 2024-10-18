import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookByIdApi } from "../api/book";
import PageHeader from "../components/PageHeader";
import { Image, Button } from "antd";
import { useSelector } from "react-redux";
import { getCommentsFromBookApi } from "../api/comment";
import Comment from "../components/Comment";
const BookDetail = () => {
	const { id } = useParams();
	const [bookInfo, setBookInfo] = useState({});
  const [commentList, setCommentList] = useState([]);
	const user = useSelector((state) => state.user);
	useEffect(() => {
		const fetchData = async () => {
			const res = await getBookByIdApi(id);
			if (res.code === 0) {
        console.log(res.data);
        
				setBookInfo(res.data);
        if(bookInfo.commentNumber > 0){
          const res = await getCommentsFromBookApi(id)
          if(res.code === 0){
            console.log(res,'commentList');
            setCommentList(res.data)
          }
        }
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
					{user.isLogin && <div className="text-center">
            <a href={bookInfo.downloadLink} target="_blank" rel="noreferrer"><Button type="primary" className="mt-5">Free Download</Button></a>
            <p className="mt-2">costs {bookInfo.requirePoints} Points</p>
            </div>}
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
        <Comment commentList={commentList} />
      </div>
		</div>
	);
};

export default BookDetail;
