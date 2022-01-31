require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgon = require('morgan');

const config = require('./app/config');
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
if(process.env.NODE_ENV !== 'production'){
  app.use(morgon('dev'))
}
app.use(require('./app/routes'));

app.listen(config.serverPort, () => {
  console.log("Server is running", config.serverPort)
});


module.exports = app;