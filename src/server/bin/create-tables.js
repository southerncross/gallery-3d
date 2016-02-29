import bookshelf from '../bookshelf'
import log from '../log'

const knex = bookshelf.knex

knex.schema
.hasTable('users').then((exists) => {
  if (exists) {
    return
  }
  log.info('Creating `users` ...')
  return knex.schema.createTable('users', (table) => {
    table.increments('id')
    table.string('name')
    table.string('last_name')
    table.string('first_name')
    table.string('email').unique()
    table.string('hashed_password')
    table.string('salt')
    table.string('reset_password_token').index()
    table.dateTime('reset_password_expires')
    table.string('avatar', 512)
    table.string('phone', 20)
    table.dateTime('created_at').defaultTo(knex.fn.now())
  })
})
.then(() => {
  log.info('All tables created successfully!')
  knex.destroy()
})
.catch((err) => {
  log.error(err)
  knex.destroy()
})
