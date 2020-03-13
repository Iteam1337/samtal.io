import knex from 'knex'

export const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'iteamadmin',
    password: 'adminadmin1337',
    database: 'samtalio',
  },
})
