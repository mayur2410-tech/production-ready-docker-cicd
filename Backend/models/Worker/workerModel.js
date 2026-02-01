


const { Schema, model } = require('mongoose');

const workerSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "worker" } // Default role as "worker"
}, { collection: 'workers' }); // Define the collection name as 'workers'

module.exports = model("Worker", workerSchema);