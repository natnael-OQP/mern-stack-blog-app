const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB");
// start env file
dotenv.config();
// start express app
const app = express();
// port 
const port = "5000";
//  connect database
connectDB();

app.use("/", (req, res) => {
	res.send("value");
});

app.listen(port, () => {
	console.log(`backend server ${port} `);
});
