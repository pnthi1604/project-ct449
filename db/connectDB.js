const mongoose = require('mongoose');

const url = process.env.MONGO_URL;

const connectDB = async () => {
    await mongoose.connect(url);
    console.log("Connect MongoDB succesfully");
};

module.exports = connectDB;