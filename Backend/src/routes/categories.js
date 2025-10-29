const express = require("express");
const router = express.Router();
const { getCategories, createCategory } = require("../controllers/categoriesController");
const auth = require("../middleware/auth");

// Public route: view categories
router.get("/", getCategories);

// Private route: create category (admin or logged in user)
router.post("/", auth, createCategory);

module.exports = router;
