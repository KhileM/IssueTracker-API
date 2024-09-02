require('dotenv').config(); // Load environment variables
const connectDB = require('./config/db'); // Import database connection function
const app = require('./index'); // Import Express app

connectDB(); // Connect to MongoDB

const PORT = process.env.PORT || 3000; // Set port from environment variables or default to 3000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)); // Start server and log the port
