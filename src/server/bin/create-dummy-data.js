import User from '../models/User'
import bookshelf from '../bookshelf'
import log from '../log'

const knex = bookshelf.knex

const users = [
  new User({
    name: '李舜阳',
    email: 'lishunyang@pku.edu.cn',
    password: 'Boring09',
    phone: '15600608485'
  }), new User({
    name: '测试账户',
    email: '414892763@qq.com',
    password: '1234',
    phone: '15210624814'
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

