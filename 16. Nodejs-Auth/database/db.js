const mongoose = require('mongoose');


const connectionToDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MonDB connected successfully");

    } catch(e){
        console.error('MongoDB connection failed');
        process.exit(1);
    };
}

module.exports = connectionToDB;


