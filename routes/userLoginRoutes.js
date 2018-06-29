let router = require('express').Router();

router.get('/food', function (req, res) {
    let responseText = 'A get request for the food resource';  
    console.log(responseText); 
    res.status(200).send(responseText); 
})

router.get('/food/food_id', function (req, res) {
    let responseText = 'A get request for the food resource' + req.params.food_id;  
    console.log(responseText); 
    res.status(200).send(responseText); 
})