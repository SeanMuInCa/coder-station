import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space } from "antd";
import { NavLink } from 'react-router-dom'
const items = [
	{
		label: "Q and A",
		key: "1",
	},
	{
		label: "books",
		key: "2",
	},
];
const menuProps = {
	items,
};
const NavHeader = () => {
	return (
		<div className="flex h-full box-border w-3/4 mx-auto justify-between ">
			<div className="w-60">
				<img src="/logo1.png" alt="" />
			</div>
			<div className="text-white flex justify-evenly w-1/4">
				<NavLink to={'/'}>Questions</NavLink>
				<NavLink to={'/books'}>Books</NavLink>
				<NavLink to={'/interviews'}>Interviews</NavLink>
				<a href='https://www.youtube.com' target="_blank" rel="noreferrer">Videos</a>
			</div>
			<div className="w-2/5 flex items-center justify-center h-full leading-1 ">
				<div className=" w-1/4 outline-none rounded-none my-0 h-full box-border p-0 m-0 border-collapse border-none">
					<Dropdown menu={menuProps} className="w-full h-3/4 outline-none hover:outline-none rounded-none">
						<Button className="hover:outline-none">
							<Space>
								{items[0].label}
								<DownOutlined />
							</Space>
						</Button>
					</Dropdown>
				</div>
				<div className=" w-3/4 h-full box-border p-0 m-0 border-collapse border-none">
          <input type="text" className="w-full h-3/4 px-3 py-1 outline-none"/>
        </div>
			</div>
			<div className=" w-40 flex justify-center items-center">
				<Button type="primary" size="large">
					Login / Register
				</Button>
			</div>
		</div>
	);
};

export default NavHeader;
