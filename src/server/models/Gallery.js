import uuid from 'node-uuid'

import bookshelf from '../bookshelf'
import User from './User'
import Photo from './Photo'

export default bookshelf.Model.extend({
  tableName: 'galleries',

  owner() {
    return this.belongsTo(User)
  },

  photos() {
    return this.belongsToMany(Photo)
  },

  initialize() {
    this.on('creating', this.generateId, this)
  },

  generateId: function(model, attrs, options) {
    model.set('id', uuid.v4())
    return Promise.resolve(model)
  }
})
