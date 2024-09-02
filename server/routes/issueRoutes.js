const express = require('express');
const router = express.Router();
const { createIssue, getIssues, updateIssue, deleteIssue } = require('../controllers/issueController'); // Import controller functions

// Define routes for issues API
router.post('/', createIssue);            // POST /issues - Create a new issue
router.get('/', getIssues);               // GET /issues - Get all issues
router.get('/:type', getIssues);          // GET /issues/:type - Get issues by type
router.put('/:id', updateIssue);          // PUT /issues/:id - Update an issue by ID
router.delete('/:id', deleteIssue);       // DELETE /issues/:id - Delete an issue by ID

module.exports = router;