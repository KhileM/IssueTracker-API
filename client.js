const axios = require('axios'); // Import axios for making HTTP requests
const readlineSync = require('readline-sync'); // Import readline-sync for synchronous user input

// Main function to drive the CLI application
async function main() {
  let action;
  while (action !== 'exit') { // Continue until the user chooses to exit
    // Prompt user to choose an action
    action = readlineSync.question('Choose action [create, read, update, delete, exit]: ');

    // Perform action based on user input
    switch (action) {
      case 'create':
        handleCreate(); // Call function to handle creating an issue
        break;
      case 'read':
        handleRead(); // Call function to handle reading issues
        break;
      case 'update':
        handleUpdate(); // Call function to handle updating an issue
        break;
      case 'delete':
        handleDelete(); // Call function to handle deleting an issue
        break;
      case 'exit':
        console.log('Exiting...'); // Notify user that the application is exiting
        break;
      default:
        // Handle invalid input
        console.log('Invalid action. Please enter create, read, update, delete, or exit.');
        break;
    }
  }
}

// Function to handle creating a new issue
async function handleCreate() {
  // Prompt user for issue details
  const title = readlineSync.question('Enter title (min 3 characters): ');
  const description = readlineSync.question('Enter description: ');
  const type = readlineSync.question('Enter type [bug, refacto, feature]: ');

  try {
    // Send POST request to create a new issue
    const res = await axios.post('http://localhost:3000/issues', { title, description, type });
    console.log(res.data); // Output the created issue data
  } catch (err) {
    console.error(err.message); // Handle and display errors
  }
}

// Function to handle reading issues
async function handleRead() {
  // Prompt user for type of issues to read or leave blank to read all
  const type = readlineSync.question('Enter issue type to read [bug, refacto, feature] or press Enter to read all: ');
  const url = type ? `http://localhost:3000/issues/${type}` : 'http://localhost:3000/issues';

  try {
    // Send GET request to fetch issues
    const res = await axios.get(url);
    console.log(res.data); // Output the fetched issues data
  } catch (err) {
    console.error('Error fetching issues:', err.message); // Handle and display errors
  }
}

// Function to handle updating an issue by ID
async function handleUpdate() {
  // Prompt user for issue ID and new details
  const id = readlineSync.question('Enter ID to update: ');
  const title = readlineSync.question('Enter new title (min 3 characters): ');
  const description = readlineSync.question('Enter new description: ');
  const type = readlineSync.question('Enter new type [bug, refacto, feature]: ');

  try {
    // Send PUT request to update the issue
    const res = await axios.put(`http://localhost:3000/issues/${id}`, { title, description, type });
    console.log(res.data); // Output the updated issue data
  } catch (err) {
    handleError(err); // Handle and display errors
  }
}

// Function to handle deleting an issue by ID
async function handleDelete() {
  // Prompt user for issue ID to delete
  const id = readlineSync.question('Enter ID to delete: ');

  try {
    // Send DELETE request to remove the issue
    await axios.delete(`http://localhost:3000/issues/${id}`);
    console.log('Deleted successfully'); // Notify user of successful deletion
  } catch (err) {
    handleError(err); // Handle and display errors
  }
}

// Function to handle errors from HTTP requests
function handleError(err) {
  if (err.response) {
    // Check the HTTP response status code and provide specific error messages
    switch (err.response.status) {
      case 400:
        console.error('Invalid ID'); // Handle bad request errors
        break;
      case 404:
        console.error('Issue not found'); // Handle not found errors
        break;
      default:
        console.error('Error:', err.message); // Handle other errors
    }
  } else {
    console.error('Error:', err.message); // Handle errors without response
  }
}

// Start the CLI application
main();