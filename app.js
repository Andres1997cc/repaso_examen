var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var session = require('express-session');
var flash = require('express-flash-notification');

var app = express();

//configurar mongoose
var db, db_address, mongoose;
mongoose = require('mongoose');
db_address = "127.0.0.1:27017/vinosws";

mongoose.connection.on("open", function (ref) {
    return console.log("Se conector el servidor");
});

mongoose.connection.on("error", function (err) {
    return console.log("No Se pudo conectar el servidor "+ err);
});

try {
    mongoose.connect("mongodb://" + db_address);
    db = mongoose.connection;
    console.log("Servidor levantado!!");
} catch (e) {
    console.log("No se levanto el servidor :(");
}

//fin configuracion monggose


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'ejemplo_vinos',
  resave: true,
  saveUninitialized: true
}));
app.use(flash(app));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//configurar sequelize
/*
var models = require('./models');
models.sequelize.sync().then( () => {
    console.log("Base de datos conectada");
}).catch(err => {console.log(err, "Hubo un error");});
*/
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
