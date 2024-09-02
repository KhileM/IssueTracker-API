const mongoose = require('mongoose');

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING, { // Connect using connection string from environment variables
      useNewUrlParser: true, // Use the new URL parser to avoid deprecation warnings
      useUnifiedTopology: true, // Use the new Server Discover and Monitoring engine
    });
    console.log('Connected to MongoDB Atlas'); // Log successful connection
  } catch (err) {
    console.error('Could not connect to MongoDB Atlas', err); // Log errors if connection fails
    process.exit(1); // Exit process with failure code
  }
};

module.exports = connectDB;