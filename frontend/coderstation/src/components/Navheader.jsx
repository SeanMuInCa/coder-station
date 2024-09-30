import { useState } from "react";
import { Select, Input, Space, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import LoginOrAvatar from "./LoginOrAvatar";
import LoginForm from "./LoginForm";
import { useDispatch } from "react-redux";
import { resetUserInfo, updateLoginStatus } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
const items = [
	{
		label: "Issues",
		key: "1",
	},
	{
		label: "Books",
		key: "2",
	},
];
const NavHeader = () => {
	const [openForm, setOpenForm] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const loginHandle = () => {
		console.log("from header");
		setOpenForm(true);
	};
	
	const closeForm = () => {
		setOpenForm(false);
	};
	const logoutHandle = () => {
		console.log("logout");
		localStorage.removeItem('userToken');
		dispatch(resetUserInfo());
		dispatch(updateLoginStatus(false));
		navigate('/');
	};
	const profileHandle = () => {
		console.log("profile");
	};
	return (
		<>
			<div className="flex h-full box-border w-3/4 mx-auto justify-between ">
				<div className="w-60">
					<img src="/logo1.png" alt="" />
				</div>
				<div className="text-white flex justify-evenly w-1/4">
					<NavLink to={"/"}>Issues</NavLink>
					<NavLink to={"/books"}>Books</NavLink>
					<NavLink to={"/interviews"}>Interviews</NavLink>
					<a href="https://www.youtube.com" target="_blank" rel="noreferrer">
						Videos
					</a>
				</div>
				<div>
					<Space.Compact>
						<Select defaultValue={items[0].label} options={items} size="large" />
						<Input placeholder="Enter to search" size="large" />
						<Button type="primary" size="large">
							<SearchOutlined />
						</Button>
					</Space.Compact>
				</div>
				<div className=" w-40 flex justify-center items-center">
					<LoginOrAvatar loginHandle={loginHandle} logoutHandle={logoutHandle} profileHandle={profileHandle} />
				</div>
			</div>
			<LoginForm openForm={openForm} closeForm={closeForm} />
		</>
	);
};

export default NavHeader;
