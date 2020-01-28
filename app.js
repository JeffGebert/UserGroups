require('dotenv').config();

const PORT = process.env.DB_PORT;
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const { Pool } = require('pg');
const bodyParser = require('body-parser')



const usersRouter = require('./routes/users');
const groupsRouter = require('./routes/groups');
const groupmembersRouter = require('./routes/groupmembers');


const app = express();
const connectionString = process.env.DATABASE_URL
const db = new Pool({
  connectionString: connectionString,
 
});




db.connect();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use('/', usersRouter(db));
app.use('/users', usersRouter(db));
app.use('/groups', groupsRouter(db));
app.use('/groupmembers',groupmembersRouter(db));


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
