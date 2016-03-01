import Gallery from '../models/Gallery'

function saveGallery(req, res) {
  const userId = req.user.id
  const { name, photoIds } = req.body
  new Gallery({ user_id: userId, name })
  .save()
  .then((gallery) => gallery.photos().attach(photoIds))
  .then((model) => res.status(200).json(model.toJSON()))
  .catch((err) => res.status(403).json({ message: err }))
}

function getGalleries(req, res) {
  const userId = req.user.id
  new Gallery({ user_id: userId })
  .fetchAll()
  .then((galleries) => galleries.fetch({ withRelated: 'photos' }))
  .then((galleries) => res.status(200).json(galleries.toJSON()))
  .catch((err) => res.status(403).json({ message: err }))
}

export default {
  saveGallery,
  getGalleries
}
