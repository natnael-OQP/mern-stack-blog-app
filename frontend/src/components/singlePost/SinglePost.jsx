import { Link } from "react-router-dom";
import "./singlePost.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

export default function Post({
	photo,
	username,
	categories,
	createdAt,
	desc,
	title,
	_id,
}) {
	return (
		<div className="singlePost">
			<div className="singlePostWrapper">
				{photo && (
					<img className="singlePostImg" src={photo} alt={title} />
				)}
				<h1 className="singlePostTitle">
					{title}
					<div className="singlePostEdit">
						<span className="singlePostIcon">
							<FaEdit />
						</span>
						<span className="singlePostIcon">
							<FaTrashAlt />
						</span>
					</div>
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
