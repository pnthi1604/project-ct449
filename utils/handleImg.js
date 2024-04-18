const multer = require("multer");
const Buffer = require("buffer").Buffer;

const renderImageUrl = (contentType, data) => {
  return `data:${contentType};base64,${Buffer.from(data).toString("base64")}`;
};

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("Incorrect file");
    error.code = "INCORRECT_FILETYPE";
    return cb(error, false);
  }
  cb(null, true);
};

const upload = multer({
  dest: "./uploads",
  fileFilter,
  limits: {
    fileSize: 1000000,
  },
});

module.exports = {
  upload,
  renderImageUrl,
}
