import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./singlePost.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Post({
	photo,
	username,
	categories,
	createdAt,
	desc,
	title,
	_id,
}) {
	const [newTitle, setTitle] = useState(title);
	const [newDesc, setDesc] = useState(desc);
	const [updateMode, setUpdateMode] = useState(false);

	const { user } = useContext(Context);
	const handelDelete = async () => {
		try {
			await axios.delete(`http://localhost:5000/api/posts/${_id}`);
			window.location.replace("/");
		} catch (error) {
			console.log(error);
		}
	};

	const handleUpdate = async () => {
		try {
			if (newDesc || newTitle) {
				setTitle(newTitle);
				await axios.put("http://localhost:5000/api/posts/" + _id, {
					username: user.username,
					title: newTitle,
					desc: newDesc,
				});
				setUpdateMode(false);
				window.location.reload();
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="singlePost">
			<div className="singlePostWrapper">
				{photo && (
					<img className="singlePostImg" src={photo} alt={title} />
				)}
				{updateMode ? (
					<input
						type="text"
						value={newTitle}
						className="singlePostTitleInput"
						autoFocus
						onChange={(e) => setTitle(e.target.value)}
					/>
				) : (
					<h1 className="singlePostTitle">
						{title}
						{username === user.username && (
							<div className="singlePostEdit">
								<span className="singlePostIcon">
									<FaEdit
										onClick={() => setUpdateMode(true)}
									/>
								</span>
								<span
									onClick={handelDelete}
									className="singlePostIcon"
								>
									<FaTrashAlt />
								</span>
							</div>
						)}
					</h1>
				)}
				<div className="singlePostInfo">
					<span className="singlePostAuthor">
						Author:
						<Link to={`/?user=${username}`} className="link">
							<b> {username}</b>
						</Link>
					</span>
					<span className="singlePostDate">
						{new Date(createdAt).toDateString()}
					</span>
				</div>
				{updateMode ? (
					<textarea
						className="singlePostDescInput"
						value={newDesc}
						rows={10}
						onChange={(e) => setDesc(e.target.value)}
					/>
				) : (
					<p className="singlePostDesc">{desc}</p>
				)}
				{updateMode && (
					<button className="singlePostButton" onClick={handleUpdate}>
						Update
					</button>
				)}
			</div>
		</div>
	);
}
