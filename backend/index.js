const express = require('express');
const connectDB = require('./config/database');
require('dotenv').config();
require("./config/passport"); 
const {cloudinaryConnect } = require("./config/cloudinary");


const profileRoutes = require('./routes/profileRoutes')
const userRoutes = require('./routes/userRoutes');
const roomRoutes = require('./routes/roomRoutes')

const cors = require('cors');
const passport = require("passport");
const cookieparser  = require("cookie-parser")
const fileUpload = require("express-fileupload");

const app = express();
const PORT = process.env.PORT || 4000;

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieparser())

app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)
app.use('/api/user', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/room', roomRoutes);


app.use(passport.initialize());
app.get('/',(req,res)=>{
    res.send("api is working")
})
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
module.exports =  app;