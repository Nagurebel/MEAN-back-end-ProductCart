let express = require('express');
let mongoose = require('morgan')
let cors = require('cors');

let PORT = process.env.PORT || 3000;

let userRouter = require('./routes/user')
let productRouter = require('./routes/product')


let app = express();

app.use(cors());

require('./config/db')


// Body-parser middleware
app.use(express.urlencoded({
    extended: true
}))

// Json middleware
app.use(express.json());

// router Middleware
app.use('/user', userRouter)
app.use('/products', productRouter)


app.get('/', (req, res, next) => {
    res.send('Express')
})

app.get('/test', (req, res, next) => {
    res.json({
        message: 'Test is working',
        data: null
    })
})

app.use((err, req, res, next) => {
    res.status(500).json({
        error: true,
        message: err.message,
        data: null
    });
});

app.listen(PORT, () => {
    console.log(`Listening to the server on http://localhost:${PORT}`);
})