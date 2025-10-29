const Category = require('../models/Category');
const { validationResult } = require('express-validator');


exports.getCategories = async (req, res, next) => {
try{
const categories = await Category.find().sort({ name: 1 });
res.json(categories);
} catch(err){ next(err); }
};


exports.createCategory = async (req, res, next) => {
try{
const errors = validationResult(req);
if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });


const { name } = req.body;
let exists = await Category.findOne({ name });
if(exists) return res.status(400).json({ message: 'Category exists' });
const cat = new Category({ name });
await cat.save();
res.status(201).json(cat);
} catch(err){ next(err); }
};