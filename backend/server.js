const http = require("http");
const app = require('./index')
const server = http.createServer(app);
require("dotenv").configDotenv


server.listen(process.env.PORT,()=>{
    console.log("server is running at",process.env.PORT)
})