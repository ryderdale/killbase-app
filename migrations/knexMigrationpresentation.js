exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').unique(); 
        table.string('name'); 
        table.integer('dollar amount'); 
        table.float('rating'); 
    })
    .then( ()=> {
        return knex.schema.createTable('personal-details', (table) => {
            table.integer('user_id').references('id').inTable('users'); 
            table.increments('details_id').unique();
            table.string('contact information'); 
        })
    })
...