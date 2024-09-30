import NavHeader from "./components/NavHeader";
import PageFooter from "./components/PageFooter";
import { Layout } from "antd";
import RouteConfig from "./router";
import { useEffect } from "react";
import { keepStatus } from './api/user'
const { Header, Footer, Content } = Layout;
function App() {
  useEffect(()=>{
    keepLoginStatus();
  },[])
  const keepLoginStatus = async ()=>{
    const res = await keepStatus()
    console.log(res)
  }
	return (
		<div className="App">
      <Header>
        <NavHeader />
      </Header>
      <Content>
        <RouteConfig />
      </Content>
      <Footer>
        <PageFooter />
      </Footer>
		</div>
	);
};

export default App;
