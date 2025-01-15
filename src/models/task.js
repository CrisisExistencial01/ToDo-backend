const mongoose = require('mongoose');

// ----------------------------------------------------
// Definición Task Schema
// ----------------------------------------------------

cont taskSchema = new mongoose.Schema({
  name: {type: String, required: true},
  desciption: {type: String, required: false},
  status: {type: String, required: true}
});
