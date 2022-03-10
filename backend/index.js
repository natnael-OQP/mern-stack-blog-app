const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const port = "5000";

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

app.listen(port, () => {
	console.log(`backend server ${"http://localhost:" + port} `);
});
