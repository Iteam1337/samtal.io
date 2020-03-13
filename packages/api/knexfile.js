module.exports = {
  client: 'pg',
  dev: {
    client: 'pg',
    connection: {
      database: 'samtalio',
      user: 'iteamadmin',
      password: 'adminadmin1337',
    },
    migrations: {
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './seeds/dev',
    },
  },
  production: {
    client: 'pg',
    connection: {
      database: 'samtalio',
      user: 'iteamadmin',
      password: 'adminadmin1337',
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
}
