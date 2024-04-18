const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    contentType: {
        type: String,
        required: [true, "Content type is required"],
    },
    data: {
        type: Buffer,
        required: [true, "Image is required"],
    },
});

const Image = mongoose.model("Image", ImageSchema);
module.exports = Image;