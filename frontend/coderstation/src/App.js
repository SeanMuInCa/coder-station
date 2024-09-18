import Navheader from "./components/Navheader";
import Pagefooter from "./components/Pagefooter";
import { Layout } from "antd";
function App() {
	return (
		<>
			<Navheader />
			<h1 className="text-3xl underline">Hello world!</h1>
			<Pagefooter />
		</>
	);
}

export default App;
