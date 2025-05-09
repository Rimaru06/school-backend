const Gallery = require('../models/Gallery');
exports.uploadPhoto = async (req, res) => {
  const imageUrl = req.file.path;
  const gallery = await Gallery.create({ title: req.body.title, imageUrl, uploadedBy: req.user._id });
  res.json(gallery);
};
exports.getPhotos = async (req, res) => res.json(await Gallery.find());