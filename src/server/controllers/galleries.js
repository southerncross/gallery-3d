import Gallery from '../models/Gallery'
import AccessToken from '../models/AccessToken'

function saveGalleryAPI(req, res) {
  const userId = req.user.id
  const { name, photoIds } = req.body
  new Gallery({ user_id: userId, name })
  .save()
  .then((gallery) => gallery.photos().attach(photoIds))
  .then((model) => res.status(200).json(model.toJSON()))
  .catch((err) => res.status(403).json({ message: err }))
}

function getGalleriesAPI(req, res) {
  const userId = req.user.id
  new Gallery({ user_id: userId })
  .fetchAll()
  .then((galleries) => galleries.fetch({ withRelated: ['photos', 'accessToken'] }))
  .then((galleries) => res.status(200).json(galleries.toJSON()))
  .catch((err) => res.status(403).json({ message: err }))
}

function shareGalleryAPI(req, res) {
  const userId = req.user.id
  const galleryId = req.params.galleryId

  new Gallery({ id: galleryId, user_id: userId })
  .fetch()
  .then((gallery) => {
    if (!gallery) {
      return res.status(400).json({ message: '找不到该画室' })
    }
  })
  .then(() => {
    new AccessToken({ gallery_id: galleryId })
    .save()
    .then((accessToken) => res.status(200).json(accessToken.toJSON()))
  })
  .catch((err) => res.status(403).json({ message: err }))
}

export default {
  saveGalleryAPI,
  getGalleriesAPI,
  shareGalleryAPI
}
