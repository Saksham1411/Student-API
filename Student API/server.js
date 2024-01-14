const express = require('express');
const app = express();
const mongoose = require('mongoose');
const StudentRoute = require('./routes/Students');
const UserRoute = require('./routes/User');
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//routes
app.use('/',UserRoute);
app.use('/', StudentRoute);

mongoose.connect('mongodb://127.0.0.1:27017/endTerm').then(console.log('connected'));
app.listen(3000, () => console.log('server is running'))