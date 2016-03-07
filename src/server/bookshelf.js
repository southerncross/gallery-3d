import knex from 'knex'
import bookshelf from 'bookshelf'

import log from './log'
import configs from './configs'

const db = knex({
  client: 'pg',
  connection: {
    host: configs.psql.host,
    user: configs.psql.user,
    password: configs.psql.password,
    database: configs.psql.db,
    charset: 'utf8'
  },
  debug: false // <---- knex debug log
})

if (!db) {
  log.error('Failed to connect postgresql')
}

export default bookshelf(db)
