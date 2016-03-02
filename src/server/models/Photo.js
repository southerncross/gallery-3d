import Base from './Base'
import User from './User'
import Gallery from './Gallery'

export default Base.extend({
  tableName: 'photos',

  owner() {
    return this.belongsTo(User)
  },

  galleries() {
    return this.belongsTo(Gallery)
  }
})
