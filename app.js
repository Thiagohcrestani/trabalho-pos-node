const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


mongoose.connect(process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, err => {
        if (err) throw err;
        console.log('Connected to MongoDB!!!')
    });

    
require('./api/models/endereco');
require('./api/models/pessoa');


const app = express();

const enderecosRoutes = require('./api/routes/enderecos');
const pessoasRoutes = require('./api/routes/pessoas');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/enderecos', enderecosRoutes);
app.use('/pessoas', pessoasRoutes);
app.use(morgan('dev'));

app.use('/api', (req, res, next) => {
    res.status(200).json({
        message: 'Hello word!'
    })
})

app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;