exports.up = knex => {
  return knex.raw('create extension if not exists "uuid-ossp"').then(() =>
    knex.schema.createTable('rooms', table => {
      table
        .uuid('id')
        .primary()
        .notNullable()
        .defaultTo(knex.raw('uuid_generate_v4()'))
      table.string('name', 1000).notNullable()
    })
  )
}

exports.down = knex => {
  return knex.schema.dropTableIfExists('rooms')
}
