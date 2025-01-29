const fs = require('fs');

// Path to the text file
const filePath = 'apis.txt';

// Function to read the file and print the lines
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  // Split the file contents by line breaks and store in a list
  const lines = data.split('\n');

  // Print the list of lines to the terminal
  console.log(lines);
});
