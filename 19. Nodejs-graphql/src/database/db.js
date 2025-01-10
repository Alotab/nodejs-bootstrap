const mongoose = require('mongoose');

// const connectDB = async()=>{
//     try{
//         await mongoose.connect(process.env.MONGO_DB_URL);
//         console.log('MongoDB connected successfully')

//     }catch(err){
//         console.error('Mongo connection failed'. err);
//         process.exit(1)
//     }
// }

// module.export = connectDB;


const connectionToDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("MonDB connected successfully");

    } catch(e){
        console.error('MongoDB connection failed');
        process.exit(1);
    };
}

module.exports = connectionToDB;
