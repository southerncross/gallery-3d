import uuid from 'node-uuid'

import Base from './Base'
import Gallery from './Gallery'

export default Base.extend({
  tableName: 'access_tokens',

  idAttribute: 'token',

  gallery() {
    return this.belongsTo(Gallery)
  },

  initialize() {
    this.on('creating', this.generateToken, this)
  },

  generateToken: function(model, attrs, options) {
    model.set('token', uuid.v4())
    return Promise.resolve(model)
  }
})
