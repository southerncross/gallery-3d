import _ from 'lodash'
import bookshelf from '../bookshelf'

export default bookshelf.Model.extend({
  format(model) {
    return _.reduce(model, (row, val, key) => {
      row[_.snakeCase(key)] = val
      return row
    }, {})
  },

  parse(row) {
    return _.reduce(row, (model, val, key) => {
      model[_.camelCase(key)] = val
      return model
    }, {})
  }
})
