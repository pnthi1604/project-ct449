const app = require('./app.js');
const connectDB = require('./db/connectDB.js');

const port = process.env.PORT;

app.listen(port, async () => {
    try {
        await connectDB();
        console.log(`Server is running on port ${port}.`);
    } catch (err) {
        console.log("Connect DB failed");
    }
});