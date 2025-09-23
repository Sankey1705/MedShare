const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

console.log("Cloudinary config:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY ? "✅ loaded" : "❌ missing",
});

const express = require("express");
const multer = require("multer");
const streamifier = require("streamifier");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const sharp = require("sharp");

const app = express();
app.use(cors());
app.use(express.json());
const upload = multer();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Health check
app.get("/ping", (req, res) => {
  res.json({ ok: true, message: "Server running 🚀" });
});

// Upload endpoint
// folder: profile_images, medicine_receipts, scanned_images
app.post("/upload", upload.single("file"), async (req, res, next) => {
  try {
    const folder = req.body.folder || "default_folder";

    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    let buffer = req.file.buffer;

    // Compress receipts to ~10 KB
    if (folder === "medicine_receipts") {
      buffer = await sharp(buffer)
        .resize({ width: 800, withoutEnlargement: true }) // optional resize
        .jpeg({ quality: 20 }) // aggressive compression
        .toBuffer();
    }

    const streamUpload = (buffer) =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: `medshare/${folder}`,
            resource_type: "image",
          },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(buffer).pipe(stream);
      });

    const result = await streamUpload(buffer);

    res.json({ ok: true, url: result.secure_url, publicId: result.public_id });
  } catch (err) {
    next(err);
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res.status(500).json({ ok: false, error: err.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
