const Mandatory = require('../models/Mandatory');
const Document = require('../models/Document');

exports.uploadMandatoryDocument = async (req, res) => {
  try {
    const fileUrl = req.file.path; // Cloudinary URL
    const title = req.body.title;

    if (!fileUrl || !title) {
      return res.status(400).json({ error: "Title and file are required." });
    }

    const doc = await Mandatory.create({
      title,
      fileUrl,
      uploadedBy: req.user._id,
    });

    res.status(201).json(doc);
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ error: "Failed to upload document." });
  }
};

exports.getMandatoryDocuments = async (req, res) => {
  try {
    const documents = await Mandatory.find().sort({ createdAt: -1 });
    res.json(documents);
  } catch (err) {
    console.error("Fetch Error:", err);
    res.status(500).json({ error: "Failed to fetch documents." });
  }
};
