const Post = require('../models/Post');
const { validationResult } = require('express-validator');


exports.getPosts = async (req, res, next) => {
try{
const { page = 1, limit = 10, q, category } = req.query;
const filter = {};
if(q) filter.$or = [{ title: new RegExp(q, 'i') }, { body: new RegExp(q, 'i') }];
if(category) filter.categories = category;


const posts = await Post.find(filter)
.populate('author', 'name')
.populate('categories')
.sort({ createdAt: -1 })
.skip((page - 1) * limit)
.limit(Number(limit));


const total = await Post.countDocuments(filter);
res.json({ data: posts, meta: { total, page: Number(page), limit: Number(limit) } });
} catch(err){ next(err); }
};


exports.getPostById = async (req, res, next) => {
try{
const post = await Post.findById(req.params.id).populate('author', 'name').populate('categories');
if(!post) return res.status(404).json({ message: 'Not found' });
res.json(post);
} catch(err){ next(err); }
};


exports.createPost = async (req, res, next) => {
try{
const errors = validationResult(req);
if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });


const { title, body, categories } = req.body;
const categoriesArr = categories ? categories.split(',').map(c => c.trim()) : [];
const post = new Post({ title, body, author: req.user.id, categories: categoriesArr });
if(req.file) post.featuredImage = req.file.filename;
await post.save();
res.status(201).json(post);
} catch(err){ next(err); }
};


exports.updatePost = async (req, res, next) => {
try{
const payload = req.body;
if(req.file) payload.featuredImage = req.file.filename;
const updated = await Post.findByIdAndUpdate(req.params.id, payload, { new: true });
res.json(updated);
} catch(err){ next(err); }
};


exports.deletePost = async (req, res, next) => {
try{
await Post.findByIdAndDelete(req.params.id);
res.status(204).end();
} catch(err){ next(err); }
};


exports.addComment = async (req, res, next) => {
try{
const { body } = req.body;
const post = await Post.findById(req.params.id);
if(!post) return res.status(404).json({ message: 'Not found' });
post.comments.push({ user: req.user.id, body });
await post.save();
res.status(201).json(post);
} catch(err){ next(err); }
};