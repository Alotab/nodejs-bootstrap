const mongoose = require('mongoose');

const connectToDB = async() => {
    try {
        await mongoose.connect(
            "mongodb+srv://codingctrl:u8Wdpxc8vYXX0fAk@cluster0.t0smi.mongodb.net/"
        );
        console.log('MongoDB is connected successfully')

    } catch(error) {
        console.log('MongoDB connection failed', error)
        process.exit(1);
    }
};

module.exports = connectToDB;

