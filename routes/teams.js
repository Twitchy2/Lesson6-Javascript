//use express routing

var express = require('express');
var router = express.Router();


//link teamSchema

var Team = require('../models/team');


/* GET home page. */
router.get('/', function(req, res, next) {
  Team.find(function(err, teams) {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //load teams
      res.render('team', {
        title: 'Playoff Teams',
         teams: teams
       });
    }
  })

});
/* display add a team */
router.get('/add', function(req, res, next) {
    // load blank form
    res.render('add-team', {
      title: 'Add A New Team'
    });
});

/*Post*/
router.post('/add', function(req,res,next) {
    //use monggonse model to add new record
      Team.create( {
        city: req.body.city,
        nickname: req.body.nickname,
        wins: req.body.wins,
        losses: req.body.losses
      }, function(err, Team) {
        if (err) {
          console.log(err);
          res.redirect('/error');
        }
        else {
          //redirected ot updated teams
          res.redirect('/');
        }
      });
    //redirect to updated teams view

});

module.exports = router;
