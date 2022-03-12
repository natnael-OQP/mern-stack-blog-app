import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";
import axios from "axios";
import { toast } from "react-toastify";

export default function Register() {
	const navigate = useNavigate();

	const [user, setUser] = useState({
		username: "",
		email: "",
		password: "",
	});

	const changeHandler = (e) => {
		setUser((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			await axios.post("/auth/register", user);
			toast.success("successfully registered!");
		} catch (error) {
			toast.error("username or email address already taken!");
		}
	};

	return (
		<div className="register">
			<span className="registerTitle">Register</span>
			<form onSubmit={submitHandler} className="registerForm">
				<label>Username</label>
				<input
					className="registerInput"
					type="text"
					name="username"
					placeholder="Enter your username..."
					onChange={(e) => changeHandler(e)}
					required={true}
				/>
				<label>Email</label>
				<input
					className="registerInput"
					type="email"
					name="email"
					placeholder="Enter your email..."
					onChange={(e) => changeHandler(e)}
					required={true}
				/>
				<label>Password</label>
				<input
					className="registerInput"
					type="password"
					name="password"
					placeholder="Enter your password..."
					onChange={(e) => changeHandler(e)}
					required={true}
				/>
				<button type="submit" className="registerButton">
					Register
				</button>
			</form>
			<button
				onClick={() => navigate("/login")}
				className="registerLoginButton"
			>
				Login
			</button>
		</div>
	);
}
