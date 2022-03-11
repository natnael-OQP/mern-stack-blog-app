import { Link } from "react-router-dom";
import "./post.css";

export default function Post({
	photo,
	username,
	categories,
	createdAt,
	desc,
	title,
	_id,
}) {
	console.log(photo, username, categories, createdAt, desc, title, _id);
	return (
		<div className="post">
			{photo && (
				<Link to={`/post/${_id}`}>
					<img className="postImg" src={photo} alt={title} />
				</Link>
			)}
			<div className="postInfo">
				<div className="postCats">
					{categories?.map((name, i) => (
						<span key={i} className="postCat">
							<Link className="link" to={`/posts?cat=${name}`}>
								{name}
							</Link>
						</span>
					))}
				</div>
				<span className="postTitle">
					<Link to={`/post/${_id}`} className="link">
						{title}
					</Link>
				</span>
				<hr />
				<span className="postDate">
					{new Date(createdAt).toDateString()}
				</span>
			</div>
			<p className="postDesc">{desc}</p>
		</div>
	);
}
