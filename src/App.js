//import React from 'react';
//import './App.css';
//import Route from './Routes';
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bluebird = require('bluebird');
var fs = require('fs');

var cors = require('cors');

var indexRouter = require('./Routes');
var apiRouter = require('./routes/user');
const { AppsSharp } = require('@material-ui/icons');

var app = express();

app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);
app.use('/', indexRouter);


if (process.env.NODE_ENV === 'Development'){
  require('./config').config();
}

var mongoose = require('mongoose')
mongoose.Promise = bluebird;
let url =`${process.env.DATABASE1}${process.env.DATABASE2}=${process.env.DATABASE3}=${process.env.DATABASE4}`
//let url =`mongodb+srv://test:test123456@cluster0.cgrua.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
console.log("BD",url);
let opts = {
  useNewUrlParser : true,
  connectTimeoutMS:20000,
  useUnifiedTopology: true
};

mongoose.connect(url,opts)
.then(() => {
  console.log('conexion exitosa a MONGO DB YEEEEAAAAAHHH')
})
.catch((e)=>{
  console.log(e);
  console.log(`error al conectar a mongo DB....`)
  
})

app.use( function (err, req, res, next){
  res.locals.message = err.message;
  res.locals.error =req.app.get(`env`)===`Development` ? err : {};
  res.status(err.status || 500);
  res.render(`error`);
})

var port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Servodpr de ABM iniciado en puerto `, port)
})
module.exports = app;
/*
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://test:<password>@cluster0.cgrua.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
*/
//function App() {
//  return (
//    <div className="App">
//      <Route />
//    </div>
//  );
//}

//export default App;
