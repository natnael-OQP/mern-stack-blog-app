import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
import { Context } from "../../context/Context";

export default function Sidebar() {
	const [categories, setCategories] = useState();
	useEffect(() => {
		const fetcher = async () => {
			const { data } = await axios.get("/categories");
			setCategories(data);
		};
		fetcher();
	}, []);
	const { user } = useContext(Context);
	return (
		<div className="sidebar">
			<div className="sidebarItem">
				<span className="sidebarTitle">ABOUT ME</span>
				{user?.profilePic && (
					<img
						objectFit="contain"
						src={user?.profilePic}
						alt="profilePic"
					/>
				)}
				<p>{user.username}</p>
			</div>
			<div className="sidebarItem">
				<span className="sidebarTitle">CATEGORIES</span>
				<ul className="sidebarList">
					{categories?.map(({ name }) => (
						<li key={name} className="sidebarListItem">
							<Link className="link" to={`/posts?cat=${name}`}>
								{name}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
