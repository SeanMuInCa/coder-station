import React from 'react'
import { Card } from 'antd';

const InterviewCard = (props) => {
    console.log(props);
    
  return (
    <Card
        title={props.interview.interviewTitle}
    >
        <div
            dangerouslySetInnerHTML={{ __html: props.interview.interviewContent }}
          ></div>
    </Card>
  )
}

export default InterviewCard