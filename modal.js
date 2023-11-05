'use strict';
const win = document.querySelector('.win');
const overlay = document.querySelector('.overlay');
const buttonClose = document.querySelector('.close');
const buttonReset = document.querySelector('.reset');
const buttonFlip = document.querySelector('.flip');
const player2Mode = document.querySelector('.player-2 button');
const player2label = document.querySelector('.player-2 p');
let isPlayer2 = false;

buttonClose.addEventListener('click', CloseWin);
overlay.addEventListener('click', CloseWin);

// document.addEventListener('keydown', CloseWin);

document.addEventListener('keydown', function(e){
  if (e.key === 'Escape' || e.key === 'Enter' || e.key === 'Space') { 
    if (!win.classList.contains('hidden'))CloseWin();
  }
});

function CloseWin() {
  win.classList.add('invisible');
  overlay.classList.add('invisible');
}

buttonReset.addEventListener('click', ResetAllTdsToInitialState);
buttonFlip.addEventListener('click', SwitchBoard);

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
