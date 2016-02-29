import bookshelf from '../bookshelf'
import log from '../log'

const knex = bookshelf.knex
const tables = ['users', 'galleries', 'photos', 'galleries_photos']

knex.schema
.raw('SET foreign_key_checks = 0')
.then(() => tables.reduce((promise, table) => {
  log.info(`Dropping '${table}' ...`)
  return promise.then(() => knex.schema.dropTableIfExists(table))
}, Promise.resolve()))
.then(() => {
  log.info('All tables dropped successfully!')
  knex.destroy()
})
.catch((err) => {
  log.error(err)
  knex.destroy()
})
