const express = require('express');

const app = express();


// define middlesware function
const myfirstMiddleware = (req, res, next) => {
    console.log('this first middleware will run on every request');

    next()
};

app.use(myfirstMiddleware)

app.get('/', (req, res)=> {
    res.send('Home Page')
});

app.get('/about', (req, res)=> {
    res.send('about Page')
});

const port = 3000
app.listen(port, () => {
    console.log('server is active');
});




