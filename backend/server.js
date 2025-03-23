
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Path to the responses JSON file
const responsesFilePath = path.join(__dirname, 'responses.json');

// Serve the JSON data from the backend
app.get('/api/guitar-bot', (req, res) => {
  fs.readFile(responsesFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading responses file' });
    }
    const responses = JSON.parse(data);
    const userInput = req.query.input ? req.query.input.toLowerCase().trim() : '';
    const botResponse = responses[userInput] || responses["default"];
    res.json({ response: botResponse });
  });
});

// Serve the static frontend files
app.use(express.static(path.join(__dirname, '../public')));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
