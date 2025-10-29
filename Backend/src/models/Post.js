const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
title: { type: String, required: true },
body: { type: String, required: true },
author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
featuredImage: { type: String },
comments: [
{
user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
body: String,
createdAt: { type: Date, default: Date.now }
}
]
}, { timestamps: true });


module.exports = mongoose.model('Post', PostSchema);