const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const originalName = file.originalname;
    const ext = originalName.split(".").pop().toLowerCase();
    const filename = originalName.replace(/\.[^/.]+$/, ""); // remove extension

    const isDoc = ["pdf", "doc", "docx"].includes(ext);

    return {
      folder: "school-documents",
      resource_type: isDoc ? "raw" : "image",
      public_id: `${filename}.${ext}`, // 🔥 keep original extension in URL
      format: ext,
    };
  },
});

module.exports = { cloudinary, storage };
