const asyncHandler = require("express-async-handler");
const Category = require("../model/Category");

// get category
const getCategory = asyncHandler(async (req, res) => {
	try {
		const categories = await Category.find();
		res.status(200).json(categories);
	} catch (error) {
		res.status(404).json({ message: "Category Not Found!" });
	}
});
// Create category
const createCategory = asyncHandler(async (req, res) => {
	try {
		const { name } = req.body;
		//  check if request body is empty
		if (!name) {
			res.status(400).json({ message: "fill required fields" });
		}
		const newCategory = await Category.create({ name });
		res.status(200).json(newCategory);
	} catch (error) {
		res.status(400).json({ message: "category already exists!" });
	}
});

module.exports = {
	getCategory,
	createCategory,
};
