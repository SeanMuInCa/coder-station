import React from 'react';


function RecommendItem(props) {
    return (
        <a  href={props.recommendInfo.href} target="_blank" rel="noreferrer">
            <div >{props.recommendInfo.num}</div>
            <div >{props.recommendInfo.title}</div>
        </a>
    );
}

export default RecommendItem;