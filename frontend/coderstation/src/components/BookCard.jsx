import React from 'react'
import { Card } from 'antd'
const BookCard = (props) => {
    console.log(props.book);
    
  return (
    <Card className='w-80' 
        cover={
            <img
                alt={props.book.bookTitle}
                src={props.book.bookPic}
            />
        }
    >BookCard</Card>
  )
}

export default BookCard