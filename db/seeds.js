const mongoose   = require('mongoose');
const Promise    = require('bluebird');
mongoose.Promise = Promise;
// const rp         = require('request-promise');

const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/wdi-project-2';
mongoose.connect(dbURI);

const User    = require('../models/user');
const Country = require('../models/country');

// // Deletes users and parks
User.collection.drop();
Country.collection.drop();

User
.create([{
  username: 'Tim',
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
      image: 'images/.png',
      resort: [
        {
          name: 'Kitzbuhel',
          website: 'https://www.kitzbuehel.com/en',
          lat: 47.4363937,
          lng: 12.3551052,
          description: 'Kitzbuhel is a small Alpine town east of Innsbruck, in the western Austrian province of Tyrol. It\'s a fashionable winter resort, known for the annual Hahnenkamm downhill race. Upscale shops and cafes line the streets of its medieval center. Museum Kitzbühel chronicles the history of the town and the area’s winter sports, with paintings by local artist Alfons Walde. Its rooftop terrace has sweeping town views.'
        }
      ]
    },
    {
      region: 'Europe',
      country: 'Andorra',
      image: 'images/.png',
      resort: [
        {
          name: 'El Pas de la Casa',
          website: 'https://www.pasdelacasa.com',
          lat: 42.542445,
          lng: 1.7281864,
          description: 'The ski resort of Pas de la Casa sits below the pass on the side closest to France, and below the Pic d\'Envalira (2,827 metres (9,275 ft)). It\'s first ski lift was opened in 1957 and it now has 31 lifts, 100 kilometres (62 mi) of pistes and 6.26 square kilometres (2 sq mi) of skiable terrain. The highest skiable point is 2,640 metres (8,661 ft). Its popularity has grown with the burgeoning ski and snowboard industry in the principality: it is the highest resort in Andorra has the best snow record, and is the easiest to get to from Barcelona or Toulouse airports.'
        }
      ]
    },
    {
      region: 'Europe',
      country: 'Bulgaria',
      image: 'images/.png',
      resort: [
        {
          name: 'Bansko',
          website: 'http://www.bulgariaski.com/bansko',
          lat: 41.8356983,
          lng: 23.4694057,
          description: 'Bansko is a town at the foot of the Pirin Mountains, which are part of Pirin National Park, in southwest Bulgaria. It’s a gateway to numerous ski and snowboard slopes on Todorka Peak, including the challenging Tomba run. Footpaths cross the park’s craggy alpine landscape, home to bears and wolves. The park is also known for the high-altitude Vihren Peak, with forested ridges and striking glacial lakes'
        }
      ]
    },
    {
      region: 'Europe',
      country: 'France',
      image: 'images/.png',
      resort: [
        {
          name: 'Valmeinier',
          website: 'http://www.valmeinier.com/uk',
          lat: 45.1512076,
          lng: 6.4389113,
          description: 'Valmeinier is a commune in the Savoie department in the Auvergne-Rhone-Alpes region in south-eastern France. Valmeinier, located at the foot of the Mont Thabor, 3207 meters, is a medium size ski resort'
        }
      ]
    },
    {
      region: 'Europe',
      country: 'Italy',
      image: 'images/.png',
      resort: [
        {
          name: 'Sauze d\'Oulx',
          website: 'https://www.sauzeonline.com',
          lat: 45.0273981,
          lng: 6.8442727,
          description: 'Sauze d\'Oulx is a town and comune in the province of Turin, Piedmont located 80 kilometres from Turin in the Val di Susa, at the foot of Monte Genevris. It was the site of the freestyle skiing events of the 2006 Olympic Winter Games.'
        }
      ]
    },
    {
      region: 'Europe',
      country: 'Slovenia',
      image: 'images/.png',
      resort: [
        {
          name: 'Kranjska Gora',
          website: 'https://www.slovenia.info/en',
          lat: 46.4604035,
          lng: 13.700742,
          description: 'ituated just a few miles from the Italian and the Austrian borders, the picturesque village of Kranjska Gora is set in spectacular surroundings with the majestic Julian Alps as its backdrop. The resort is ideal for first time and improving skiers who will be well cared for by one of the top ski schools. Kranjska Gora offers plenty of cross country skiing and for non skiers, there’s an excursion programme to enjoy. The relaxed ambience of the resort with its local bars, restaurants, disco, casino and above all, the friendly Slovenian people makes for a truly memorable holiday..'
        }
      ]
    },
    {
      region: 'North America',
      country: 'Canada',
      image: 'images/.png',
      resort: [
        {
          name: 'Banff',
          website: 'https://www.banfflakelouise.com/',
          lat: 51.1769288,
          lng: -115.6034089,
          description: 'Banff is a resort town in the province of Alberta, located within Banff National Park. The peaks of Mt. Rundle and Mt. Cascade, part of the Rocky Mountains, dominate its skyline. On Banff Avenue, the main thoroughfare, boutiques and restaurants mix with château-style hotels and souvenir shops. The surrounding 6,500 square kilometres of parkland are home to wildlife including elk and grizzly bears.'
        }
      ]
    }
  ])
  .then(countries => {
    console.log(`${countries.length} were created`);
    // return getSkiAreas();
  })
  .catch(err => {
    console.log(`Error: ${err}`);
  })
  .finally(() => {
    // mongoose.connection.close();
  });

// const geocoder = require('node-geocoder')('google', 'https', {timeout: 3000});
// let counter = 0;
//
// // Can improve...
// function getSkiAreas() {
//   return rp({
//     url: 'https://skimap.org/SkiAreas/index.json',
//     json: true
//   })
//   .then(resort => {
//     return Promise.map(resorts, resort => {
//       const lat = resort['SkiArea'].geo_lat;
//       const lng = resort['SkiArea'].geo_lng;
//       counter++;
//       return findCountryAndSave(lat, lng, resort, counter);
//     });
//   })
//   .then(countries => {
//     console.log(`${countries.length} were updated`);
//   })
//   .catch(err => {
//     console.log(err);
//   });
// }
//
// function findCountryAndSave(lat, lng, resort, counter) {
//   if (!lat || !lng) return false;
//   // Something going on with return setTimout
//   // console.log('Reversing...', lat, lng, resort);
//   delay(counter)
//     .then(() => {
//       console.log('AFTER WAITING');
//       geocoder
//         .reverse({ lat: lat, lon: lng })
//         .then(data => {
//           if (!data[0].country) {
//             console.log('NO COUNTRY');
//             return;
//           } else {
//             console.log('Country', data[0].country);
//           }
//
//           Country
//             .findOne({ country: data[0].country })
//             .exec()
//             .then(country => {
//               if (!country) {
//                 console.log('NO country found?');
//                 return;
//               }
//
//               console.log(`Updating ${country.country}`);
//
//               country.resorts.addToSet({
//                 name: resort['SkiArea']['name'],
//                 website: resort['SkiArea']['official_website'],
//                 lat: resort['SkiArea']['geo_lat'],
//                 lng: resort['SkiArea']['geo_lng']
//               });
//
//               console.log('Count', counter);
//               return country.save();
//             })
//             .catch(err => {
//               console.log(err);
//             });
//         });
//     });
// }
//
// function delay(count) {
//   let ctr, rej;
//
//   const p = new Promise(function (resolve, reject) {
//     ctr = setTimeout(resolve, 500*count);
//     rej = reject;
//   });
//
//   p.cancel = function(){
//     clearTimeout(ctr);
//     rej(Error('Cancelled'));
//   };
//
//   return p;
// }
