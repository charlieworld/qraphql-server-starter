import knexFile from '../knexfile'

knexFile.pool = {
  min: 0,
  max: 7,
}

const knex = require('knex')(knexFile)

const select = async (from = null, where = {}, limit = 20, offset = 0) => {
  if (!from) return false
  const res = await knex.where(where).select().from(from).limit(limit)
    .offset(offset)
  return res
}

module.exports = {
  select,
}
