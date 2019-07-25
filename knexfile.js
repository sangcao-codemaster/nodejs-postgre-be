// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'stake_with_us',
      user:     '',
      password: ''
    }
  },

  staging: {
    client: 'pg',
    connection: {
      database: 'stake_with_us_staging',
      user:     'me',
      password: ''
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: {
      database: 'stake_with_us_production',
      user:     'me',
      password: 'sangcao1985@!~'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
