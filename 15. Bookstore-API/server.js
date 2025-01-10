require('dotenv').config()
const express = require('express');
const connectToDB = require('./database/db');
const bookRoutes = require('./routes/book-routes');


const app = express();
const port = process.env.PORT || 3000




//connect to our database
connectToDB();

// middleware --> express.json()
app.use(express.json());

// routes
app.use('/api/books', bookRoutes)


app.listen(port, () => {
    console.log(`server is now running on port ${port}`)
})