import React from 'react'
import { Modal } from 'antd';
import { useState } from 'react';
const LoginForm = (props) => {
  const handleOk = () => {
    props.setOpenForm(false)
  };
  const handleCancel = () => {
    props.setOpenForm(false)
  };
  return (
    <Modal title="Basic Modal" open={props.openForm} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
  )
}

export default LoginForm