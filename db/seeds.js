const mongoose   = require('mongoose');
const Promise    = require('bluebird');
mongoose.Promise = Promise;
const rp         = require('request-promise');

const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/wdi-project-2';
mongoose.connect(dbURI);

const User    = require('../models/user');
const Country = require('../models/country');

// // Deletes users and parks
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
      image: 'images/Austria.png'
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
      country: 'United States',
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
    return getSkiAreas();
  })
  .catch(err => {
    console.log(`Error: ${err}`);
  })
  .finally(() => {
    // mongoose.connection.close();
  });

const geocoder = require('node-geocoder')('google', 'https', {timeout: 3000});
let counter = 0;

// Can improve...
function getSkiAreas() {
  return rp({
    url: 'https://skimap.org/SkiAreas/index.json',
    json: true
  })
  .then(resorts => {
    return Promise.map(resorts, resort => {
      const lat = resort['SkiArea'].geo_lat;
      const lng = resort['SkiArea'].geo_lng;
      return findCountryAndSave(lat, lng, resort);
    });
  })
  .then(countries => {
    console.log(`${countries.length} were updated`);
  })
  .catch(err => {
    console.log(err);
  });
}

function findCountryAndSave(lat, lng, resort) {
  if (!lat || !lng) return false;
  counter++;

  // Something going on with return setTimout
  console.log('Reversing...', lat, lng, resort);
  delay(counter)
    .then(() => {
      console.log('AFTER WAITING');
      geocoder
        .reverse({ lat: lat, lon: lng })
        .then(data => {
          if (!data[0].country) {
            console.log('NO COUNTRY');
            return;
          } else {
            console.log('Country', data[0].country);
          }

          Country
            .findOne({ country: data[0].country })
            .exec()
            .then(country => {
              if (!country) {
                console.log('NO country found?');
                return;
              }

              console.log(`Updating ${country.country}`);

              country.resorts.addToSet({
                name: resort['SkiArea']['name'],
                website: resort['SkiArea']['official_website'],
                lat: resort['SkiArea']['geo_lat'],
                lng: resort['SkiArea']['geo_lng']
              });

              return country.save();
            })
            .catch(err => {
              console.log(err);
            });
        });
    });
}

function delay(count) {
  let ctr, rej;

  const p = new Promise(function (resolve, reject) {
    ctr = setTimeout(resolve, 500*count);
    rej = reject;
  });

  p.cancel = function(){
    clearTimeout(ctr);
    rej(Error('Cancelled'));
  };

  return p;
}
