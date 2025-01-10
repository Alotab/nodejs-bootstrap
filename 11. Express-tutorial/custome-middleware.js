const express = require('express');

const app = express();

const requestTimesLogger = (req, res, next) => {
    const timestamp = new Date().toISOString();

    console.log(`${timestamp} from ${req.method} to ${req.url}`)

    next();
};

app.use(requestTimesLogger);


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