import React from 'react'
import { Card,Meta } from 'antd'
const BookCard = (props) => {
    console.log(props.book);
    
  return (
    <Card className='w-60 box-border p-2 m-2 cursor-pointer text-center' 
        cover={
            <img
                className='h-72'
                alt={props.book.bookTitle}
                src={props.book.bookPic}
            />
        }
        
    >
        <Meta
      
      title={props.book.bookTitle}
      description="This is the description"
    />
    </Card>
  )
}

export default BookCard