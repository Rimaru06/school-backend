const Gallery = require('../models/Gallery');

exports.uploadPhoto = async (req, res) => {
  try {
    const imageUrl = req.file.path; // Cloudinary provides the URL in `file.path`
    const gallery = await Gallery.create({
      title: req.body.title,
      imageUrl,
      uploadedBy: req.user._id,
    });
    res.status(201).json(gallery);
  } catch (error) {
    console.error('Error uploading photo:', error);
    res.status(500).json({ error: 'Failed to upload photo' });
  }
};

exports.getPhotos = async (req, res) => {
  try {
    const photos = await Gallery.find().sort({ createdAt: -1 }); // Optional: show latest first
    res.json(photos);
  } catch (error) {
    console.error('Error fetching photos:', error);
    res.status(500).json({ error: 'Failed to fetch photos' });
  }
};
exports.deletePhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const photo = await Gallery.findByIdAndDelete(id);
    if (!photo) {
      return res.status(404).json({ error: 'Photo not found' });
    }
    res.json({ message: 'Photo deleted successfully' });
  } catch (error) {
    console.error('Error deleting photo:', error);
    res.status(500).json({ error: 'Failed to delete photo' });
  }
};