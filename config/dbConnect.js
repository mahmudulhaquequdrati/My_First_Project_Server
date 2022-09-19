const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_SERVER_URI);
    } catch (error) {
        console.log(error);
    }
}
module.exports = connectDB;