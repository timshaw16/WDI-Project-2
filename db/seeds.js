const mongoose    = require('mongoose');
mongoose.Promise  = require('bluebird');

const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/wdi-project-2';
mongoose.connect(dbURI);

const User    = require('../models/user');
const Country = require('../models/country');

User.collection.drop();
Country.collection.drop();

User
.create([{
  username: 'admin',
  email: 'tshaw2008@icloud.com',
  password: 'password',
  passwordConfirmation: 'password'
}])
.then((user) => {
  console.log(`${user.length} users created`);
})
.finally(() => {
  mongoose.connection.close();
});
