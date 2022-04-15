const mongoose = require('mongoose');

const dbConnection = async ()=>{
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log('Database connected successfully...');
    }catch(e){
        console.log(e);
    }
}

module.exports = dbConnection;