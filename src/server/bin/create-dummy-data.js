import User from '../models/User'
import bookshelf from '../bookshelf'
import log from '../log'

const knex = bookshelf.knex

const users = [
  new User({
    name: '李舜阳',
    email: 'lishunyang@pku.edu.cn',
    password: '1234',
    phone: '13579202680'
  }), new User({
    name: '测试账户',
    email: 'hello@pku.edu.cn',
    password: '1234',
    phone: '13579202680'
  })
]

log.info('Populating dummy data...')

Promise.all(users.map((user) => {
  return user.save()
}))
.then(() => {
  log.info('Populate complete.')
  knex.destroy()
})
.catch((err) => {
  log.error(err.stack)
  knex.destroy()
})

