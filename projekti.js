import HSLData from './modules/hsl-data';

const switchLanguage = () => {

  loadAllMenuData();
};

const loadAllMenuData = async () => {
  for (const restaurant of restaurants) {
    try {
      const parsedMenu = await restaurant.type.getDailyMenu(restaurant.id, languageSetting, today);
      renderMenu(parsedMenu, restaurant.name);
    } catch (error) {
      console.error(error);
      // notify user if errors with data
      renderNoDataNotification('No data available..', restaurant.name);
    }
  }
};
const loadHSLData = async () => {
  const result = await HSLData.getRidesByStopId(2132208);
  const stop = result.data.stop;
  console.log('loadHSLData', stop);
  const stopElement = document.createElement('div');
  stopElement.innerHTML = `<h3>Seuraavat vuorot pysäkiltä ${stop.name}</h3><ul>`;
  for (const ride of stop.stoptimesWithoutPatterns) {
    stopElement.innerHTML += `<li>${ride.trip.routeShortName},
      ${ride.trip.tripHeadsign},
      ${HSLData.formatTime(ride.scheduledDeparture)}</li>`;
  }
  stopElement.innerHTML += `</ul>`;
  document.querySelector('.hsl-data').appendChild(stopElement);
};

window.onhashchange = function(){
  // render function is called every hash change.
  render(window.location.hash);
};

function render(hashKey) {

//first hide all divs
let pages = document.querySelectorAll(".page");
for (let i = 0; i < pages.length; ++i) {
  pages[i].style.display = 'none';
}

//...now do same with lis
let lis_nav = document.querySelectorAll(".box");
for (let i = 0; i < lis_nav.length; ++i) {
  lis_nav[i].classList.remove("active");
}

//then unhide the one that user selected
//console.log(hashKey);
switch(hashKey){
  case "":
      pages[0].style.display = 'block';
      document.getElementsByClassName("logo").classList.add("active");
      break;
  case "#menu":
      pages[1].style.display = 'block';
      document.getElementById("box1").classList.add("active");
      break;
  case "#time":
      pages[2].style.display = 'block';
      document.getElementById("box2").classList.add("active");
      break;
  case "#weather":
      pages[3].style.display = 'block';
      document.getElementById("box3").classList.add("active");
      break;
  case "#event":
      pages[4].style.display = 'block';
      document.getElementById("box4").classList.add("active");
      break;
  default:
      pages[0].style.display = 'block';
      document.getElementsByClassName("logo").classList.add("active");
}// end switch
};//end fn

//MENUS --------------------------------------------
const menu = {};

function getMenu () {
    const today = new Date().toISOString().split('T')[0]; 
    console.log(today);
    const api = `https://www.sodexo.fi/ruokalistat/output/daily_json/152/${today}`;

    fetch(api)
    .then(function(response){
        let data = response.json();
        console.log(data);
        return data;
    })
    .then(function(data) {
        menu.place = data.meta.ref_title;
        console.log(menu.place);
        menu.menus = data.courses;
        var text = "";
        var x;
        var mainContainer = document.getElementById("menus");
        var priceContainer = document.getElementById("price");
        var dietContainer = document.getElementById("diet");

        function addText() {
        for (x in data.courses){
            
            var text = data.courses[x].title_fi;
            var prices = data.courses[x].price;
            var diets = data.courses[x].dietcodes;
            var price = document.createElement("li");
            var dish = document.createElement("li");
            var diet = document.createElement("li");
            price.textContent = prices;
            dish.textContent = text;
            diet.textContent = diets;
            priceContainer.appendChild(price);
            mainContainer.appendChild(dish);
            dietContainer.appendChild(diet);
        }
    }
        addText(text);
        console.log(menu.menus);
    })
    .then(function(){
        displayMenu();
    })
    function displayMenu() {
        const place = document.querySelector(".place");
        place.innerHTML = menu.place;
    }
};

//WEATHERS ---------------------------
const weather = {};
// weather.temperature = {
//     unit : "celsius"
// }


// if('geolocation' in navigator){
//     navigator.geolocation.getCurrentPosition(setPosition, showError);
// }else{
//     NotificationElement.style.display = "block";
//     NotificationElement.innerHTML = "<p>Browser doesn't support</p>";
// }

// function setPosition(position){
//     let latitude = position.coords.latitude;
//     let longitude = position.coords.longitude;
//     getWeather(latitude, longitude);
// }

// function showError(error){
//     notificationElement.style.display = "block";
//     notificationElement.innerHTML = '<p> ${error.message} </p>';
// }

function getWeather () {
    let api = 'http://api.openweathermap.org/data/2.5/forecast?q=Vantaa&appid=86f94b479af9041fc281c8e0829cbe47';

    fetch(api)
    .then(function(response){
        let data = response.json();
        return data;
    })
    .then(function(data){
        weather.tila = data.list[0].main.temp-273.15;
        weather.iconId = data.list[0].weather[0].icon;
        weather.list = data.list;
        const mainContainer = document.querySelector(".day");
        const iconContainer = document.querySelector(".icon");
        var text = "";
        function addList() {       
        for(var i=0; i<weather.list.length; i++){ 
            var everyNinth = (i+1) % 8 === 0;            
            if (everyNinth) {
                var saa = document.createElement("div"); 
                var icon = document.createElement("div");               
                weather.tila1 = data.list[i].main.temp-273.15;
                weather.icon1 = data.list[i].weather[0].icon;
                saa.innerHTML = weather.tila1.toFixed(0)+"°C";
                icon.innerHTML = "<img src='http://openweathermap.org/img/wn/"+weather.icon1+"@2x.png'>";
                mainContainer.appendChild(saa);
                saa.appendChild(icon);
                console.log(weather.tila1);
            console.log(data.list[i].weather[0].icon);
        }
        }}
        addList();
    })
    .then(function(){
        displayWeather();
    })
    function displayWeather() {
        const place = document.querySelector(".degree");
        place.innerHTML = weather.tila.toFixed(0) + "°C";
        const iconElement = document.querySelector(".description");
        iconElement.innerHTML = "<img src='http://openweathermap.org/img/wn/"+weather.iconId+"@2x.png'/>"; 
        }
}


// function getWeather () {
//     const today = "2021-03-03"; /* new Date().toISOString().split('T')[0]; */
//     console.log(today);
//     const api = `https://www.sodexo.fi/ruokalistat/output/daily_json/152/${today}`;

//     fetch(api)
//     .then(function(response){
//         let data = response.json();
//         console.log(data);
//         return data;
//     })
//     .then(function(data) {
//         menu.place = data.meta.ref_title;
//         console.log(menu.place);
//         menu.menus = data.courses;
//         var text = "";
//         var x;
//         var mainContainer = document.getElementById("menus");
//         for (x in data.courses){
//             var dish = document.createElement("li");
//             text += data.courses[x].title_fi + data.courses[x].price +
//             data.courses[x].dietcodes+"<br>";
//             dish.innerHTML = text;
//         }
//         mainContainer.appendChild(dish);
//         console.log(menu.menus);
//     })
//     .then(function(){
//         displayMenu();
//     })
//     function displayMenu() {
//         const place = document.querySelector(".place");
//         place.innerHTML = menu.place;
//     }
// }
function getDay() {
    var d = new Date();
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    var container = document.getElementById("demo");
    
    function addText() {
for(i=0; i<5; i++){
        var n = d.getDay(); 
 
        var weekdays = [d.getDay()+n+i];
    
        var day = document.createElement("li");
        day.textContent = weekdays;        
        container.appendChild(day);
    }
    }
    addText(d.getDay());
  }

  function init() {
    getMenu();
    getWeather();
    loadAllMenuData();
    loadHSLData();
  }

  init();