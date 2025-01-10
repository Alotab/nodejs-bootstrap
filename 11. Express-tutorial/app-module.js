const express = require('express');

const app = express();


//application level settings
app.set('view engine', 'ejs');


//routing
app.get('/', (req, res) => {
    res.send('Home Page');
});

app.post('/api/data', (req, res) => {
    res.json({
        message: 'Data received',
        data: req.body
    })
});