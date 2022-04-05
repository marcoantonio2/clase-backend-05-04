const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
require('dotenv').config();

app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/api/', require('./routes/contacts.js'));

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
    console.log(`servidor corriendo en el puerto ${app.get('port')}`);
});