import { useContext, useState } from "react";
import { FaPlus } from "react-icons/fa";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";

export default function Write() {
	const [file, setFile] = useState();
	const [input, setInput] = useState();
	const [image, setImage] = useState();
	const [loading, setLoding] = useState();
	const { user } = useContext(Context);

	const handelChange = (e) => {
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
				setImage(url);
				const post = {
					...input,
					photo: url,
					username: user.username,
				};
				const { data: posts } = await axios.post("/posts", post);
				window.location.replace("/post/" + posts._id);
			} else {
				const post = {
					...input,
					username: user.username,
				};
				const { data: posts } = await axios.post(
					"http://localhost:5000/api/posts/",
					post
				);
				window.location.replace("/post/" + posts._id);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="write">
			{image && <img className="writeImg" src={image} alt="" />}
			<form onSubmit={handelSubmit} className="writeForm">
				<div className="writeFormGroup">
					<label htmlFor="fileInput">
						<FaPlus
							style={{
								cursor: "pointer",
							}}
						/>
					</label>
					<input
						id="fileInput"
						type="file"
						onChange={(e) => setFile(e.target.files[0])}
						style={{ display: "none" }}
					/>
					<input
						className="writeInput"
						placeholder="Title"
						type="text"
						onChange={handelChange}
						name="title"
						autoFocus={true}
					/>
				</div>
				<div className="writeFormGroup">
					<textarea
						className="writeInput writeText"
						placeholder="Tell your story..."
						type="text"
						onChange={handelChange}
						name="desc"
						autoFocus={true}
					/>
				</div>
				<button className="writeSubmit" type="submit">
					Publish
				</button>
			</form>
		</div>
	);
}
