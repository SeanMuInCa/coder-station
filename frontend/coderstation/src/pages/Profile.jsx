import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserInfo, uploadAvatarApi, updateUserInfoApi } from "../api/user";
import PageHeader from "../components/PageHeader";
import { format } from "date-fns";
import { Image, Upload, Button, Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";
const Profile = () => {
	const { id } = useParams();
	const [user, setUser] = useState({});
	const [url, setUrl] = useState("");
	const [editMode, setEditMode] = useState(false);
	const [nickname, setNickname] = useState("");

	const fetchData = async () => {
		const res = await getUserInfo(id);
		setUser(res.data);
		setUrl(res.data.avatar);
	};
	useEffect(() => {
		fetchData();
	}, [id]);
	const uploadButton = <Button icon={<UploadOutlined />}>Upload</Button>;
	const handleChange = async ({ file }) => {
		const formData = new FormData();

		// file.originFileObj 是原始的文件对象
		formData.append("file", file.originFileObj);

		try {
			const res = await uploadAvatarApi(formData);
			if (res.code === 0) {
				setUrl(res.data);
				updateUserInfoApi(user._id, { avatar: res.data });
			}
		} catch (error) {
			console.error("Upload failed: ", error);
		}
	};
	const handleClick = () => {
		setEditMode(true);
	};
	const handleCancel = () => {
		setEditMode(false);
	};
	const handleChangeNickname = (e) => {
		setNickname(e.target.value);
	};
	const handleSave = async () => {
		updateUserInfoApi(user._id, { nickname: nickname });
		setEditMode(false);
		fetchData();
		window.location.reload();
	};
	return (
		<div className="max-w-7xl mx-auto bg-white pb-10">
			<PageHeader title="Profile Info" />
			<div className="flex">
				<div className="w-1/5 p-5 border-r flex flex-col items-center">
					<div className="w-32 h-32 mb-5">
						<Image src={url} width="100%" height="100%" />
					</div>
					{editMode && (
						<Upload
							action="api/upload"
							listType="picture"
							maxCount={1}
							showUploadList={false}
							onChange={handleChange}
							headers={{ "Content-Type": "multipart/form-data" }}
						>
							{uploadButton}
						</Upload>
					)}
				</div>
				<div className="p-10 text-xl flex-1 flex flex-col gap-5">
					<div className="flex">
						<span>User Nickname: </span>
						{editMode ? (
							<Input
								defaultValue={user.nickname}
								className="flex-1"
								onChange={handleChangeNickname}
							/>
						) : (
							user.nickname
						)}
					</div>
					<div>
						<span>User Points: </span>
						{user.points}
					</div>
					<div>
						<span>User Status: </span>
						{user.enabled ? "Normal" : "Frozen"}
					</div>
					<div>
						<span>Last Login Date: </span>
						{user.lastLoginDate
							? format(new Date(parseFloat(user.lastLoginDate)), "yyyy-MM-dd")
							: "N/A"}
					</div>
					<div>
						<span>Register Date: </span>
						{user.registerDate
							? format(new Date(parseFloat(user.registerDate)), "yyyy-MM-dd")
							: "N/A"}
					</div>
					{editMode ? (
						<div className="m-auto flex gap-5">
							<Button
								type="primary"
								size="large"
								className="w-32"
								onClick={handleSave}
							>
								Save
							</Button>
							<Button size="large" className="w-32" onClick={handleCancel}>
								Cancel
							</Button>
						</div>
					) : (
						<Button
							type="primary"
							size="large"
							className="w-1/4 m-auto"
							onClick={handleClick}
						>
							Edit Profile
						</Button>
					)}
				</div>
			</div>
		</div>
	);
};

export default Profile;
