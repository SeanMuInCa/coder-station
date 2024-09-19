import React from "react";
import { Button, Select, Input, Space } from "antd";
import { NavLink } from "react-router-dom";
import LoginOrAvatar from "./LoginOrAvatar";
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
	return (
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
			{/* <div className="w-2/5 flex items-center justify-center h-full leading-1 ">
				<div className=" w-1/4 outline-none rounded-none my-0 h-full box-border p-0 m-0 border-collapse border-none">
					<Dropdown menu={menuProps} className="w-full h-3/4 outline-none hover:outline-none rounded-none align-middle">
						<Button className="hover:outline-none">
							<Space>
								{items[0].label}
								<DownOutlined />
							</Space>
						</Button>
					</Dropdown>
				</div>
				<div className=" w-3/4 h-full box-border p-0 m-0 border-collapse border-none">
          <input type="text" className="w-full h-3/4 px-3 py-1 outline-none align-middle"/>
        </div>
			</div> */}
			<div>
				<Space.Compact>
					<Select defaultValue={items[0].label} options={items} />
					<Input.Search placeholder="Enter to search" className="outline-none" allowClear enterButton/>
				</Space.Compact>
			</div>
			<div className=" w-40 flex justify-center items-center">
        <LoginOrAvatar />
			</div>
		</div>
	);
};

export default NavHeader;
