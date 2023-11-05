'use strict';
const win = document.querySelector('.win');
const overlay = document.querySelector('.overlay');
const button = document.querySelector('.close');


button.addEventListener('click', CloseWin);
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