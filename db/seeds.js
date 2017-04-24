const mongoose    = require('mongoose');
mongoose.Promise  = require('bluebird');

const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/wdi-project-2';
mongoose.connect(dbURI);

const User    = require('../models/user');
const Country = require('../models/country');

// Deletes users and parks
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
});

Country
  .create([
    {
      region: 'Europe',
      country: 'Austria',
      image: 'images/Austria.gif'
    },
    {
      region: 'Europe',
      country: 'France',
      image: 'images/France.png'
    },
    {
      region: 'Europe',
      country: 'Germany',
      image: 'images/Germany.png'
    },
    {
      region: 'Europe',
      country: 'Italy',
      image: 'images/Italy.png'
    },
    {
      region: 'Europe',
      country: 'Spain',
      image: 'images/Spain.png'
    },
    {
      region: 'Europe',
      country: 'Switzerland',
      image: 'images/Switzerland.png'
    },
    {
      region: 'North America',
      country: 'Canada',
      image: 'images/Canada.png'
    },
    {
      region: 'North America',
      country: 'USA',
      image: 'images/USA.png'
    },
    {
      region: 'South America',
      country: 'Argentina',
      image: 'images/Argentina.png'
    },
    {
      region: 'South America',
      country: 'Chile',
      image: 'images/Chile.png'
    },
    {
      region: 'Asia',
      country: 'China',
      image: 'images/China.png'
    },
    {
      region: 'Asia',
      country: 'India',
      image: 'images/India.png'
    },
    {
      region: 'Asia',
      country: 'Japan',
      image: 'images/Japan.png'
    },
    {
      region: 'Asia',
      country: 'South Korea',
      image: 'images/South-korea.png'
    },
    {
      region: 'Asia',
      country: 'Kyrgyzstan',
      image: 'images/Kyrgyzstan.png'
    },
    {
      region: 'Oceania',
      country: 'Australia',
      image: 'images/Australia.png'
    },
    {
      region: 'Oceania',
      country: 'New Zealand',
      image: 'images/New-Zealand.png'
    }
  ])
  .then(countries => {
    console.log(`${countries.length} were created`);
    process.exit();
  })
  .catch(err => {
    console.log(`Error: ${err}`);
  })

.finally(() => {
  mongoose.connection.close();
});
