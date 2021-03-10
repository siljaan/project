const proxy = "https://cors-anywhere.herokuapp.com/";
const api = `${proxy}https://www.fazerfoodco.fi/api/restaurant/menu/week?language=fi&restaurantPageId=270540&weekDate=2020-03-03`;

fetch()
  .then(data => data.json())
  .then(data => console.log(data));