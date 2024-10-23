const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const ruleRoutes = require('./routes/ruleRoutes');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));



// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
 .then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.error("Error connecting to MongoDB", err);
});

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for serving the index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './views/index.html'));
});
app.use('/api/rules', ruleRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
