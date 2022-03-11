import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
	const [categories, setCategories] = useState();
	useEffect(() => {
		const fetcher = async () => {
			const { data } = await axios.get("/categories");
			setCategories(data);
		};
		fetcher();
	}, []);
	return (
		<div className="sidebar">
			<div className="sidebarItem">
				<span className="sidebarTitle">ABOUT ME</span>
				<img
					src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg"
					alt=""
				/>
				<p>
					Laboris sunt aute cupidatat velit magna velit ullamco dolore
					mollit amet ex esse.Sunt eu ut nostrud id quis proident.
				</p>
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
