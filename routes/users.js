var express = require('express');
var router = express.Router();

var Account = require('../models/account');

/* GET users listing. */
router.get('/', isLoggedIn,function(req, res, next) {
  Account.find(function(err, accounts) {
    if (err) {
      console.log(err);
      res.redirect('error');
    }
    else {
      res.render('users', {
        title: 'Accounts',
        accounts: accounts,
        user: req.user
      })
    }
  });
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  else{
    res.redirect('/login');
  }
}

module.exports = router;
