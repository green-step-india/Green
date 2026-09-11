
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function handleImageUpload(req, res) {
  try {
    const { imageFileBase64 } = req.body;
    if (!imageFileBase64) {
      return res.status(400).json({ error: "No image provided." });
    }

    const uploadResponse = await cloudinary.uploader.upload(imageFileBase64, {
      folder: "greenstep_actions"
    });

    return res.status(200).json({
      success: true,
      url: uploadResponse.secure_url
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return res.status(500).json({ error: "Image upload failed." });
  }
}

module.exports = { handleImageUpload };
