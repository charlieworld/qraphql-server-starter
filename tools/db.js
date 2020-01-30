import knexFile from '../knexfile'

knexFile.pool = {
  min: 0,
  max: 7,
}

const knex = require('knex')(knexFile)

const select = async (table = null, where = {}, limit = 20, offset = 0) => {
  if (!table) return false
  const res = await knex.where(where).select().from(table).limit(limit)
    .offset(offset)
  if (res.length <= 0) return false
  return res
}

const insert = async (table, data) => {
  const res = await knex(table).insert(data).returning('id')
  return res[0]
}

module.exports = {
  select,
  insert,
}
