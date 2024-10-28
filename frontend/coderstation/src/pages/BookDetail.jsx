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
        setBookInfo(res.data);

        // 使用 res.data.commentNumber 直接判断，而不是 bookInfo
        if (res.data.commentNumber > 0) {
          await fetchCommentList();
        }
      }
    };

    fetchData();
  }, [id]); // Ensure 'id' is in the dependency array
  const fetchCommentList = async ()=>{
    const commentRes = await getCommentsFromBookApi(id);
          if (commentRes.code === 0) {
            setCommentList(commentRes.data);
          }
  }
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
              <a href={bookInfo.downloadLink} target="_blank" rel="noreferrer">
                <Button type="primary" className="mt-2">
                  Download
                </Button>
              </a>
            </div>
          )}
        </div>
        {/* right */}
        <div className="flex-1 ml-5">
          <h1 className="text-center text-3xl font-bold mb-5">
            {bookInfo.bookTitle}
          </h1>
          <div
            dangerouslySetInnerHTML={{ __html: bookInfo.bookIntro }}
          ></div>
        </div>
      </div>
      <div>
        <Comment commentList={commentList} commentType="book" fetchCommentList={fetchCommentList} info={bookInfo}/>
      </div>
    </div>
  );
};

export default BookDetail;
