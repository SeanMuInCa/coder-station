import React from 'react';


function RecommendItem(props) {
    return (
        <a className='flex border-b-2 mb-4' href={props.recommendInfo.href} target="_blank" rel="noreferrer">
            <div className='w-6 bg-blue-500 text-white mb-5 mr-2 rounded-md'>{props.recommendInfo.num}</div>
            <div >{props.recommendInfo.title}</div>
        </a>
    );
}

export default RecommendItem;