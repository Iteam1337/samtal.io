exports.up = knex => {
  return knex.raw('create extension if not exists "uuid-ossp"').then(() =>
    knex.schema.createTable('agenda_items', table => {
      table
        .uuid('id')
        .primary()
        .notNullable()
        .defaultTo(knex.raw('uuid_generate_v4()'))
      table.string('title', 1000).notNullable()
      table.uuid('room_id').notNullable()
      table
        .foreign('room_id')
        .references('id')
        .inTable('rooms')
    })
  )
}

exports.down = knex => {
  return knex.schema.dropTableIfExists('agenda_items')
}
