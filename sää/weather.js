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
        console.log(data);
        console.log(api);
        return data;
    })
    .then(function(data){
        weather.tila = data.list[0].main.temp-273.15;
        weather.iconId = data.list[0].weather[0].icon;
        console.log(weather.iconId);
    })
    .then(function(){
        displayWeather();
    })
    function displayWeather() {
        
                const place = document.querySelector(".degree");
                place.innerHTML = weather.tila;
                const iconElement = document.querySelector("description");
                let icon = document.createElement("img");
                iconElement.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.iconId}.png"/>`;
                
            }
            iconElement.appendChild(icon);
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