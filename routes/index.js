var express = require('express');
var router = express.Router();


var Account = require('../models/account');
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Lesson 8',
    message: 'Starting CRUD with MongoDB',
    user: req.user
  });
});

/* GET register page. */
router.get('/register', function(req, res, next) {
  res.render('register', {
    title: 'Register',
    user: req.user
  });
});
/* GET login page. */
router.get('/login', function(req, res, next) {
  if (req.user) {
    res.redirect('/teams');
  }
  else{
    res.render('login', {
      'title': 'Login',
      failureMessage:'',
      user: req.user
    });
  }
});

/* POST register page */
router.post('/register', function(req,res,next) {
  // create a new account
  Account.register(new Account({ username: req.body.username}), req.body.password,
      function(err,account){
        if(err) {
          console.log(err);
          res.redirect('/error');
        }
        else{
          res.redirect('/login');
        }
      }
  );
});

router.post('/login', passport.authenticate('local',
    {
      successRedirect: '/teams',
      failureRedirect: '/login',
      failureMessage: 'Invalid Login'
    }
));

router.get('/logout',function(req,res,next){
  req.logout();
  res.redirect('/login');
});

module.exports = router;
