import React from "react";
import { Card, Carousel } from "antd";
import RecommendItem from "./RecommendItem";
/**
 * 右侧的推荐组件
 */
function Recommendation(props) {
	return (
		<Card title="Popular Topics">
			{/* 上方轮播图 */}
			<div className="mb-5">
				<Carousel autoplay>
					<div className="w-full h-40">
						<a href="https://www.youtube.com" target="_blank" rel="noreferrer" >
							<img
								src="https://image-static.segmentfault.com/583/489/583489293-62e22caab8392"
								alt=""
                                className="block h-full"
							/>
						</a>
					</div>
                    <div className="w-full h-40">
						<a href="https://www.youtube.com" target="_blank" rel="noreferrer" >
							<img
								src="https://image-static.segmentfault.com/248/470/2484709773-635632347923b"
								alt=""
                                className="block h-full"
							/>
						</a>
					</div>
				</Carousel>
			</div>

			<RecommendItem
				recommendInfo={{
					num: 1,
					title: "How to learn React in 3 days",
					href: "https://www.youtube.com",
				}}
			/>
			<RecommendItem
				recommendInfo={{
					num: 2,
					title: "The answer is you CAN NOT",
					href: "https://www.youtube.com",
				}}
			/>
			<RecommendItem
				recommendInfo={{
					num: 3,
					title: "It's just for fun",
					href: "https://www.youtube.com",
				}}
			/>
		</Card>
	);
}

export default Recommendation;
