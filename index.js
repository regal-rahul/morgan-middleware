const express = require('express');
const app = express();
const morgan = require('morgan');

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
        throw new Error('Password required');
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


app.use((req, res) => {
    res.status(404).send('Not Found!');
})
app.use((err, req, res, next) => {
    console.log('****************************')
    console.log('***********ERROR************')
    console.log('****************************')
    // res.status(500).send("OHH BOY! WE GOT AN ERROR!!!!!!!");
    // console.log(err)
    next(err)
})

app.listen(3000, () => {
    console.log('Listening to port 3000!');
})