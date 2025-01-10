require('dotenv').config();
const express = require('express');
const connectionToDB = require("./database/db");
const authRoutes = require('./routes/auth-routes');
const homeRoutes = require('./routes/home-routes');
const adminRoutes = require('./routes/admin-routes');
const uploadImageRoutes = require("./routes/image-routes");


// connect to mongo database
connectionToDB();


const app = express();
const port = process.env.PORT || 3000;


//middleware
app.use(express.json());

// connect to endpoints
app.use('/api/auth', authRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/image', uploadImageRoutes);


app.listen(port, () =>{
    console.log(`Server is listening on port ${port}`);
});