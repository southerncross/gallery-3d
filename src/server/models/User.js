import crypto from 'crypto'

import Base from './Base'
import Gallery from './Gallery'
import Photo from './Photo'

function __encryptPassword(password) {
  const salt = new Buffer('$2a$10$BX4hC9DQ31SJTPWL1IN4MO', 'base64')
  return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64')
}

export default Base.extend({
  tableName: 'users',

  galleries() {
    return this.hasMany(Gallery)
  },

  photos() {
    return this.hasMany(Photo)
  },

  initialize() {
    this.on('creating', this.hashPassword, this)
  },

  hashPassword(model, attrs, options) {
    const password = model.get('password')
    if (password) {
      model.set('hashed_password', __encryptPassword(password))
      model.unset('password')
      return Promise.resolve(model)
    } else {
      return Promise.reject('缺少密码')
    }
  }
}, {
  validPassword(email, password) {
    if (!email || !password) {
      return Promise.reject('缺少邮箱或密码')
    }
    return new this({ email: email.toLowerCase().trim() })
    .fetch({ require: true })
    .then((user) => {
      if (__encryptPassword(password) !== user.get('hashedPassword')) {
        throw new Error('密码错误')
      }
    })
  }
})
