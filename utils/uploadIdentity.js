
const uploadIdentity = (file) => {
try {
   
    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      { folder: 'identity_card' },
      async (err, result) => {
        if (err) throw err;
        removeTmp(file.tempFilePath);

        return ({ id: result.public_id, url: result.secure_url });
      }
    );
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
}

module.exports = uploadIdentity