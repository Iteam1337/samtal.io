exports.up = knex => {
  return knex.raw('create extension if not exists "uuid-ossp"').then(() =>
    knex.schema.createTable('rooms', table => {
      table
        .uuid('id')
        .primary()
        .notNullable()
        .defaultTo(knex.raw('uuid_generate_v4()'))
      table.string('name', 1000).notNullable()
      table.uuid('owner_id').notNullable()
      table.timestamp('start')
      table
        .timestamp('created_at')
        .defaultTo(knex.fn.now())
        .notNullable()
      table
        .foreign('owner_id')
        .references('id')
        .inTable('users')
    })
  )
}

exports.down = knex => {
  return knex.schema.dropTableIfExists('rooms')
}
