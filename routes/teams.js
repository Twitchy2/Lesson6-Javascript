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
//get
router.get('/delete/:id', function(req,res,next) {
  //get id parameter
  var id = req.params.id;

  //render
  Team.remove ( {
    _id: id
  }, function(err) {
    if (err) {
    console.log(err);
    res.render('/error');
  }
  else {
      res.redirect('/teams');
    }
  });
});

//get edit page

router.get('/:id', function(req,res,next) {
              //get teams
              var id = req.params.id;

              Team.findById(id, function(err, team) {
                if (err) {
                  console.log(err);
                  res.render('error');
                }
                else {

              //load it
              res.render('edit-teams', {
                title: 'Team Details',
                team: team
              });
            }
          });
        });

      //post time
router.post('/:id', function(req,res,next) {
        //get id
        var id = req.params.id;

        //create a new team    object and populate
        var team = new Team( {
          _id: id,
          city: req.body.city,
          nickname: req.body.nickname,
          wins: req.body.wins,
          losses: req.body.losses
        });
        //try to updated
        Team.update({
          _id: id }, team, function(err) {
            if (err) {
              console.log(err);
              res.render('/error');
            }
            else {
              res.redirect('/teams');
            }
          })
      });


module.exports = router;
