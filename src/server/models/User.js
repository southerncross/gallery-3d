import bcrypt from 'bcrypt'

import bookshelf from '../bookshelf'
import Gallery from './Gallery'
import Photo from './Photo'

export default bookshelf.Model.extend({
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

  // Can not user arrow function
  hashPassword: function(model, attrs, options) {
    const password = model.get('password')
    if (password) {
      model.set('hashed_password', bcrypt.hashSync(password, this.salt))
      model.unset('password')
      return Promise.resolve(model)
    } else {
      return Promise.reject('Password is required')
    }
  }
}, {
  salt: '$2a$10$BX4hC9DQ31SJTPWL1IN4MO',

  validPassword: (email, password) => {
    if (!email || password) {
      return Promise.reject('Email and password are both required')
    }
    return new this({ email: email.toLowerCase().trim() })
    .fetch({ require: true })
    .then((user) => {
      if (!bcrypt.compareSync(bcrypt.hashSync(password, this.salt), user.get('hashed_password'))) {
        throw new Error('Invalid password')
      }
    })
  }
})
