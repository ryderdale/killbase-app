
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.all([
    knex('assassins_codenames').del(),
    knex('contracts').del(),
  ])
  .then(function () {
    return Promise.all([
      knex('clients').del(),
      knex('targets').del(),
      knex('assassins').del()
    ]);
  })
  .then(function () {
    return Promise.all([
      knex('users').del(),
    ]);
  })
  .then(function () {
    // Inserts seed entries
    return knex('assassins').insert([
      {name: 'Alexander Duggan', age: 31, weapon: 'Sniper rifle', minimum_fee: 45, rating: 7.5, kills: 28},
      {name: 'Anton Chigurh', age: 52, weapon: 'Pneumatic bolt gun', minimum_fee: 40, rating: 9, kills: 72},
      {age: 31, weapon: 'Pistol', minimum_fee: 28, 'minimum_fee': 20, rating: 6.5, kills: 30},
      {name: 'Jason Bourne', age: 27, weapon: 'Parkour', minimum_fee: 20, rating: 25, kills: 30},
      {name: 'John Wick', age: 35, weapon: 'Lots of guns', minimum_fee: 50, rating: 9.5, kills: 433},
      {name: 'Jules Winnfield', age: 28, weapon: 'Pistol', minimum_fee: 15, rating: 6.5, kills: 13},
      {name: 'Leon', age: 41, weapon: 'Everything', minimum_fee: 40, rating: 8.5, kills: 87},
      {name: 'Nikita Mears', age: 28, weapon: 'SSilenced pistols', minimum_fee: 30, rating: 7, kills: 32},
      {name: 'Pickle Rick', age: 60, weapon: 'Lasers and office supplies', minimum_fee: 0, rating: 8, kills: 24}
    ]);
  })
  .then(function () {
    return knex('assassins_codenames').insert([
      {assassin_id: 1, codename: 'The Jackal'},
      {assassin_id: 2, codename: 'Old Man'},
      {assassin_id: 3, codename: 'Ghost Dog'},
      {assassin_id: 5, codename: 'Baba Yaga'},
      {assassin_id: 7, codename: 'The Professional'},
      {assassin_id: 8, codename: 'Nikita'},
      {assassin_id: 8, codename: 'La Femme Nikita'},
      {assassin_id: 9, codename: 'Solenya'}
    ])
  }) 
  .then(function () {
    return knex('clients').insert([
      {name: 'Marcellus Wallace'},
      {name: 'Concerto'},
      {name: 'Mathilda'},
      {name: 'Winston'},
      {name: 'Ray Vargo'}
    ])
  })
  .then(function () {
    return knex('targets').insert([
      {name:'Butch Coolidge', location: 'Los Angeles' , photo: 'https://goo.gl/LCquZj', security_level: 3},
      {name:'The Jaguar', location: 'Russian Embassy', photo: 'https://goo.gl/6JWsiv', security_level: 9},
      {name:'Norman Stansfield', location:'Manhattan', photo: 'https://i.imgur.com/mdIk33E.jpg', security_level: 7},
      {name:'Santino D\'Antonio', location:'Continental Hotel', photo:'https://goo.gl/fUPkYy', security_level: 10},
      {name:'Sonny Valerio', location:'Queens', photo: 'https://goo.gl/8DHYUS', security_level: 4}
    ])
  }) 
  .then(function () {
    return knex('contracts').insert([
      {target_id:1, client_id:1, budget:40},
      {target_id:2, client_id:2, budget:70},
      {target_id:3, client_id:3, budget:35},
      {target_id:4, client_id:4, budget:25},
      {target_id:5, client_id:5, budget:10}
    ])
  })
  .catch(function (error) {
    console.log('error at insert of Contracts', error)
  }) 
};