import express from 'express'
import passport from 'passport'

import uploader from './controllers/uploader'
import galleries from './controllers/galleries'

const router = express.Router()

/* GET home page. */
router.get('/', (req, res) => {
  if (req.user) {
    res.cookie('user_email', req.user.email)
    res.render('index')
  } else {
    res.redirect('/login')
  }
})

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

router.post('/api/photos', galleries.savePhotoAPI)

export default router
