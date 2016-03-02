import knex from 'knex'
import bookshelf from 'bookshelf'

import log from './log'

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'lishunyang',
    password: '',
    database: 'gallery-dev',
    charset: 'utf8'
  },
  debug: true
})

if (!db) {
  log.error('Failed to connect postgresql')
}

export default bookshelf(db)
