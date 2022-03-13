import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { FaUserCircle } from "react-icons/fa";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import Spinner from "../../components/spinner/Spinner";

export default function Settings() {
	const { user } = useContext(Context);
	const [input, setInput] = useState();
	const [file, setFile] = useState();
	const [isLoading, setLoading] = useState(false);

	const changeHandler = (e) => {
		setInput((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handelSubmit = async (e) => {
		e.preventDefault();
		const data = new FormData();
		data.append("file", file);
		data.append("upload_preset", "uploads");
		try {
			if (file) {
				const upload = await axios.post(
					`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_ID}/image/upload`,
					data
				);
				const { url } = upload.data;
				const updated = {
					...input,
					userID: user._id,
					profilePic: url,
				};
				const { data: newUser } = await axios.put(
					"http://localhost:5000/api/user/" + user._id,
					updated
				);
				localStorage.clear();
				localStorage.setItem("user", JSON.stringify(newUser));
				window.location.reload();
			} else {
				const post = {
					...input,
					userID: user._id,
				};
				const { data: newUser } = await axios.put(
					"http://localhost:5000/api/user/" + user._id,
					post
				);
				localStorage.clear();
				localStorage.setItem("user", newUser);
				window.location.reload();
			}
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};
	console.log(user);
	if (isLoading) return <Spinner />;

	return (
		<div className="settings">
			<div className="settingsWrapper">
				<div className="settingsTitle">
					<span className="settingsTitleUpdate">
						Update Your Account
					</span>
					<span className="settingsTitleDelete">Delete Account</span>
				</div>
				<form className="settingsForm" onSubmit={handelSubmit}>
					<label>Profile Picture</label>
					<div className="settingsPP">
						{user?.profilePic ? (
							<img src={user?.profilePic} alt="" />
						) : (
							<img
								src="https://imgs.search.brave.com/oQku-RrUxkdVYMEXTZfEssUEez3TAJ-FOyfWseMAUms/rs:fit:980:980:1/g:ce/aHR0cHM6Ly9jZG4u/b25saW5ld2ViZm9u/dHMuY29tL3N2Zy9p/bWdfMjk5NTg2LnBu/Zw"
								alt=""
							/>
						)}
						<label htmlFor="fileInput">
							<div className="settingsPPIcon ">
								<FaUserCircle />
							</div>
						</label>
						<input
							id="fileInput"
							type="file"
							onChange={(e) => setFile(e.target.files[0])}
							style={{ display: "none" }}
							className="settingsPPInput"
						/>
					</div>
					<label>username</label>
					<input
						type="text"
						placeholder="natnael-oqp"
						name="username"
						onChange={changeHandler}
					/>
					<label>Email</label>
					<input
						type="email"
						placeholder="natnael-oqp@gmail.com"
						name="email"
						onChange={changeHandler}
					/>
					<label>Password</label>
					<input
						type="password"
						placeholder="Password"
						name="password"
						onChange={changeHandler}
					/>
					<button className="settingsSubmitButton" type="submit">
						Update
					</button>
				</form>
			</div>
			<Sidebar />
		</div>
	);
}
