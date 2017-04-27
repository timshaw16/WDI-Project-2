$(init);

function init() {
  if ($('.resorts-header').text().length !== 0) getResortWeather();
}

function getResortWeather() {
  const lis = $('.country-resort');

  $.each(lis, function(i, resort) {
    const lat = $(resort).find('.weather').attr('data-lat');
    const lng = $(resort).find('.weather').attr('data-lng');

    $
      .get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&APPID=9a5c7fb07b3d9146420a92d6c9603028`)
      .done(data => {
        $(resort).find('.display-weather').text(`${Math.floor(data.main.temp)}ºC with ${data.weather[0].description}.`);
      });

    $
      .get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=b630c0b08a57f8c570460f2b9694285f&lat=${lat}&lon=${lng}&min_taken_date=1420070400&per_page=4&format=json&nojsoncallback=1`)
      .done(data => {
        data.photos.photo.forEach(photo => {
          $(`<img src="http://farm${photo.farm}.static.flickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg">`).appendTo($('.photoContainer'));
        });
      });
  });
}
