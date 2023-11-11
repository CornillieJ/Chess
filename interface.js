'use strict';
const win = document.querySelector('.win');
const overlay = document.querySelector('.overlay');
const buttonClose = document.querySelector('.close');
const buttonReset = document.querySelector('.reset');
const buttonLeft = document.querySelector('.left');
const buttonRight = document.querySelector('.right');
const buttonFlip = document.querySelector('.flip');
const player2Mode = document.querySelector('.player-2 button');
const player2label = document.querySelector('.player-2 p');
let isPlayer2 = false;
let switchBoardCanActivate = true;
let resetCanActivate = true;
let leftCanActivate = true;
let rightCanActivate = true;



buttonClose.addEventListener('click', CloseWin);
overlay.addEventListener('click', CloseWin);
document.addEventListener('keydown', function(e){
  if (e.key === 'Escape' || e.key === 'Enter' || e.key === 'Space') { 
    if (!win.classList.contains('hidden'))CloseWin();
  }
});

function CloseWin() {
  win.classList.add('invisible');
  overlay.classList.add('invisible');
}

document.addEventListener("keydown", function (e) {
  if (e.key === "r" || e.key === "R") {
    ResetDebounce();
  }
  if (e.key === "f" || e.key === "F") {
    SwitchBoardDebounce();
  }
  if (e.key === "ArrowLeft") {
    GoBackInHistoryDebounce();
  }
  if (e.key === "ArrowRight") {
    GoForwardInHistoryDebounce();
  }
});

buttonReset.addEventListener('click', ResetDebounce);
buttonFlip.addEventListener('click', SwitchBoardDebounce);
buttonLeft.addEventListener('click', GoBackInHistoryDebounce);
buttonRight.addEventListener('click', GoForwardInHistoryDebounce);

player2Mode.addEventListener('click', ()=>{
  if(isPlayer2){
    player2label.textContent='OFF';
    player2label.style.color = 'rgb(179, 0, 0)';
    isPlayer2=false;
  }
  else{
    player2label.textContent='ON';
    player2label.style.color = 'green';
    isPlayer2=true;
  }
});

document.getElementById("light").addEventListener("input", function(event) {
  let pickedColor = event.target.value;
  document.documentElement.style.setProperty('--color-light', pickedColor);
});

document.getElementById("dark").addEventListener("input", function(event) {
  let pickedColor = event.target.value;
  document.documentElement.style.setProperty('--color-dark', pickedColor);
});





function ResetDebounce(){
  if (resetCanActivate) {
    Reset();
    resetCanActivate = false;
    setTimeout(() => { resetCanActivate = true }, 300);
  }
}

function SwitchBoardDebounce(){
  if (switchBoardCanActivate) {
    SwitchBoard();
    switchBoardCanActivate = false;
    setTimeout(() => { switchBoardCanActivate = true }, 300);
  }
}
function GoBackInHistoryDebounce(){
  if (leftCanActivate) {
    GoBackInHistory();
    leftCanActivate = false;
    setTimeout(() => { leftCanActivate = true }, 100);
  }
}
function GoForwardInHistoryDebounce(){
  if (rightCanActivate) {
    GoForwardInHistory();
    rightCanActivate = false;
    setTimeout(() => { rightCanActivate = true }, 100);
  }
}