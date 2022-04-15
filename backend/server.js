require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const dbConnection = require('./utils/dbConnection');


const PORT = process.env.PORT || 8000;



const app = express();
dbConnection();
app.use(express.json());
app.use(cookieParser());






// routes
const authRoute = require('./routes/auth');
const roomsRoute = require('./routes/rooms');


app.use('/auth', authRoute);
app.use(roomsRoute);





app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})
