import bookshelf from '../bookshelf'
import log from '../log'

const knex = bookshelf.knex

Promise.resolve()
.then(() => knex.schema.hasTable('users')
  .then((exists) => {
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
)
.then(() => knex.schema.hasTable('galleries')
  .then((exists) => {
    if (exists) {
      return
    }
    log.info('Creating `galleries` ...')
    return knex.schema.createTable('galleries', (table) => {
      table.increments('id')
      table.string('name')
      table.string('description')
      table.integer('owner_id').unsigned().references('users.id').onDelete('SET NULL').onUpdate('CASCADE')
      table.dateTime('created_at').defaultTo(knex.fn.now())
    })
    .then(() => {
      return knex.schema.raw('alter table \'galleries\' add \'updated_at\' datetime default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP')
    })
  })
)
.then(() => knex.schema.hasTable('photos')
  .then((exists) => {
    if (exists) {
      return
    }
    log.info('Creating `photos`')
    return knex.schema.createTable('photos', (table) => {
      table.increments('id')
      table.string('name')
      table.string('description')
      table.string('url')
      table.integer('owner_id').unsigned().references('galleries.id').onDelete('SET NULL').onUpdate('CASCADE')
      table.dateTime('created_at').defaultTo(knex.fn.now())
    })
    .then(() => {
      return knex.schema.raw('alter table \'galleries\' add \'updated_at\' datetime default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP')
    })
  })
)
.then(() => knex.schema.hasTable('galleries_photos')
  .then((exists) => {
    if (exists) {
      return
    }
    log.info('Creating `galleries_photos`')
    return knex.schema.createTable('galleries_photos', (table) => {
      table.increments('id')
      table.integer('gallery_id').unsigned().references('galleries.id').onDelete('SET NULL').onUpdate('CASCADE')
      table.integer('photo_id').unsigned().references('photos.id').onDelete('SET NULL').onUpdate('CASCADE')
      table.dateTime('created_at').defaultTo(knex.fn.now())
    })
  })
)
.then(() => {
  log.info('All tables created successfully!')
  knex.destroy()
})
.catch((err) => {
  log.error(err)
  knex.destroy()
})
