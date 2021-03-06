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
  .fetch({ withRelated: 'accessToken' })
  .then((gallery) => {
    if (!gallery) {
      throw new Error('找不到该画室')
    }
    if (!gallery.related('accessToken').get('token')) {
      return new AccessToken({ gallery_id: galleryId, valid: true })
      .save()
    } else {
      return new AccessToken({
        token: gallery.related('accessToken').get('token'),
        gallery_id: galleryId,
        valid: true
      })
      .save()
    }
  })
  .then((accessToken) => res.status(200).json(accessToken.toJSON()))
  .catch((err) => res.status(400).json({ message: err.message }))
}

function deshareGalleryAPI(req, res) {
  const userId = req.user.id
  const galleryId = req.params.galleryId

  new Gallery({ id: galleryId, user_id: userId })
  .fetch({ withRelated: 'accessToken' })
  .then((gallery) => {
    if (!gallery) {
      return res.status(400).json({ message: '找不到该画室' })
    }
    if (!gallery.related('accessToken').get('token')) {
      return res.status(403).json({ message: '该画室没有被分享' })
    }
    return new AccessToken({
      token: gallery.related('accessToken').get('token'),
      gallery_id: galleryId, valid: false
    })
    .save()
    .then((accessToken) => res.status(200).json(accessToken.toJSON()))
  })
  .catch((err) => res.status(403).json({ message: err }))
}

function renderSharePage(req, res) {
  const galleryId = req.user.gallery.id

  new Gallery({ id: galleryId })
  .fetch({ withRelated: 'photos' })
  .then((gallery) => res.render('share-app', { data: gallery }))
  .catch((err) => res.status(403).json({ message: err }))
}

export default {
  saveGalleryAPI,
  getGalleriesAPI,
  shareGalleryAPI,
  deshareGalleryAPI,
  renderSharePage
}
