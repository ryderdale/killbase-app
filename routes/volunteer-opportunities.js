const express = require('express');
const router = express.Router();

'use strict';

//Setting up knex
const env = 'development';
const config = require('../knexfile.js')[env];
const knex = require('knex')(config);

router.get('/', (request, response) => {
    knex('volunteer_opportunities').select()
      .then((volOpps) => {
        response.status(200).send(volOpps);
      })
      .catch((error) => {
        response.status(500).send({ error });
      });
  });

router.get('/:volunteer_opportunity_id', (request, response) => {
    knex('volunteer_opportunities').where('volunteer_opportunity_id', request.params.volunteer_opportunity_id)
        .then((volOpps) => {
            console.log(volOpps);
            response.status(200).send(volOpps);
        })
        .catch((error) => {
        response.status(500).json({ error });
        });
});

router.post('/', function(req, res) {
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

router.put('/:volunteer_opportunity_id', (request, response) => {
    knex('volunteer_opportunities').where('volunteer_opportunity_id', request.params.volunteer_opportunity_id).update(request.body)
    .then((volOpps) => {
        console.log(volOpps);
        response.status(200);
    })
    .catch((error) => {
    response.status(500).json({ error });
    });
});
 
router.delete('/:volunteer_opportunity_id', (request, response) => {
    knex('volunteer_opportunities').where('volunteer_opportunity_id', request.params.volunteer_opportunity_id).del()
        .then(() => {
        response.status(200);
        })
        .catch((error) => {
        response.status(500).json({ error });
        });
});
        
router.put('/volunteer-opportunity-volunteer/:volunteer_opportunity_id', (request, response) => {
    console.log('request received')
    knex('volunteer_opportunities').where('volunteer_opportunity_id', request.params.volunteer_opportunity_id)
    .update({
        volunteers_count: knex.raw('volunteers_count + 1')
    })
    // .then( ()=> {

    // })
    .then( () => {
        response.status(200)
    })
    .catch((error) => {
    response.status(500).json({ error });
    });
});



module.exports = router;