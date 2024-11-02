import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getUserInfo, uploadAvatarApi } from '../api/user'; 
import PageHeader from '../components/PageHeader'
import { format } from 'date-fns';
import { Image, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
const Profile = () => {
  const {id} = useParams();
  const [user, setUser] = useState({})
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);
  
  useEffect(()=>{
    const fetchData = async()=>{
      const res = await getUserInfo(id);
      setUser(res.data)
    }
    fetchData();
  },[id])
  const uploadButton = (
    <Button icon={<UploadOutlined />}>Upload</Button>
  );
  const handleChange = async({ fileList: newFileList }) => {
    // setFileList(newFileList);
    // const res = await uploadAvatarApi(newFileList[0]);
    console.log(newFileList[0]);
    
  };
  return (
    <div className="max-w-7xl mx-auto bg-white pb-10">
      <PageHeader title='Profile Info' />
      <div className='flex'>
        <div className='w-1/5 p-5 border-r flex flex-col items-center'>
          {/* <img src={user.avatar} alt="" /> */}
          <Image src={user.avatar} className='w-32 h-32 mb-5'/>
      <Upload
        // action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        listType="picture"
        maxCount={1}
        showUploadList={false}
        fileList={fileList}
        // onPreview={handlePreview}
        onChange={handleChange}
      >
        {uploadButton}
      </Upload>
        </div>
        <div className='p-10 text-xl flex flex-col gap-5'>
          <div><span>User Nickname: </span>{user.nickname}</div>
          <div><span>User Points: </span>{user.points}</div>
          <div><span>User Status: </span>{user.enabled ?'Normal':'Frozen'}</div>
          <div><span>Last Login Date: </span>{user.lastLoginDate ? format(new Date(parseFloat(user.lastLoginDate)), 'yyyy-MM-dd') : 'N/A'}</div>
          <div><span>Register Date: </span>{user.registerDate ? format(new Date(parseFloat(user.registerDate)), 'yyyy-MM-dd') : 'N/A'}</div>
        </div>
      </div>
    </div>
  )
}

export default Profile