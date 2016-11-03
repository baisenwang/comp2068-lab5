// use express routing
var express = require('express');
var router = express.Router();

// link to the Team model
var Team = require('../models/team');

// GET teams home page - show list of teams
router.get('/', isLoggedIn,function(req, res, next) {
    // use Team model to get the list of teams from MongoDB
    Team.find(function(err, teams) {
       if (err) {
           console.log(err);
           res.redirect('error');
       }
        else {
           // load teams.ejs view
           res.render('teams', {
               title: 'Playoff Teams',
               teams: teams,
               user: req.user
           })
       }
    });
});

router.get('/add',isLoggedIn,function(req,res,next){
    res.render('add-team',{
        title:'Add a New Team',
        user: req.user
    })
})
router.post('/add',isLoggedIn,function(req,res,next){
    Team.create({
        city: req.body.city,
        nickname:req.body.nickname,
        wins:req.body.wins,
        losses:req.body.losses
    }, function(err,Team){
        if(err){
            console.log(err);
            res.redirect('/error');
        }
        else{
            res.redirect('/teams');
        }
    });
})
router.get('/delete/:id', isLoggedIn,function(req, res, next){
    var id = req.params.id;
    Team.remove({
        _id:id
    }, function(err){
        if(err){
            console.log(err);
            res.render('error');
        }
        else{
            res.redirect('/teams');
        }
    })
});
router.get('/:id',isLoggedIn, function(req,res,next){
    var id = req.params.id;

    Team.findById(id, function(err,team){
        if(err){
            console.log(err);
            res.render('error');
        }
        else{
            res.render('edit-team',{
                title: 'Team Details',
                team: team,
                user: req.user
            })
        }
    })

});
router.post('/:id',isLoggedIn, function(req,res,next){
    var id = req.params.id;

    var team = new Team({
        _id:id,
        city:req.body.city,
        nickname:req.body.nickname,
        wins:req.body.wins,
        loses:req.body.losse
    });

    Team.update({_id:id},team, function(err){
        if(err){
            console.log(err);
            res.render('/error');
        }
        else{
            res.redirect('/teams');
        }
    })
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.redirect('/login');
    }
}



// make public
module.exports = router;
