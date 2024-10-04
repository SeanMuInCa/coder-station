import NavHeader from "./components/NavHeader";
import PageFooter from "./components/PageFooter";
import { Layout, message } from "antd";
import RouteConfig from "./router";
import { useEffect } from "react";
import { keepStatus, getUserInfo } from "./api/user";
import { useDispatch } from "react-redux";
import { initUserInfo, updateLoginStatus } from "./redux/userSlice";
import { initTypeInfo, updateLoadingStatus } from "./redux/typeSlice";
import { getTypeListApi } from "./api/type";
const { Header, Footer, Content } = Layout;
function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		const keepLoginStatus = async () => {
			const token = localStorage.getItem("userToken");
			if (token) {
				const res = await keepStatus();
				if (res.data) {
					const data = await getUserInfo(res.data._id);
					dispatch(initUserInfo(data.data));
					dispatch(updateLoginStatus(true));
				}else{
			message.error('login expired');
			localStorage.removeItem('userToken');
		  }
			}
		};
		keepLoginStatus();
	}, []);
	
	// useEffect(()=>{
	// 	const getTypeList = async ()=>{
	// 		const res = await getTypeListApi();
	// 		console.log(res,'type');
	// 		dispatch(initTypeInfo(res.data))
	// 		dispatch(updateLoadingStatus(true))
	// 	}
	// 	getTypeList();
	// },[])
	
	return (
		<div className="App">
			<Header>
				<NavHeader />
			</Header>
			<Content className="bg-gray-200">
				<RouteConfig />
			</Content>
			<Footer className="pt-5">
				<PageFooter />
			</Footer>
		</div>
	);
}

export default App;
