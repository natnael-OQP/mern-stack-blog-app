import { Link } from "react-router-dom";
import "./header.css";
import { FaSearch } from "react-icons/fa";

export default function Header() {
	const user = true;
	return (
		<div className="top">
			<div className="topLeft">
				<img
					className="logo"
					src="https://images.squarespace-cdn.com/content/v1/59f0a6e9f09ca487886b21e2/1510659015492-9VZDMCN0ZITTOAQMVBY8/ke17ZwdGBToddI8pDm48kKDQoKX4urpYFA8Ipb7T5vcUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYwL8IeDg6_3B-BRuF4nNrNcQkVuAT7tdErd0wQFEGFSnAlwksdHiSFo_Blkmkg3O1rEdV_DLkh0hRYgC5ISb2DYqPVyr6BfEIO3ut9ylJ2-Ag/pattern+gold.png"
					alt="logo"
				/>
			</div>
			<div className="topCenter">
				<ul className="topList">
					<li className="topListItem">
						<Link className="link" to="/">
							HOME
						</Link>
					</li>
					<li className="topListItem">ABOUT</li>
					<li className="topListItem">CONTACT</li>
					<li className="topListItem">
						<Link className="link" to="/write">
							WRITE
						</Link>
					</li>
					{user && <li className="topListItem">LOGOUT</li>}
				</ul>
			</div>
			<div className="topRight">
				{user ? (
					<Link className="link" to="/settings">
						<img
							className="topImg"
							src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
							alt=""
						/>
					</Link>
				) : (
					<ul className="topList">
						<li className="topListItem">
							<Link className="link" to="/login">
								LOGIN
							</Link>
						</li>
						<li className="topListItem">
							<Link className="link" to="/register">
								REGISTER
							</Link>
						</li>
					</ul>
				)}
				<span className="topSearchIcon">
					<FaSearch />
				</span>
			</div>
		</div>
	);
}
