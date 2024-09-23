import React from 'react'
import { Modal } from 'antd';

const LoginForm = (props) => {
  const handleOk = () => {
    props.setOpenForm(false)
  };
  const handleCancel = () => {
    props.setOpenForm(false)
  };
  return (
    <Modal title="Login / Register" open={props.openForm} onOk={handleOk} onCancel={handleCancel}>
        
      </Modal>
  );
}

export default LoginForm