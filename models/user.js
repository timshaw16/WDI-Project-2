const mongoose    = require('mongoose');
const bcrypt      = require('bcrypt');

const userSchema  = new mongoose.Schema({
  username: {type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// The below is hashing a new password which has been changed by the user
userSchema.pre('save', function hashPassowrd(next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

// Password confirmation. The password confirmation isn't sotred in the db but checked beforehand
userSchema
.virtual('passwordConfirmation')
.set(function setPasswordConfirmation(passwordConfirmation){
  this._passwordConfirmation = passwordConfirmation;
});

// Not sure if I need to check the below
userSchema.pre('validate', function checkPassword(next) {
  if (this.isModified('password') && this._passwordConfirmation !== this.password) this.invalidate('passwordConfirmation', 'does not match');
  next();
});

// To compare their password the user enters into the 'login' form aginst the password which is stored in the db
userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
