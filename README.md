##### How ro run ?
1. setup PostgresSQL and login inside psql
2. Run "CREATE DATABASE stake_with_us"
3. Run "CREATE DATABASE stake_with_us_staging" (if you need for staging environment)
4. Run "CREATE DATABASE stake_with_us_production" (if you need for production environment)
5. Run "knex migrate:latest --env development"
6. Run "knex migrate:latest --env staging"
7. Run "knex migrate:latest --env production"
8. Run "npm start" for run
9. Run "mocha" for testing