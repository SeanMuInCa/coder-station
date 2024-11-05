import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const RouteBefore = ({ children, requireLogin }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const isLogin = localStorage.getItem("userToken");

	useEffect(() => {
		if (requireLogin && !isLogin) {
			navigate("/issues", { state: { from: location.pathname } });
		}
	}, [requireLogin, isLogin, navigate, location.pathname]);

	return children;
};

export default RouteBefore;
