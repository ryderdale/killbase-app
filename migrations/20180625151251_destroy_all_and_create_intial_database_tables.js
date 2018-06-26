

exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', (table) => {
        table.increments('user_id'); //this is the equivalent of creating a serial column
        table.string('email'); //this is the users signup email 
        table.string('password'); //this is the users uniquely encripted password
    })
    .then( ()=> {
        return knex.schema.createTable('agent_codenames', (table) => {
            table.integer('agent_id').references('user_id').inTable('users'); //this is the equivalent of creating a serial column
            table.string('name'); //create a column thats a string called name, and require an input when entity rows are added 
            table.integer('age'); //create a column that's a integer called age 
            table.string('contact_information'); 
            table.integer('minimum_fee'); 
            table.float('rating');
            table.integer('mission_ratio');
        })
    })
    .then( ()=> {
        return knex.schema.createTable('gadgets', (table) => {
            table.increments('gadget_id');
            table.string('gadget_name');
        })
    })
    .then( ()=> {
        return knex.schema.createTable('agent_gadgetry', (table) => {
            table.integer('gadget_id').references('gadget_id').inTable('gadgets');
            table.string('gadget_name');
        })
    })
    .then( ()=> {
        return knex.schema.createTable('agent_gadgets', (table) => {
            table.integer('gadget_id').references('gadget_id').inTable('gadgets');
            table.integer('agent_id').references('agent_id').inTable('agents');
        })
    })
    .then( () => {
            return knex.schema.createTable('clients', (table) => {
            table.increments('client_id');
            table.string('name');
        })
    })
    .then( () => {
        return knex.schema.createTable('targets', (table) => {
            table.increments('target_id');
            table.string('name');
            table.string('location');
            table.string('photo');
            table.integer('security_level');
        })
    }) 
    .then( () => {
        return knex.schema.createTable('contracts', (table)=> {
            table.increments('contract_id');
            table.integer('target_id').references('target_id').inTable('targets');
            table.integer('client_id').references('client_id').inTable('clients');
            table.integer('budget');
            table.boolean('completed_status');
            table.integer('completed_by').references('agent_id').inTable('agents');
        })
    })
    .then( () => {
        return knex.schema.createTable('contracts_agents', (table)=> {
            table.integer('contract_id').references('contract_id').inTable('contracts');
            table.integer('agent_id').references('agent_id').inTable('agents');
        })
    })  
}

exports.down = function(knex, Promise) {

    return knex.schema.dropTable('agent_codenames')
    .then( ()=> {
        return knex.schema.dropTable('contracts_agents')
    })
    .then( ()=>{
        return knex.schema.dropTable('contracts')
    })
    .then( ()=>{
        return knex.schema.dropTable('targets')
    })
    .then( ()=>{
        return knex.schema.dropTable('clients')
    })
    .then( ()=>{
        return knex.schema.dropTable('agents')
    })
};

