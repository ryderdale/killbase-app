const fs = require('fs');
const express = require('express'); 
const path = require('path'); 
const usersPath = path.join(__dirname, 'postgres://localhost/killbase');
const app = express();
const bodyParser = require('body-parser');
app.use(express.static('static'));
const port = process.env.PORT || 8000;
const env = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[env];
const knex = require('knex')(config);
app.disable('x-powered-by');


app.use(function(req, res, next) {
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const users = require('./routes/users');
const volunteerOpps = require('./routes/volunteer-opportunities');
const volunteers = require('./routes/volunteers');

app.use('/users', users);
app.use('/volunteer-opportunities', volunteerOpps);
app.use('/volunteers', volunteers);

app.use(function(req, res) {
    res.sendStatus(404);
  });

app.get("/", function (req, res) {
    res.send('index.html')
})




app.listen(port, function() {
    console.log('Listening on port', port);
    });
     
module.exports = app;
