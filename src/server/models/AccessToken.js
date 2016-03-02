import bookshelf from '../bookshelf'
import Gallery from './Gallery'

export default bookshelf.Model.extend({
  tableName: 'access_tokens',

  gallery_id() {
    return this.belongsTo(Gallery)
  }
})
