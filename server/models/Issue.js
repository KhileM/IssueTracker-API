const mongoose = require('mongoose');

// Define schema for Issue model
const issueSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 3 }, // Title of the issue (required, min length 3)
  description: { type: String, required: true }, // Description of the issue (required)
  type: { type: String, enum: ['bug', 'refacto', 'feature'], required: true }, // Type of the issue (required, must be one of the specified values)
});

// Create and export Issue model
module.exports = mongoose.model('Issue', issueSchema);
