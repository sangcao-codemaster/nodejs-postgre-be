var knex = require('./knex.js');

function Validators() {
  return knex('validators');
}

// *** queries *** //

function getAll() {
  return Validators().select().orderBy('id', 'asc').orderBy('address', 'asc');
}

function getSingle(validatorId) {
  return Validators().where('id', parseInt(validatorId)).first();
}

function add(validator) {
  return Validators().insert(validator, 'id');
}

function update(validatorId, updates) {
  return Validators().where('id', parseInt(validatorId)).update(updates);
}

function deleteItem(validatorId) {
  return Validators().where('id', parseInt(validatorId)).del();
}


module.exports = {
  getAll: getAll,
  getSingle: getSingle,
  add: add,
  update: update,
  deleteItem: deleteItem
};