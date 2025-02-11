/* eslint-disable no-undef */
const express = require('express');
const tourRoutes = require('./routes/tourRoutes');
const app = express();

// Adding the data that in conguration to proccess.env

// MiddleWares
// Middle wares
let date;
app.use(express.json());
// Add CreatedAt middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString(); // Store request time as a string
  next();
});


app.use(express.static(`${__dirname}/public`));
//  Routes
app.use('/reviews', tourRoutes);

//listen to server
module.exports = app;
