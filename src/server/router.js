import express from 'express'
import passport from 'passport'

import uploader from './controllers/uploader'
import photos from './controllers/photos'
import galleries from './controllers/galleries'

const router = express.Router()

/* GET home page. */
router.get('/', (req, res) => {
  if (req.user) {
    res.cookie('user_email', req.user.email)
    res.render('main-app')
  } else {
    res.redirect('/login')
  }
})

router.get('/share', (req, res) => res.render('share-app'))

router.get('/login', (req, res) => res.render('login'))
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))
router.post('/logout', (req, res) => {
  req.logout()
  res.clearCookie('user_email')
  res.redirect('/login')
})

router.get('/api/uptoken', uploader.getUptokenAPI)

router.post('/api/photos', photos.savePhotoAPI)
router.get('/api/photos', photos.getPhotosAPI)

router.post('/api/galleries', galleries.saveGalleryAPI)
router.get('/api/galleries', galleries.getGalleriesAPI)

router.put('/api/share-gallery/:galleryId', galleries.shareGalleryAPI)

export default router
