import { useContext } from "react";
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
	const { user } = useContext(Context);
	const handelDelete = async () => {
		try {
			await axios.delete(`http://localhost:5000/api/posts/${_id}`);
			window.location.replace("/");
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
				<h1 className="singlePostTitle">
					{title}
					{username === user.username && (
						<div className="singlePostEdit">
							<span className="singlePostIcon">
								<FaEdit />
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
				<div className="singlePostInfo">
					<span>
						Author:
						<b className="singlePostAuthor">
							<Link
								className="link"
								to={`/posts?user=${username}`}
							>
								{username}
							</Link>
						</b>
					</span>
					<span>{new Date(createdAt).toDateString()}</span>
				</div>
				<p className="singlePostDesc">{desc}</p>
			</div>
		</div>
	);
}
