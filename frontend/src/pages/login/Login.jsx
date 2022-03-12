import { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { toast } from "react-toastify";
import axios from "axios";
import { Context } from "../../context/Context";
import Spinner from "../../components/spinner/Spinner";

export default function Login() {
	const navigate = useNavigate();
	const { dispatch, isLoading } = useContext(Context);
	const userRef = useRef();
	const passwordRef = useRef();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			dispatch({ type: "LOGIN_START" });
			const { data } = await axios.post("/auth/login", {
				username: userRef.current.value,
				password: passwordRef.current.value,
			});
			dispatch({ type: "LOGIN_SUCCESS", payload: data });
		} catch (error) {
			toast.error("incorrect credentials");
			dispatch({ type: "LOGIN_FAILURE" });
		}
	};
	if (isLoading) return <Spinner />;
	return (
		<div className="login">
			<span className="loginTitle">Login</span>
			<form className="loginForm" onSubmit={handleSubmit}>
				<label>Username</label>
				<input
					className="loginInput"
					type="text"
					placeholder="full name"
					ref={userRef}
					required={true}
				/>
				<label>Password</label>
				<input
					className="loginInput"
					type="password"
					placeholder="Enter your password..."
					ref={passwordRef}
					required={true}
				/>
				<button type="submit" className="loginButton">
					Login
				</button>
			</form>
			<button
				onClick={() => navigate("/")}
				className="loginRegisterButton"
			>
				Register
			</button>
		</div>
	);
}
