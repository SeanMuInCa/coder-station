import React from "react";
import Category from "./Category";
const PageHeader = (props) => {
	return (
		<div className="flex py-10">
			<h2 className="text-4xl font-bold flex-0.5 mx-10 min-w-40">{props.title}</h2>
			<div className="flex-1 flex items-center">
				{/* similar to vue slot */}
				{props.children}
			</div>
		</div>
	);
};

export default PageHeader;
