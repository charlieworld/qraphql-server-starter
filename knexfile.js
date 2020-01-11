module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL || {
    port: 54320,
    host: '127.0.0.1',
    user: 'root',
    password: 'test',
    database: 'test_db',
  },
}
