const menu = {};

function getMenu () {
    let api = 'https://www.sodexo.fi/ruokalistat/output/weekly_json/152';
    fetch(api)
    .then(function(response){
        let data = response.json();
        return data;
    })
    .then(function(data){
        menu.id = data.mealdates;
        menu.week = data.timeperiod;

        var mainContainer = document.getElementById("contain");
        for (var i=0; i<menu.id.length;i++){
            console.log(data.mealdates[i]);
            var div = document.createElement("ul");
            var food = document.createElement("li");
            var text = "";
            var x;
            for (x in data.mealdates[i].courses){
                text += data.mealdates[i].courses[x].title_fi + "<br>";
                food.innerHTML = text;
            }
            div.innerHTML = data.mealdates[i].date +":";
            mainContainer.appendChild(div);
            div.appendChild(food);
    }
        console.log(menu.id);
    })

    .then(function(){
        displayMenu();
    })

function displayMenu () {
    const week = document.querySelector(".notification");
    week.innerHTML = menu.week;
}   
}