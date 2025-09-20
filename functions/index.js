// functions/index.js
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const multer = require("multer");
const streamifier = require("streamifier");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const sharp = require("sharp");

admin.initializeApp();
const db = admin.firestore();

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
  res.json({ok: true, message: "Server running 🚀"});
});

// Upload endpoint
// Accepts folder: profile_images, medicine_receipts, scanned_images
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const folder = req.body.folder || "default_folder";

    if (!req.file) {
      return res.status(400).json({error: "No file uploaded"});
    }

    let buffer = req.file.buffer;

    // Compress receipts to ~10 KB
    if (folder === "medicine_receipts") {
      buffer = await sharp(buffer)
          .resize({width: 800, withoutEnlargement: true})
          .jpeg({quality: 20})
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
            },
        );
        streamifier.createReadStream(buffer).pipe(stream);
      });

    const result = await streamUpload(buffer);

    res.json({
      ok: true,
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      ok: false,
      error: err.message || "Internal Server Error",
    });
  }
});

// Export Express app as a Cloud Function
exports.api = functions.https.onRequest(app);

// Scheduled function to remove "pending" status after 1 minute
exports.clearPendingDonations = functions.pubsub
    .schedule("every 1 minutes")
    .onRun(async () => {
      console.log("Checking for pending donations older than 1 minute...");

      const now = admin.firestore.Timestamp.now();
      const cutoff = admin.firestore.Timestamp.fromMillis(
          now.toMillis() - 60 * 1000,
      );

      const snapshot = await db
          .collection("donations")
          .where("status", "==", "pending")
          .where("createdAt", "<=", cutoff)
          .get();

      if (snapshot.empty) {
        console.log("No pending donations to clear.");
        return null;
      }

      const batch = db.batch();
      snapshot.forEach((doc) => {
        console.log(
            `Removing pending status for donation ${doc.id}`,
        );
        batch.update(doc.ref, {status: "expired"});
      });

      await batch.commit();
      console.log("Pending donations cleared successfully.");

      return null;
    });
