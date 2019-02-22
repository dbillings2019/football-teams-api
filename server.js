var express = require('express');
var app = express();
var db = require('./models');

app.use(express.urlencoded({extended: false}));

app.get('/teams', function (req, res) {
    // console.log();
    db.team.findAll().then (function (teams) {
        res.json(teams);
    })
});

app.post('/teams', function (req, res) {
    db.team.create({
        name: req.body.name,
        conference: req.body.conference,
        city: req.body.city
    }).then (function(teams) {
        res.json({status: "inserted"});
    })
});

app.get('/teams/:id', function (req, res) {
    db.team.findById(req.params.id).then (function(team) {
        res.json(team);
    })
});

app.put('/teams/:id', function (req, res) {
    db.team.update({
        name: req.body.name,
        conference: req.body.conference,
        city: req.body.city
    } , {where: {id: req.params.id}}).then (function(team){
        res.json(team);
    })
});

app.delete('/teams/:id', function (req, res) {
    db.team.destroy({
        where: {id: req.params.id}
    }).then(function(team) {
        res.redirect('/teams');
    })
})

app.listen(3000);