const mongoose = require('mongoose');

//connectDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://uname:pwd@cluster0.albej3z.mongodb.net/?appName=Cluster0');
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;