const Document = require('../models/Document')
exports.uploadDocument = async (req, res) => {
    const fileUrl = req.file.path;
    const doc = await Document.create({ title: req.body.title, fileUrl, uploadedBy: req.user._id });
    res.json(doc);
  };
exports.getDocuments = async (req, res) => res.json(await Document.find());