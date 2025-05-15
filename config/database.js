// backend/config/database.js
const mongoose = require('mongoose');
const dotenv  = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}`;
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connecté sur ${mongoose.connection.host}`);
  } catch (err) {
    console.error('Erreur de connexion à MongoDB :', err);
    process.exit(1);  // quitte le process en cas d’échec critique
  }
};

module.exports = connectDB;
