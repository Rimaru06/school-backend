const Document = require('../models/Document');

exports.uploadDocument = async (req, res) => {
  try {
    const fileUrl = req.file.path; // Cloudinary URL
    const title = req.body.title;

    if (!fileUrl || !title) {
      return res.status(400).json({ error: "Title and file are required." });
    }

    const doc = await Document.create({
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

exports.getDocuments = async (req, res) => {
  try {
    const documents = await Document.find().sort({ createdAt: -1 });
    res.json(documents);
  } catch (err) {
    console.error("Fetch Error:", err);
    res.status(500).json({ error: "Failed to fetch documents." });
  }
};
exports.deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;

    const document = await Document.findByIdAndDelete(id);

    if (!document) {
      return res.status(404).json({ error: "Document not found." });
    }

    res.json({ message: "Document deleted successfully." });
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ error: "Failed to delete document." });
  }
};
