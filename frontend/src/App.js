import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import Header from "./components/header/Header";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Context } from "./context/Context";

function App() {
	const { user } = useContext(Context);

	return (
		<Router>
			<Header />
			<Routes>
				<Route path="/" element={user ? <Homepage /> : <Register />} />
				<Route path="/posts" element={<Homepage />} />
				<Route
					path="/login"
					element={user ? <Homepage /> : <Login />}
				/>
				<Route path="/post/:id" element={<Single />} />
				<Route path="/write" element={user ? <Write /> : <Login />} />
				<Route
					path="/settings"
					element={user ? <Settings /> : <Login />}
				/>
			</Routes>
			<ToastContainer />
		</Router>
	);
}

export default App;
