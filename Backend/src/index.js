require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const posts = require('./routes/posts');
const categories = require('./routes/categories');
const auth = require('./routes/auth');
const errorHandler = require('./middleware/errorHandler');
const path = require('path');


const app = express();
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '..', process.env.UPLOAD_DIR || 'uploads')));


app.use('/api/posts', posts);
app.use('/api/categories', categories);
app.use('/api/auth', auth);


app.use(errorHandler);


const PORT = process.env.PORT || 5000;
connectDB(process.env.MONGO_URI).then(() => {
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
});