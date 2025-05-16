const express = require('express');
const connectDB = require('./config/database');
const studentRoutes = require('./routes/routes');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

connectDB();
app.use(cors());
app.use(express.json());
app.use('/api', studentRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
