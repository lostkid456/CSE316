import Model from "./model.js";

window.onload = function () {
  // write relevant code.
  init();
};

function init() {
  var question = document.getElementById("question");
  question.style.backgroundColor = "#0281E8";
  const main = document.getElementById("main");
  const header_row = document.createElement("div");
  main.appendChild(header_row);
  const header_left = document.createElement("div");
  const header_middle = document.createElement("div");
  const header_right = document.createElement("div");
  header_row.appendChild(header_left);
  header_row.appendChild(header_middle);
  header_row.appendChild(header_right);
}

// document.getElementById("question").style.backgroundColor="lightgrey";
//   document.getElementById("question").addEventListener("mouseover",function(){
//     document.getElementById("question").style.backgroundColor="grey";
//   });
//   document.getElementById("question").addEventListener("mouseout",function(){
//     document.getElementById("question").style.backgroundColor="lightgrey";
//   });
