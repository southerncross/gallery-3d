import express from 'express'

import uploader from './controllers/uploader'

const router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
})

router.get('/api/uptoken', uploader.getUptokenAPI)

export default router
