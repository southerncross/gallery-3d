import bookshelf from '../bookshelf'
import log from '../log'

const knex = bookshelf.knex

knex.schema
.raw('SET foreign_key_checks = 0')
.then(() => {
  log.info('Dropping `users` ...')
  return knex.schema.dropTableIfExists('users')
})
.then(() => {
  log.info('All tables dropped successfully!')
  knex.destroy()
})
.catch((err) => {
  log.error(err)
  knex.destroy()
})
