exports.up = (knex) => knex.schema.createTable('admin', (table) => {
  table
    .uuid('id')
    .primary()
    .defaultTo(knex.raw('uuid_generate_v4()'))
  table.string('key')
  table.string('name')
  table.jsonb('data')
  table.timestamps(true, true)
  table.dateTime('deleted_at')
})

exports.down = (knex) => knex.schema.dropTable('admin')
