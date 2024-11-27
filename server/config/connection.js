const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI);

module.exports = mongoose.connection;