exports.up = function(knex, Promise) {
    return knex.schema.createTable('validators', function(table){
      table.increments();
      table.string('address');
      table.json('pub_key');
      table.string('voting_power');
      table.string('proposer_priority');
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('validators');
  };