exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', (table) => {
        table.increments('user_id').unique(); //this is the equivalent of creating a serial column, it important to add unique though so it can't be changd to the same value later. 
        table.string('first_name');
        table.string('last_name');
        table.string('email'); //this is the users signup email 
        table.string('username');
        table.string('password'); //this is the users uniquely encripted password
    })
    .then( ()=> {
        return knex.schema.createTable('organizers', (table) => {
            table.integer('user_id').references('user_id').inTable('users'); //this is the equivalent of creating a serial column
            table.increments('organizer_id').unique();  
            table.string('organization_name'); 
            table.string('organization_email'); 
            table.string('organization_phone');
        })
    })
    .then( ()=> {
        return knex.schema.createTable('secondary_organizers', (table) => {
            table.integer('user_id').references('user_id').inTable('users');
            table.integer('organizer_id').references('organizer_id').inTable('organizers');
        })
    })
    .then( () => {
        return knex.schema.createTable('sponsors', (table) => {
            table.integer('user_id').references('user_id').inTable('users');
            table.increments('sponsor_id').unique();
            table.string('sponsor_name'); //create a column thats a string called name, and require an input when entity rows are added  
            table.string('sponsor_email'); 
            table.string('sponsor_phone'); 
            table.binary('seeking_sponosrships')

        })
    })
    .then( () => {
        return knex.schema.createTable('sponsors_secondary_users', (table)=> {
            table.integer('sponsor_id').references('sponsor_id').inTable('sponsors');
            table.integer('user_id').references('user_id').inTable('users');
        })
    }) 
    .then( () => {
        return knex.schema.createTable('volunteers', (table) => {
            table.integer('user_id').references('user_id').inTable('users');
            table.increments('volunteer_id').unique();
            table.string('volunteer_phone');
            table.string('volunteer_email');
            table.text('bio')
        })
    }) 
    .then( () => {
        return knex.schema.createTable('volunteer_opportunities', (table)=> {
            table.integer('organizer_id').references('organizer_id').inTable('organizers');
            table.increments('volunteer_opportunity_id').unique(); 
            table.string('volunteer_opportunity_name');
            table.string('volunteer_opportunity_location_name');
            table.string('street');
            table.string('city');
            table.string('state');
            table.string('zipcode');
            table.string('data_time_timezone_start');
            table.string('date_time_timezone_end');
            table.integer('min_volunteers_needed');
            table.integer('max_volunteers_needed');
            table.integer('volunteers_count');
            table.text('volunteer_opportunity_description');
            table.text('volunteer_opportunity_requirements'); 
        })
    })  
    .then( () => {
        return knex.schema.createTable('volunteer_opportunities_volunteers', (table)=> {
            table.integer('volunteer_opportunity_id').references('volunteer_opportunity_id').inTable('volunteer_opportunities');
            table.integer('volunteer_id').references('volunteer_id').inTable('volunteers');
        })
    }) 
    .then( () => {
        return knex.schema.createTable('volunteer_opportunities_sponsors', (table)=> {
            table.integer('volunteer_opportunity_id').references('volunteer_opportunity_id').inTable('volunteer_opportunities');
            table.integer('sponsor_id').references('sponsor_id').inTable('sponsors');
        })
    }) 
}

exports.down = function(knex, Promise) {

    return knex.schema.dropTable('volunteer_opportunities_sponsors')
    .then( ()=> {
        return knex.schema.dropTable('volunteer_opportunities_volunteers')
    })
    .then( ()=>{
        return knex.schema.dropTable('volunteer_opportunities')
    })
    .then( ()=>{
        return knex.schema.dropTable('volunteers')
    })
    .then( ()=>{
        return knex.schema.dropTable('sponsors_secondary_users')
    })
    .then( ()=>{
        return knex.schema.dropTable('sponsors')
    })
    .then( ()=>{
        return knex.schema.dropTable('secondary_organizers')
    })
    .then( ()=>{
        return knex.schema.dropTable('organizers')
    })
    .then( ()=>{
        return knex.schema.dropTable('users')
    })
};

