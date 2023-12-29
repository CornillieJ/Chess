"use strict";
const win = document.querySelector(".win");
const overlay = document.querySelector(".overlay");
const buttonClose = document.querySelector(".close");
const buttonReset = document.querySelector(".reset");
const buttonLeft = document.querySelector(".left");
const buttonRight = document.querySelector(".right");
const buttonFlip = document.querySelector(".flip");
const player2Mode = document.querySelector(".player-2 button");
const player2label = document.querySelector(".player-2 p");
const PromotionWhite = document.querySelector(".promotion-white");
const PromotionBlack = document.querySelector(".promotion-black");
let isPlayer2 = false;
let switchBoardCanActivate = true;
let resetCanActivate = true;
let leftCanActivate = true;
let rightCanActivate = true;

buttonClose.addEventListener("click", CloseWin);
overlay.addEventListener("click", CloseWin);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "Enter" || e.key === "Space") {
    if (!win.classList.contains("hidden")) CloseWin();
  }
});
//win
function CloseWin() {
  if (!win.classList.contains("invisible")) {
    win.classList.add("invisible");
    overlay.classList.add("invisible");
  }
}
//#region promotion
function OpenPromotionBlack() {
  PromotionBlack.classList.remove("invisible");
  overlay.classList.remove("invisible");
}
function OpenPromotionWhite() {
  PromotionWhite.classList.remove("invisible");
  overlay.classList.remove("invisible");
}
function ClosePromotionBlack() {
  PromotionBlack.classList.add("invisible");
  overlay.classList.add("invisible");
}
function ClosePromotionWhite() {
  PromotionWhite.classList.add("invisible");
  overlay.classList.add("invisible");
}
//endregion

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
  if (e.key === "p" || e.key === "P") {
    OpenPromotionBlack();
  }
  if (e.key === "o" || e.key === "O") {
    OpenPromotionWhite();
  }
});

buttonReset.addEventListener("click", ResetDebounce);
buttonFlip.addEventListener("click", SwitchBoardDebounce);
buttonLeft.addEventListener("click", GoBackInHistoryDebounce);
buttonRight.addEventListener("click", GoForwardInHistoryDebounce);

player2Mode.addEventListener("click", () => {
  if (isPlayer2) {
    player2label.textContent = "OFF";
    player2label.style.color = "rgb(179, 0, 0)";
    isPlayer2 = false;
  } else {
    player2label.textContent = "ON";
    player2label.style.color = "green";
    isPlayer2 = true;
  }
});

document.getElementById("light").addEventListener("input", function (event) {
  let pickedColor = event.target.value;
  document.documentElement.style.setProperty("--color-light", pickedColor);
});

document.getElementById("dark").addEventListener("input", function (event) {
  let pickedColor = event.target.value;
  document.documentElement.style.setProperty("--color-dark", pickedColor);
});

function ResetDebounce() {
  if (resetCanActivate) {
    Reset();
    resetCanActivate = false;
    setTimeout(() => {
      resetCanActivate = true;
    }, 300);
  }
}

function SwitchBoardDebounce() {
  if (switchBoardCanActivate) {
    SwitchBoard();
    switchBoardCanActivate = false;
    setTimeout(() => {
      switchBoardCanActivate = true;
    }, 300);
  }
}
function GoBackInHistoryDebounce() {
  if (leftCanActivate) {
    GoBackInHistory();
    leftCanActivate = false;
    setTimeout(() => {
      leftCanActivate = true;
    }, 100);
  }
}
function GoForwardInHistoryDebounce() {
  if (rightCanActivate) {
    GoForwardInHistory();
    rightCanActivate = false;
    setTimeout(() => {
      rightCanActivate = true;
    }, 100);
  }
}

function SwitchBoard() {
  if (!switched) {
    table.classList.remove("rotated-full");
    table.classList.add("rotated");
    tableCells.forEach((cell) => {
      cell.classList.add("rotated-cells");
    });
    // table.style.transform = "rotate(180deg)";
    // tableCells.forEach(cell=>{cell.style.transform = "rotate(180deg)";});
    switched = true;
  } else {
    table.classList.add("rotated-full");
    table.classList.remove("rotated");
    tableCells.forEach((cell) => {
      cell.classList.remove("rotated-cells");
    });
    // table.style.transform = "none";
    // tableCells.forEach(cell=>{cell.style.transform = "none";});
    switched = false;
  }
}

function showToMoveText(isWhiteTurn) {
  if (isWhiteTurn) {
    whiteText.classList.remove("invisible");
    blackText.classList.add("invisible");
  } else {
    blackText.classList.remove("invisible");
    whiteText.classList.add("invisible");
  }
}

function ShowTurn() {
  turnText.textContent = Math.round(turn / 2);
}
