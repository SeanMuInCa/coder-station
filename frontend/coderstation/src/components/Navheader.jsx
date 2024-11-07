import { useEffect, useState } from "react";
import { Select, Input, Space, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import LoginOrAvatar from "./LoginOrAvatar";
import LoginForm from "./LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { resetUserInfo, updateLoginStatus } from "../redux/userSlice";
import {
	initSearchType,
	initSearchWord,
	resetSearchInfo,
	initSearchMode,
} from "../redux/searchSlice";
import { useNavigate } from "react-router-dom";
//todo: 搜索框的搜索功能
const items = [
	{
		value: "issue",
		label: "Issues",
		key: "1",
	},
	{
		value: "book",
		label: "Books",
		key: "2",
	},
];
const NavHeader = () => {
	const search = useSelector((state) => state.search);
	const user = useSelector((state) => state.user);

	const [openForm, setOpenForm] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [defaultValue, setDefaultValue] = useState('Issue')
	const loginHandle = () => {
		setOpenForm(true);
	};

	const closeForm = () => {
		setOpenForm(false);
	};
	const logoutHandle = () => {
		localStorage.removeItem("userToken");
		dispatch(resetUserInfo());
		dispatch(updateLoginStatus(false));
		navigate("/");
	};
	const profileHandle = () => {
		navigate("/profile/" + user.userInfo._id);
	};
	const handleKeyWord = (e) => {
		dispatch(initSearchWord(e.target.value));
	};
	const handleSearch = () => {
		if (search.SearchInfo.keyWord.trim() === "") return;
		if (search.SearchInfo?.searchType === "") {
			dispatch(initSearchType("issue"));
		}
		dispatch(initSearchMode(true));

		if (search.SearchInfo.searchType === "book") {
			navigate("/books");
		} else {
			navigate("/issues");
		}
		
		
	};
	const changeSelect = (value) => {
		dispatch(initSearchType(value));
		setDefaultValue(value)
	};
	const handleClear = () => {
		dispatch(initSearchMode(false));
	};
	
	useEffect(()=>{
		if(window.location.pathname === '/books'){
			setDefaultValue('Books')
		}else if(window.location.pathname === '/issues'){
			setDefaultValue('Issues')
		}
	},[window.location.pathname])
	
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
					<a
						href="https://www.youtube.com/results?search_query=software+development"
						target="_blank"
						rel="noreferrer"
					>
						Videos
					</a>
				</div>
				<div>
					<Space.Compact>
						<Select
							value={defaultValue}
							options={items}
							size="large"
							onChange={changeSelect}
						/>
						<Input
							placeholder="Enter to search"
							size="large"
							allowClear
							onChange={handleKeyWord}
							onClear={handleClear}
						/>
						<Button type="primary" size="large" onClick={handleSearch}>
							<SearchOutlined />
						</Button>
					</Space.Compact>
				</div>
				<div className=" w-40 flex justify-center items-center">
					<LoginOrAvatar
						loginHandle={loginHandle}
						logoutHandle={logoutHandle}
						profileHandle={profileHandle}
					/>
				</div>
			</div>
			<LoginForm openForm={openForm} closeForm={closeForm} />
		</>
	);
};

export default NavHeader;
