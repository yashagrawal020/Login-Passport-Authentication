const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const { default: mongoose } = require("mongoose");
const mogoose = require('mongoose');  
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const app = express();


// Passport Config
require('./config/passport')(passport);


//Db config
const db = require('./config/keys').MongoURI;

// Connect to mongoose
mongoose.connect(db)
    .then(() => console.log('Mongo db connected .. '))
    .catch(err => console.log(err));
// EJD
app.use(expressLayouts);
app.set('view engine','ejs');


//Body parser
app.use(express.urlencoded({extended:false})); 

// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );
  
  // Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());
  
  // Connect flash
  app.use(flash());


  // Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });


//Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT,console.log(`server started on port ${PORT}`));







// Mongodb
// yash.agrawal01@sap.com
// 9807319587