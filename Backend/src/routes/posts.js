const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
getPosts,
getPostById,
createPost,
updatePost,
deletePost
} = require('../controllers/postsController');


router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', auth, upload.single('featuredImage'), createPost);
router.put('/:id', auth, upload.single('featuredImage'), updatePost);
router.delete('/:id', auth, deletePost);


module.exports = router;