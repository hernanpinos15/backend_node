const express = require('express');
const app = express();

const { config } = require('./config/index');

app.get('/', function (req, res) {
    res.send('hello world');
});

app.get('/json', function (req, res) {
    res.json({ hello: 'world' });
});

app.get('/challenge/:year', function (req, res) {
    let { year } = req.params;
    res.json({ year: `${year}`, result: `${((year % 4 === 0 && year !== 0) || year % 400 === 0) ? 'si es bisiesto' : 'no es bisiesto'}` });
});

app.listen(config.port, function () {
    console.log(`Listening http://localhost:${config.port}`);
});
