const mongoose = require('mongoose');


const connectDB = async (uri) => {
	if (!uri || typeof uri !== 'string') {
		console.error('\nERROR: MONGO_URI is not set.\n\nCreate a .env file in the Backend folder with a line like:\nMONGO_URI=mongodb://localhost:27017/your-db-name\n\nThen restart the server.\n');
		// Fail fast so developer sees the problem immediately
		process.exit(1);
	}

	await mongoose.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	console.log('MongoDB connected');
};


module.exports = connectDB;