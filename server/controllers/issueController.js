const Issue = require('../models/Issue'); // Import Issue model

// Create a new issue
const createIssue = async (req, res) => {
  try {
    const issue = new Issue(req.body); // Create new issue instance with request body
    await issue.save(); // Save the issue to the database
    res.status(201).json(issue); // Respond with created issue and status 201
  } catch (error) {
    res.status(400).json({ message: error.message }); // Respond with error message and status 400
  }
};

// Get all issues or issues of a specific type
const getIssues = async (req, res) => {
  try {
    const { type } = req.params; // Extract type from request parameters
    const filter = type ? { type } : {}; // Create filter based on type
    const issues = await Issue.find(filter); // Find issues based on filter
    res.status(200).json(issues); // Respond with issues and status 200
  } catch (error) {
    res.status(500).send('Internal Server Error'); // Respond with generic error message and status 500
  }
};

// Update an issue by ID
const updateIssue = async (req, res) => {
  const { id } = req.params; // Extract ID from request parameters
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send('Invalid ID'); // Respond with status 400 if ID is invalid
  }
  try {
    const issue = await Issue.findByIdAndUpdate(id, req.body, { new: true }); // Update issue by ID and return the updated document
    if (!issue) return res.status(404).send('Issue not found'); // Respond with status 404 if issue is not found
    res.status(200).json(issue); // Respond with updated issue and status 200
  } catch (error) {
    res.status(500).send('Internal Server Error'); // Respond with generic error message and status 500
  }
};

// Delete an issue by ID
const deleteIssue = async (req, res) => {
  const { id } = req.params; // Extract ID from request parameters
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send('Invalid ID'); // Respond with status 400 if ID is invalid
  }
  try {
    const issue = await Issue.findByIdAndDelete(id); // Delete issue by ID
    if (!issue) return res.status(404).send('Issue not found'); // Respond with status 404 if issue is not found
    res.status(204).send(); // Respond with status 204 (No Content) if deletion is successful
  } catch (error) {
    res.status(500).send('Internal Server Error'); // Respond with generic error message and status 500
  }
};

module.exports = { createIssue, getIssues, updateIssue, deleteIssue };