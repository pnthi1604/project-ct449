const app = require('./app.js');
const mongoose = require('mongoose')

const port = process.env.PORT;

app.listen(port, async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log(`Connect database successfully\nServer is running on port ${port}`);
    } catch (err) {
        console.log("Connect database failed");
    }
});