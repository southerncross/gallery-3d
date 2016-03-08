import bookshelf from '../bookshelf'
import log from '../log'

const knex = bookshelf.knex
const tables = ['users', 'galleries', 'photos', 'galleries_photos']

tables.reduce((promise, table) => {
  log.info(`Dropping '${table}' ...`)
  return promise.then(() => knex.raw(`DROP TABLE ${table} CASCADE`))
}, Promise.resolve())
.then(() => {
  log.info('All tables dropped successfully!')
  knex.destroy()
})
.catch((err) => {
  log.error(err)
  knex.destroy()
})
