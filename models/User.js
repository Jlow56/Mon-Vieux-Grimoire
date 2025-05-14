const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
  email: String,
  password: String
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema);