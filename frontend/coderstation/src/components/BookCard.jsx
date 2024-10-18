import React from "react";
import { Card } from "antd";
const { Meta } = Card;
const BookCard = (props) => {
	console.log(props.book);

	return (
		<Card
			className="w-60 box-border p-2 mx-2 my-5 cursor-pointer text-center"
			cover={
				<img className="h-72" alt={props.book.bookTitle} src={props.book.bookPic} />
			}
		>
			<Meta title={props.book.bookTitle} />
			<div className="mt-5 flex justify-around items-center text-gray-400">
				<div>
					<p>{props.book.scanNumber}</p>
					<p>views</p>
				</div>
                <span className="h-8 bg-gray-200 w-0.5"></span>
				<div>
					<p>{props.book.commentNumber}</p>
					<p>comments</p>
				</div>
			</div>
		</Card>
	);
};

export default BookCard;
