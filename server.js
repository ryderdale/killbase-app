let fs = require('fs');
let express = require('express'); 
let path = require('path'); 
let usersPath = path.join(__dirname, 'postgres://localhost/killbase');
let app = express();
var bodyParser = require('body-parser')

let port = process.env.PORT || 8000;
const env = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[env];
const knex = require('knex')(config);

// let morgan = require('morgan');



//im not sure what this does
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

app.use(bodyParser.json({type: 'application/json'}));

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
    res.send('please specifcy an object, whether assassins, clients, contracts, or targets')
})

//return an object with a list of all the assassins 
app.get('/assassins', (request, response) => {
    knex('assassins').select()
      .then((assassins) => {
        response.status(200).json(assassins);
      })
      .catch((error) => {
        response.status(500).json({ error });
      });
  });

  app.get('/clients', (request, response) => {
    knex('assassins').select()
      .then((assassins) => {
        response.status(200).json(assassins);
      })
      .catch((error) => {
        response.status(500).json({ error });
      });
  });





// app.get('/assassins', function(req, res) {
//     fs.readFile(usersPath, 'utf8', function(err, userData) {
//         if (err) {
//           console.error(err.stack);
//           //need to check to see what .stack is
//           return res.sendStatus(500);
//         }
//         let users = JSON.parse(userData);
//         res.send(users);
//         });
//     });

//return an object with a list of all the clients 
app.get('/clients', function(req, res) {
    fs.readFile(usersPath, 'utf8', function(err, userData) {
        if (err) {
          console.error(err.stack);
          //need to check to see what .stack is
          return res.sendStatus(500);
        }
        let users = JSON.parse(userData);
        res.send(users);
        });
    });


//return an object with a list of all the targets 
app.get('/targets', function(req, res) {
    fs.readFile(usersPath, 'utf8', function(err, userData) {
        if (err) {
          console.error(err.stack);
          //need to check to see what .stack is
          return res.sendStatus(500);
        }
        let users = JSON.parse(userData);
        res.send(users);
        });
    });

//return an object with a list of all the targets 
app.get('/contracts', function(req, res) {
    fs.readFile(usersPath, 'utf8', function(err, userData) {
        if (err) {
          console.error(err.stack);
          //need to check to see what .stack is
          return res.sendStatus(500);
        }
        let users = JSON.parse(userData);
        res.send(users);
        });
    });

//retrun favorites lists specific to a user id. such as whenever the user is looking at buinessses 
app.get('/assassins/:id', function(req, res) {
    fs.readFile(usersPath, 'utf8', function(err, userData){
        if (err) {
        console.error(err.stack);
        return res.sendStatus(500);
        }

        let id = Number.parseInt(req.params.id);
        let users = JSON.parse(userData);

        if (id < 0 || id >= Object.keys(users).length || Number.isNaN(id)) {
            res.sendStatus(404);
            res.send('invalid user ID');
            
        }
        else {
            res.set('Content-Type', 'application/json');
            res.send(users[id]);
        }
    });
});

//return following lists specific to a user id. such as whenever the user is looking at buinessses 
app.get('/clients/:id', function(req, res) {
    fs.readFile(favoritesPath, 'utf8', function(err, petsData){
        if (err) {
        console.error(err.stack);
        return res.sendStatus(500);
        }
    
        let id = Number.parseInt(req.params.id);
        let pets = JSON.parse(petsData);
    
        if (id < 0 || id >= pets.length || Number.isNaN(id)) {
            return res.sendStatus(404);
        }
        res.set('Content-Type', 'application/json');
        //returns array with jason file of all business the user is following 
        res.send(following[id]);
    });
});

//return following lists specific to a user id. such as whenever the user is looking at buinessses 
app.get('/targets/:id', function(req, res) {
    fs.readFile(favoritesPath, 'utf8', function(err, petsData){
        if (err) {
        console.error(err.stack);
        return res.sendStatus(500);
        }
    
        let id = Number.parseInt(req.params.id);
        let pets = JSON.parse(petsData);
    
        if (id < 0 || id >= pets.length || Number.isNaN(id)) {
            return res.sendStatus(404);
        }
        res.set('Content-Type', 'application/json');
        //returns array with jason file of all business the user is following 
        res.send(following[id]);
    });
});

//return following lists specific to a user id. such as whenever the user is looking at buinessses 
app.get('/contracts/:id', function(req, res) {
    fs.readFile(favoritesPath, 'utf8', function(err, petsData){
        if (err) {
        console.error(err.stack);
        return res.sendStatus(500);
        }
    
        let id = Number.parseInt(req.params.id);
        let pets = JSON.parse(petsData);
    
        if (id < 0 || id >= pets.length || Number.isNaN(id)) {
            return res.sendStatus(404);
        }
        res.set('Content-Type', 'application/json');
        //returns array with jason file of all business the user is following 
        res.send(following[id]);
    });
});


app.post('/assassins', function(req, res) {
    fs.readFile(usersPath, 'utf8', function(err, userData){
        if (err) {
            console.error(err.stack);
            return res.sendStatus(500);
        };

        let users = JSON.parse(userData);

        let userID = 1;
        while (users.hasOwnProperty(userID)) {
            userID = Math.floor(Math.random()*10000000000000000);
        }

        let username = req.body.username;
        let email = req.body.email;
        let password = req.body.password;

        let newUser = {
        userID,
        username,
        email,
        password,
        };

        //password encryption algorythm 
        // seed = devurandom.read(160/8)
        // counter = 0

        if (!username || !email || !password) {
            return res.sendStatus(400);
        }

        users[userID] = newUser;

        let newUsersJSON = JSON.stringify(users);
        
        fs.writeFile(usersPath, newUsersJSON, function(writeErr) {
            if (writeErr) {
                throw writeErr;
            };
            res.set('Content-Type', 'application/json');
            res.send(newUsersJSON); 
        });
    });
});

// app.patch('/pets/:id', function(req, res) {
//     fs.readFile(petsPath, 'utf8', function(err, petsData){
//         if (err) {
//         console.error(err.stack);
//         return res.sendStatus(500);
//         };

//         let id = Number.parseInt(req.params.id);
//         let pets = JSON.parse(petsData);

//         if (id < 0 || id >= pets.length || Number.isNaN(id)) {
//             return res.sendStatus(404);
//             }

        
//         console.log(req.body);

//         let age = req.body.age;
//         let kind = req.body.kind;
//         let name = req.body.name;


//         if (!name && !kind && !age) {
//         res.sendStatus(400);
//         return res.end('No patch values specified');
//         };

        
//         let changePet = pets[id];

//         if (age) {
//             changePet.age = age;
//         };
//         if (kind) {
//             changePet.kind = kind;
//         };
//         if (name) {
//             changePet.name = name;
//         };

//         pets.push(changePet);

//         let newPetsJSON = JSON.stringify(pets);

//         fs.writeFile(petsPath, newPetsJSON, function(writeErr) {
//         if (writeErr) {
//         throw writeErr;
//         };
//         });
// });
// });

// app.delete('/pets/:id', function(req, res) {
//     fs.readFile(petsPath, 'utf8', function(err, petsData){
//         if (err) {
//         console.error(err.stack);
//         return res.sendStatus(500);
//         };

//         let id = Number.parseInt(req.params.id);
//         let pets = JSON.parse(petsData);

//         if (id < 0 || id >= pets.length || Number.isNaN(id)) {
//             return res.sendStatus(404);
//             }
        
//         deletePet = pets[id];

//     })
// })



app.listen(port, function() {
    console.log('Listening on port', port);
    });
     
module.exports = app;
