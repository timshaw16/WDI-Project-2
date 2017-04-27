$(init);

function init() {
  // http://api.openweathermap.org/data/2.5/weather?lat=45.1512076&lon=6.4389113&units=metric&APPID=9a5c7fb07b3d9146420a92d6c9603028

  if ($('.resorts-header').text().length !== 0) getResortWeather();
}

function getResortWeather() {
  const $lis = $('.country-resort');
  console.log($lis);

  $.each($lis, function(index, resort) {
    const lat = $(resort).find('.weather').attr('data-lat');
    const lng = $(resort).find('.weather').attr('data-lng');

    $
      .get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&APPID=9a5c7fb07b3d9146420a92d6c9603028`)
      .done(data => {
        console.log(data);
        $(resort).find('.weather span').text(`${Math.floor(data.main.temp)}ºC with ${data.weather[0].description}.`);
      });
  });
}
