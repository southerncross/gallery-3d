import bookshelf from '../bookshelf'
import User from './User'
import Gallery from './Gallery'

export default bookshelf.Model.extend({
  tableName: 'photos',

  owner() {
    return this.belongsTo(User)
  },

  galleries() {
    return this.belongsTo(Gallery)
  }
})
