import uuid from 'node-uuid'

import Base from './Base'
import User from './User'
import Photo from './Photo'
import AccessToken from './AccessToken'

export default Base.extend({
  tableName: 'galleries',

  owner() {
    return this.belongsTo(User)
  },

  photos() {
    return this.belongsToMany(Photo)
  },

  accessToken() {
    return this.hasOne(AccessToken)
  },

  initialize() {
    this.on('creating', this.generateId, this)
  },

  generateId: function(model, attrs, options) {
    model.set('id', uuid.v4())
    return Promise.resolve(model)
  }
})
