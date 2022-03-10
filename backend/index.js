const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB");
// start env file
dotenv.config();
//  connect database
connectDB();
// port
const port = "5000";
// start express app
const app = express();
// middleware
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));

app.listen(port, () => {
	console.log(`backend server ${"http://localhost:" + port} `);
});
