import React from "react";
import { Button } from "antd";
const NavHeader = () => {
	return (
		<div className="flex h-full box-border">
			<div className="w-60">
				<img src="/logo1.png" alt="" />
			</div>
			<div className="text-white">
				<ul className="flex justify-evenly w-60">
					<li>aaa</li>
					<li>bbb</li>
					<li>ccc</li>
					<li>ddd</li>
				</ul>
			</div>
			<div className="bg-white w-40"></div>
			<div className=" w-40 flex justify-center items-center" >
				<Button type="primary" size='large'>Login / Register</Button>
			</div>
		</div>
	);
};

export default NavHeader;
