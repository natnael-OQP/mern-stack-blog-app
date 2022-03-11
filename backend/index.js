const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB");
const multer = require("multer");
var cors = require('cors')

// routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");

const port = process.env.PORT || "5000";

dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

// // create storage
// const storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		cb(null, "images");
// 	},
// 	filename: (req, file, cb) => {
// 		cb(null, "amazon.png");
// 	},
// });
// // upload
// const upload = multer({ storage: storage });

// app.post("/api/upload", upload.single("file"), (req, res) => {
// 	res.status(200).json({ message: "File Upload successfully" });
// });

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen(port, () => {
	console.log(`backend server ${"http://localhost:" + port} `);
});
