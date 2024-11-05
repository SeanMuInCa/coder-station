import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux"; // 假设你使用 Redux 存储用户状态

const RouteBefore = ({ children, requireLogin }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const isLogin = localStorage.getItem("userToken");

	useEffect(() => {
		if (requireLogin && !isLogin) {
			navigate("/issues", { state: { from: location.pathname } });
		}
	}, [requireLogin, isLogin, navigate, location.pathname]);

	// 如果无需登录或用户已登录，则渲染子组件，否则不渲染
	return children;
};

export default RouteBefore;
