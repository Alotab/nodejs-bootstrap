const express = require('express');
const app = express();


// middleware
app.use(express.json)


let books = [
    {
        id:1,
        title: 'Book 1'
    },
    {
        id:2,
        title: 'Book 2'
    }
];

//Home page
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to our homw page'
    })
});

//get all books
app.get('/get', (req, res) => {
    res.json(books)
});

const port = 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})