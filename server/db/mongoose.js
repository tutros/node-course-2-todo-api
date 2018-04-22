// Configure mongoose
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// env var MONGODB_URI in Heruku stores mongolabs connection path
mongoose.connect(process.env.MONGODB_URI);

module.exports = { mongoose };
