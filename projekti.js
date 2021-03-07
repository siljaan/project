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

