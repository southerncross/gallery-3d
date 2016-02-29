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
  }
})
