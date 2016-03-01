import Photo from '../models/Photo'

function savePhotoAPI(req, res) {
  const userId = req.user.id
  const { url, name } = req.body

  new Photo({ url, name, user_id: userId })
  .save()
  .then((photo) => {
    res.status(200).json(photo.serialize())
  })
  .catch((err) => res.status(400).json({ message: err }))
}

export default {
  savePhotoAPI
}
