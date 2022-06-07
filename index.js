const express = require('express');
const app = express();
const morgan = require('morgan');
const AppError = require('./AppError');



app.use(morgan('tiny'));


app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    next();
})
app.use('/dogs', (req, res, next) => {
    console.log('I love dogs');
    next();
})
const verifyPassword = ((req, res, next) => {
    const { password } = req.query;
    if (password === 'chickennugget') {
        next();
    } else {
        // res.send('Sorry incorrect password!')
        // res.status(401)
        // throw new Error('Password required');
        throw new AppError('Password Required!', 401);
    }
})



app.get('/', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`);
    res.send('Home Page!');
})

app.get('/error', (req, res) => {
    chicken.fly();
})




app.get('/dogs', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`);

    res.send('Woof!');
})
app.get('/secret', verifyPassword, (req, res) => {
    res.send('My secret is : Sometimes i eat!');
})
app.get('/admin', (req, res) => {
    throw new AppError('You are not an Admin!', 403)
})

app.use((req, res) => {
    res.status(404).send('Not Found!');
})
// app.use((err, req, res, next) => {
//     console.log('****************************')
//     console.log('***********ERROR************')
//     console.log('****************************')
//     // res.status(500).send("OHH BOY! WE GOT AN ERROR!!!!!!!");
//     // console.log(err)
//     next(err)
// })
app.use((err, req, res, next) => {
    const { status = 500, message = 'Something went Wrong!' } = err;
    res.status(status).send(message);
})

app.listen(3000, () => {
    console.log('Listening to port 3000!');
})