const mongoose = require('mongoose');

// ----------------------------------------------------
// Definición Task Schema
// ----------------------------------------------------

cont taskSchema = new mongoose.Schema({
  user_id: {type: String, required: true},
  name: {type: String, required: true},
  desciption: {type: String, required: false},
  status: {type: String, required: true}
});

const task = mongoose.model('Task', taskSchema);
module.exports = task;
