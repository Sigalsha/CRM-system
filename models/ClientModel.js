const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  email: { type: String },
  firstContact: { type: String },
  emailType: { type: String },
  sold: { type: Boolean, required: true },
  owner: { type: String, required: true, minlength: 3 },
  country: { type: String, required: true, minlength: 3 },
});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
