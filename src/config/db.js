const mongoose = require('mongoose');

const MONGO_URL = process.env.BD_URL || 'mongodb://localhost:27017/todo-app';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL, {});
    console.log('Base de datos conectada');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    process.exit(1);
  }
};

module.exports = connectDB;

