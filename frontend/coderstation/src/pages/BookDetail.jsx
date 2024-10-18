import React from 'react'
import { useParams } from 'react-router-dom';
const BookDetail = () => {
  const { id } = useParams();
  return (
    <div className='max-w-7xl mx-auto bg-slate-50 pb-10'>BookDetail</div>
  )
}

export default BookDetail