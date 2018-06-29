let fs = require('fs');
let express = require('express'); 
let path = require('path'); 
let usersPath = path.join(__dirname, 'postgres://localhost/killbase');
let app = express();
let bodyParser = require('body-parser');
app.use(express.static('static'));
let port = process.env.PORT || 8000;
const env = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[env];
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
        .then((user) => {
            res.status(200).send(user.userId);
      })
        .catch((error) => {
            console.error(error);
            res.status(500).send({ error });
      });
});

// app.post("/users/login", function (req, res) {
//     let body = req.body;
//     // console.log(knex('users').select())
//     // where('email',body.email).andWhere('password',body.password))
//     .then((userId) => {
//         if(userId){
//             response.status(200).send(userId)
//         }
//         else{
//             response.status(404).send("invalid user login")
//         }
//     })
//     .catch((error) => {
//         response.status(500);
//       });
// })

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

//return an object with a list of all the assassins 
app.get('/assassins', (request, response) => {
    knex('assassins').select()
      .then((clients) => {
        response.status(200).json(clients);
      })
      .catch((error) => {
        response.status(500).json({ error });
      });
  });

  app.get('/resource-name', (request, response) => {
    knex('ressource-name').select()
      .then((resource) => {
        response.status(200).json(resource);
      })
      .catch((error) => {
        response.status(500).json({ error });
      });
  });


//return an object with a list of all the clients 
  app.get('/clients', (request, response) => {
    knex('clients').select()
      .then((clients) => {
        response.status(200).json(clients);
      })
      .catch((error) => {
        response.status(500).json({ error });
      });
  });


//return an object with a list of all the targets 
  app.get('/targets', (request, response) => {
    knex('targets').select()
      .then((targets) => {
        response.status(200).json(targets);
      })
      .catch((error) => {
        response.status(500).json({ error });
      });
  });

//return an object with a list of all the contracts
  app.get('/contracts', (request, response) => {
    knex('contracts').select()
      .then((contracts) => {
        response.status(200).json(contracts);
      })
      .catch((error) => {
        response.status(500).json({ error });
      });
  });

//return favorites lists specific to a assassin_id
app.get('/assassins/:id', function(req, res) {
    let id = Number.parseInt(req.params.id);
    knex('assassins').select().where( {
        assassin_id: id
    })
      .then((assassin) => {
        res.status(200).json(assassin);
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
});

//return favorites lists specific to a client_id
app.get('/clients/:id', function(req, res) {
    let id = Number.parseInt(req.params.id);
    knex('clients').select().where( {
        client_id: id
    })
      .then((client) => {
        res.status(200).json(client);
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
});

//return favorites lists specific to a contract_id
app.get('/contracts/:id', function(req, res) {
    let id = Number.parseInt(req.params.id);
    knex('contracts').select().where( {
        contract_id: id
    })
      .then((contract) => {
        res.status(200).json(contract);
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
});

//return favorites lists specific to a target_id
app.get('/targets/:id', function(req, res) {
    let id = Number.parseInt(req.params.id);
    knex('contracts').select().where( {
        target_id: id
    })
      .then((target) => {
        res.status(200).json(target);
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
});

let testObject = {email: 'test person 3', handle_name: 'test-person-3', password: 'sdvsadsoks'}; 



app.post('/assassins', function(req, res) {
    knex('assassins').insert([req.body])
        .then((assassin) => {
            res.status(200).json(assassin);
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
    });

app.post('/assassins_codenames', function(req, res) {
    knex('assassins_codenames').insert([req.body])
        .then((assassinCodename) => {
            res.status(200).json(assassinCodename);
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
    });

app.post('/clients', function(req, res) {
    knex('clients').insert([req.body])
        .then((client) => {
            res.status(200).json(client);
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
    });

app.post('/targets', function(req, res) {
    knex('targets').insert([req.body])
        .then((target) => {
            res.status(200).json(target);
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
    });

app.post('/contracts', function(req, res) {
    user_id = req.body.user_id; 
    knex()
    knex('contracts').insert([req.body])
        .then((contract) => {
            res.status(200).json(contract);
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
    });

app.post('/contracts_assassins', function(req, res) {
    knex('contracts_assassins').insert([req.body])
        .then((contractAssassin) => {
            res.status(200).json(contractAssassin);
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
    });

app.put('/contracts_assassins', function(req, res) {
    knex('contracts_assassins').insert([req.body])
        .then((contractAssassin) => {
            res.status(200).json(contractAssassin);
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
    });
    


    
    // fs.readFile(usersPath, 'utf8', function(err, userData){
    //     if (err) {
    //         console.error(err.stack);
    //         return res.sendStatus(500);
    //     };

    //     let users = JSON.parse(userData);

    //     let userID = 1;
    //     while (users.hasOwnProperty(userID)) {
    //         userID = Math.floor(Math.random()*10000000000000000);
    //     }

    //     let username = req.body.username;
    //     let email = req.body.email;
    //     let password = req.body.password;

    //     let newUser = {
    //     userID,
    //     username,
    //     email,
    //     password,
    //     };

        //password encryption algorythm 
        // seed = devurandom.read(160/8)
        // counter = 0

//         if (!username || !email || !password) {
//             return res.sendStatus(400);
//         }

//         users[userID] = newUser;

//         let newUsersJSON = JSON.stringify(users);
        
//         fs.writeFile(usersPath, newUsersJSON, function(writeErr) {
//             if (writeErr) {
//                 throw writeErr;
//             };
//             res.set('Content-Type', 'application/json');
//             res.send(newUsersJSON); 
//         });
//     });
// });

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
