const express = require('express');
const res = require('express/lib/response');
const app = express();
const morgan = require('morgan');

app.use(morgan('dev'));


app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    next();
})
app.use('/dogs', (req, res, next) => {
    console.log('Ilove dogs');
    next();
})
const verifyPassword = ((req, res, next) => {
    const { password } = req.query;
    if (password === 'chickennugget') {
        next();
    } else {
        res.send('Sorry incorrect password!');
    }
})



app.get('/', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`);
    res.send('Home Page!');
})
app.get('/dogs', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`);

    res.send('Woof!');
})
app.get('/secret', verifyPassword, (req, res) => {
    res.send('My secret is : Sometimes i eat!');
})


app.use((req, res) => {
    res.status(404).send('Not Found!');
})
app.listen(3000, () => {
    console.log('Listening to port 3000!');
})