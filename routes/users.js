'use strict';

//Setting up knex
const env = 'development';
const config = require('../knexfile.js')[env];
const knex = require('knex')(config);

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-as-promised');


router.post('/', function(req, res) {
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





// router.post('/', function(req, res) {
//     console.log('Request body:', req.body);
//     bcrypt.hash(req.body.password, 12)
//     .then( (hashed_password) => {
//         req.body.pasword = hashed_password
//         console.log(req.body.password);
//         knex('users').insert(req.body);
//         console.log(knex('users').select());
//         return
//     })
//     .then(() => {
//         return knex('users').where('username', req.body.username)
//     })
//     .then((user_object)=> {
//         res.status(200).send(user_object)
//     })
//     .catch((error) => {
//         console.error(error);
//         res.status(500).send({ error });
//     });
// });

router.post("/login", function (req, res) {
    bcrypt.hash(req.body.password, 12)
    .then((hashed_password)=> {
        knex('users').where('email', req.body.email).andWhere('password', hashed_password)
    })
    .then((user_object) => {
        console.log(user_object);
        res.status(200).send(user_object)
    })
    .catch((error) => {
        res.status(500).send(error)
      });
}) 




module.exports = router;