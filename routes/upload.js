const router = require('express').Router();
const cloudinary = require('cloudinary');
const auth = require('../middlewares/auth');
const fs = require('fs');
const upload = require('../middlewares/upload');

// we will upload image on cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Upload image identification
router.post('/upload-identity', auth, upload, (req, res) => {
  try {
    const {file} = req.files;

    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      { folder: 'identity_card' },
      async (err, result) => {
        if (err) throw err;

        removeTmp(file.tempFilePath);

        res.json({ id: result.public_id, url: result.secure_url });
      }
    );
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

router.post('/upload-proof-of-address', auth, upload, (req, res) => {
  try {
    const {file} = req.files;

    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      { folder: 'proof_of_address' },
      async (err, result) => {
        if (err) throw err;

        removeTmp(file.tempFilePath);

        res.json({ id: result.public_id, url: result.secure_url });
      }
    );
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

// Delete image only admin can use
router.post('/destroy', auth, (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id) return res.status(400).json({ msg: 'No images Selected' });

    cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
      if (err) throw err;

      res.json({ msg: 'Deleted Image' });
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

module.exports = router;
