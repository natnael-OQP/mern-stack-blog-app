import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import Banner from "../../components/banner/Banner";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./homepage.css";
import axios from "axios";
import Spinner from "../../components/spinner/Spinner";

export default function Homepage() {
	const [posts, setPosts] = useState();
	const { search } = useLocation();
	useEffect(() => {
		const fetcher = async () => {
			const { data } = await axios.get(`posts${search}`);
			setPosts(data);
		};
		fetcher();
	}, [search]);
	if (!posts) return <Spinner />;
	return (
		<>
			<Banner />
			<div className="home">
				<Posts posts={posts} />
				<Sidebar />
			</div>
		</>
	);
}
