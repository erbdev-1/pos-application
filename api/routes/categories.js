const Category = require("../models/Category.js");
const express = require("express");
const router = express.Router();

// Get all categories from the Database
router.get("/get-all", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories); // Send the categories as a JSON response
  } catch (error) {
    res.status(500).json(error);
  }
});

/* Creating a new category in the Database */
router.post("/add-category", async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.status(200).json("Item added successfully.");
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get a specific category from the Database by its ID
router.put("/update-category", async (req, res) => {
  try {
    await Category.findOneAndUpdate({ _id: req.body.categoryId }, req.body); // Find the category by its ID and update it
    res.status(200).json("Item updated successfully.");
  } catch (error) {
    res.status(500).json(error);
  }
});

/* Deleting an existing category from the Database */
router.delete("/delete-category", async (req, res) => {
  try {
    await Category.findOneAndDelete({ _id: req.body.categoryId });
    res.status(200).json("Item deleted successfully.");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
