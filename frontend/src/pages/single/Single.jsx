import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import SinglePost from "../../components/singlePost/SinglePost";
import Spinner from "../../components/spinner/Spinner";
import "./single.css";

export default function Single() {
	const location = useLocation();
	const id = location.pathname.split("/")[2];
	const [post, setPost] = useState();
	useEffect(() => {
		const fetcher = async () => {
			const { data } = await axios.get(`/posts/${id}`);
			setPost(data);
		};
		fetcher();
	}, []);
	if (!post) return <Spinner />;
	return (
		<div className="single">
			<SinglePost {...post} />
			<Sidebar />
		</div>
	);
}
