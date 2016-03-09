import express from 'express'
import passport from 'passport'

import uploader from './controllers/uploader'
import photos from './controllers/photos'
import galleries from './controllers/galleries'
import sessions from './controllers/sessions'

const router = express.Router()

/* GET home page. */
router.get('/', (req, res) => {
  if (req.user) {
    res.cookie('user_email', req.user.email)
    res.render('main-app', { data: req.user })
  } else {
    res.render('login-app')
  }
})

router.get('/share', passport.authenticate('bearer', {
  session: false
}), galleries.renderSharePage)

router.get('/login', (req, res) => res.render('login-app'))
router.post('/login', sessions.login)
router.post('/logout', sessions.logout)

router.get('/api/uptoken', uploader.getUptokenAPI)

router.post('/api/photos', photos.savePhotoAPI)
router.get('/api/photos', photos.getPhotosAPI)

router.post('/api/galleries', galleries.saveGalleryAPI)
router.get('/api/galleries', galleries.getGalleriesAPI)

router.put('/api/share-gallery/:galleryId', galleries.shareGalleryAPI)
router.put('/api/deshare-gallery/:galleryId', galleries.deshareGalleryAPI)

export default router
