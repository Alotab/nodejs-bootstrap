const express = require('express');
// const path = require('path');

const app = express();

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

app.get('/', (req, res)=> {
    res.json({
        message: 'Welcome to our homw page'
    })
});


app.get('/get', (req, res) => {
    res.json(books)
});

app.get('/get/:id', (req, res) => {
    const book = books.find(item => item.id == req.params.id)

    if (book) {
        res.status(200).json(book)
    } else {
        res.status(404).json({
            message:'Book with Id: found'
        });
    }
});

//add new book
app.post('/add', (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: `Book ${books.length + 1}`
    }
    books.push(newBook);
    res.status(200).json({
        data: newBook,
        message: 'New book is added successfully',
    });
})

const port = 3000
app.listen(port, () => {
    console.log('server is listening');
})