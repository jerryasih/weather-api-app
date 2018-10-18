let states = [
  {
    name: "Abia",
    cityID: "2327494"
  },
  {
    name: "Adamawa",
    cityID: ""
  },
  {
    name: "Akwa Ibom",
    cityID: "2328765"
  },
  {
    name: "Anambra",
    cityID: ""
  },
  {
    name: "Bauchi",
    cityID: "2347470"
  },
  {
    name: "Bayelsa",
    cityID: ""
  },
  {
    name: "Benue",
    cityID: "2332515"
  },
  {
    name: "Borno",
    cityID: ""
  },
  {
    name: "Cross River",
    cityID: "2346229"
  },
  {
    name: "Delta",
    cityID: "2323675"
  },
  {
    name: "Ebonyi",
    cityID: ""
  },
  {
    name: "Enugu",
    cityID: "2343279"
  },
  {
    name: "Edo",
    cityID: "2348892"
  },
  {
    name: "Ekiti",
    cityID: "2595346"
  },
  {
    name: "Gombe",
    cityID: "2340451"
  },
  {
    name: "Imo",
    cityID: "2327546"
  },
  {
    name: "Jigawa",
    cityID: "2328617"
  },
  {
    name: "Kaduna",
    cityID: "2335727"
  },
  {
    name: "Kano",
    cityID: "2335204"
  },
  {
    name: "Katsina",
    cityID: "2334802"
  },
  {
    name: "Kebbi",
    cityID: ""
  },
  {
    name: "Kogi",
    cityID: "2352778"
  },
  {
    name: "Kwara",
    cityID: "2565345"
  },
  {
    name: "Lagos",
    cityID: "2332459"
  },
  {
    name: "Nasarawa",
    cityID: "2347468"
  },
  {
    name: "Niger",
    cityID: ""
  },
  {
    name: "Ogun",
    cityID: "2350592"
  },
  {
    name: "Ondo",
    cityID: "2326171"
  },
  {
    name: "Osun",
    cityID: "2338385"
  },
  {
    name: "Oyo",
    cityID: "2325200"
  },
  {
    name: "Plateau",
    cityID: "2335953"
  },
  {
    name: "Rivers",
    cityID: "2324774"
  },
  {
    name: "Sokoto",
    cityID: "2322911"
  },
  {
    name: "Taraba",
    cityID: ""
  },
  {
    name: "Yobe",
    cityID: ""
  },
  {
    name: "Zamfara",
    cityID: "2323344"
  },
]

let apiKey = "6a0796b8359025f367ca9f9cc36e1598";
let apiUrl =
  "http://api.openweathermap.org/data/2.5/weather?id=";
let selectContainer = document.querySelector('#statesSelector');
let btn = document.querySelector('#getWeatherDataBtn');
let weatherData = null;
let iconUrl = "http://openweathermap.org/img/w/";
let loader = document.querySelector('.loading');
var map;

let cityName = document.querySelector('#cityName');
let description = document.querySelector('#description');
let icon = document.querySelector('#icon');
let googleMaps = document.querySelector('#googleMaps');



function init() {
  
  selectContainer.innerHTML = '';

  for (let i = 0; i < states.length; i++) {
    let option = document.createElement('option');

    if (states[i].cityID !== "") {
      option.setAttribute('value', states[i].cityID);
    }
    else {
      // set default city ID to Lagos, NG
      option.setAttribute('value', '');
      option.setAttribute('disabled', 'true');
    }

    option.innerHTML = states[i].name;
    
    selectContainer.append(option);
  }

}


// Function to initialize map data
function initMap(lat, long) {
  map = new google.maps.Map(document.getElementById('googleMaps'), {
    center: {
      lat: lat,
      lng: long
    },
    zoom: 10
  });
}




function loadWeather(id) {
  // display loading spinner
  loading.classList.remove('hidden');
  loading.classList.add('visible');

  // hide current weather data, if displayed
  cityName.classList.remove('visible');
  description.classList.remove('visible');
  icon.classList.remove('visible');
  googleMaps.classList.remove('visible');
  
  fetch(apiUrl + id + '&appid=' + apiKey)
  
  .then((response) => response.json())
  
  .then(function(response) {
    weatherData = response;

    if (weatherData.base !== undefined) {
      // Adding a setTimeout so that the fading out effect can finish displaying before the container is hidden.
      loading.classList.remove('visible');
      setTimeout(() => {
        loading.classList.add('hidden');
      },300);
        
      cityName.innerHTML = weatherData.name;
      description.innerHTML = '(' + weatherData.weather[0].description + ')';
      
      let img = icon.getElementsByTagName('img');
      
      let currentIconUrl = iconUrl + weatherData.weather[0].icon + '.png';
      
      img[0].setAttribute('src', currentIconUrl);

      cityName.classList.add('visible');
      description.classList.add('visible');
      icon.classList.add('visible');

      // Load map
      initMap(weatherData.coord.lat, weatherData.coord.lon);

      googleMaps.classList.remove('hidden');
      googleMaps.classList.add('visible');
    }

  });
}



btn.onclick = function() {
  let id = selectContainer.value;
  loadWeather(id);
  
  if (weatherData !== null) {

  }
}



init();