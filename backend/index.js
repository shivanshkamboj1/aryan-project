const express = require('express');
const http = require("http");
const socket = require('socket.io');
require('dotenv').config();

const connectDB = require('./config/database');
require("./config/passport"); 
require("./config/google"); 

const { cloudinaryConnect } = require("./config/cloudinary");

const profileRoutes = require('./routes/profileRoutes')
const userRoutes = require('./routes/userRoutes');
const roomRoutes = require('./routes/roomRoutes')
const setupSocketServer = require('./socket.js');

const cors = require('cors');
const passport = require("passport");
const cookieparser  = require("cookie-parser")
const fileUpload = require("express-fileupload");

const PORT = process.env.PORT || 4000;



const app = express();

const server = http.createServer(app);
app.use(cors({
  origin:["http://localhost:5173","http://localhost:3000"],
  credentials:true
}))
// ✅ Create Socket.io server
const io = socket(server, {
  cors: {
    origin: '*',
  }
});

// ✅ Connect database
connectDB();

// ✅ Use middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp" }));

// ✅ Routes
app.use('/api/user', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/room', roomRoutes);

// ✅ Passport
app.use(passport.initialize());

// ✅ Root
app.get('/', (req, res) => {
  res.send("api is working")
});

// ✅ Use your socket server logic
setupSocketServer(io);

// ✅ Start server
server.listen(PORT, () => {
  console.log(`server is running at ${PORT}`)
});
