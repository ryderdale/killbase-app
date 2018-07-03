let fs = require('fs');
let express = require('express'); 
let path = require('path'); 
let usersPath = path.join(__dirname, 'postgres://localhost/killbase');
let app = express();
let bodyParser = require('body-parser');
app.use(express.static('static'));
let port = process.env.PORT || 8000;
const env = process.env.NODE_ENV || 'development';
console.log('dfasdfa this is where we are begining testing')
console.log(env);
const config = require('./knexfile')[env];
console.log(config);
const knex = require('knex')(config);
app.disable('x-powered-by');



app.use(function(req, res, next) {
    //validate user id to see if this is a valid user.
    next();
});

// app.use(function parseBody(req, res, next) {
//     let bodyString = req.body;
//     let bodyObj = JSON.parse(bodyString;
//     Object.keys(bodyObj).forEach(function (key) {
//         req.body[key] = bodyObj[key];
//         console.log
//     }))
// })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// app.use(morgan(type));

// function morgan (type) {
//     switch (type) {
//         case "short":
//             console.log("time: res 200 short")
//             break;
//         case "medium":
//             console.log("time: res 200 medium")
//         case "long":
//             console.log("time: res 200 long")
//         default:
//             break;
//     }
//     return function (req, res, next) {
//         next()
//     }
// }

app.get("/", function (req, res) {
    res.send('index.html')
    // res.send('please specifcy an object, whether assassins, clients, contracts, or targets')
})

app.post('/users', function(req, res) {
    console.log('Request body:', req.body);
    knex('users').insert(req.body)
        .then(() => {
            return knex('users').where('email',req.body.email).andWhere('password',req.body.password)
        })
        .then((user_object)=> {
            res.status(200).send(user_object)
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send({ error });
      });
});

app.post("/users/login", function (req, res) {
    console.log(req.body);
    knex('users').where('email', req.body.email).andWhere('password', req.body.password)
    .then((user_object) => {
        console.log(user_object);
        res.status(200).send(user_object)
    })
    .catch((error) => {
        res.status(500).send(error)
      });
})

app.post('/submit-volunteer-opportunity', function(req, res) {
    console.log('Request body:', req.body);
    knex('volunteer_opportunities').insert(req.body)
        .then((data) => {
            res.status(200).send(data);
      })
        .catch((error) => {
            console.error(error);
            res.status(500).send({ error });
      });
});


app.get('/get-volunteer-opportunities', (request, response) => {
    knex('volunteer_opportunities').select()
      .then((volOpps) => {
        response.status(200).send(volOpps);
      })
      .catch((error) => {
        response.status(500).send({ error });
      });
  });

app.delete('/delete-volunteer-opportunity', (request, response) => {
knex('volunteer_opportunities').where('volunteer_opportunity_id', request.body.volunteer_opportunity_id).del()
    .then(() => {
    response.status(200);
    })
    .catch((error) => {
    response.status(500).json({ error });
    });
});

app.put('/edit-volunteer-opportunity-form', (request, response) => {
    knex('volunteer_opportunities').where('volunteer_opportunity_id', request.body.volunteer_opportunity_id)
      .then((volOpps) => {
            console.log(volOpps);
            response.status(200).send(volOpps);
      })
      .catch((error) => {
        response.status(500).json({ error });
      });
  });

app.put('/edit-volunteer-opportunity-submit', (request, response) => {
    knex('volunteer_opportunities').where('volunteer_opportunity_id', request.body.volunteer_opportunity_id).update(request.body)
    .then((volOpps) => {
        console.log(volOpps);
        response.status(200);
    })
    .catch((error) => {
    response.status(500).json({ error });
    });
});
    
app.put('/volunteer-opportunity-user-commit', (request, response) => {
    console.log('request received')
    knex('volunteer_opportunities').where('volunteer_opportunity_id', request.body.volunteer_opportunity_id)
    .update({
        volunteers_count: knex.raw('volunteers_count + 1')
    })
    .then( () => {
        response.status(200)
    })
    .catch((error) => {
    response.status(500).json({ error });
    });
});


app.listen(port, function() {
    console.log('Listening on port', port);
    });
     
module.exports = app;
