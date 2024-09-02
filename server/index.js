const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const app = express();
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Connect to MongoDB using the connection string from environment variables
mongoose.connect(process.env.MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Could not connect to MongoDB Atlas', err));

// Define the schema and model for Issue (redundant, should be defined in models/Issue.js)
const IssueSchema = new mongoose.Schema({
    title: String,
    description: String,
    type: String
});
const Issue = mongoose.model('Issue', IssueSchema);

app.use(bodyParser.json()); // Parse incoming JSON requests

// Define API routes directly in index.js (consider moving to routes)
app.post('/issues', async (req, res) => {
    const issue = new Issue(req.body);
    await issue.save();
    res.status(201).json(issue);
});

app.get('/issues', async (req, res) => {
    try {
        const { type } = req.query;
        const issues = type ? await Issue.find({ type }) : await Issue.find({});
        res.json(issues);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/issues/:type', async (req, res) => {
    try {
        const { type } = req.params;
        const issues = await Issue.find({ type });
        res.json(issues);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.put('/issues/:id', async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send('Invalid ID');
    }
    try {
        const issue = await Issue.findByIdAndUpdate(id, req.body, { new: true });
        if (!issue) {
            return res.status(404).send('Issue with the given ID was not found');
        }
        res.status(200).json(issue);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.delete('/issues/:id', async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send('Invalid ID');
    }
    try {
        const issue = await Issue.findByIdAndDelete(id);
        if (!issue) {
            return res.status(404).send('Issue with the given ID was not found');
        }
        res.status(204).json(issue);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = { app, Issue };

