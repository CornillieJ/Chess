"use strict";

///////////////////////////////////
///////////variables///////////////
///////-----------------///////////
let allPieces = document.querySelectorAll(
  ".bpawn, .brook, .bbishop, .bknight, .bqueen, .bking, .wpawn, .wrook, .wbishop, .wknight, .wqueen, .wking"
);
let squares = document.querySelectorAll("td");
const piecesArray = [
  "bpawn",
  "brook",
  "bbishop",
  "bknight",
  "bqueen",
  "bking",
  "wpawn",
  "wrook",
  "wbishop",
  "wknight",
  "wqueen",
  "wking",
];
let moved = false;
let legals = [];
let selection = document.querySelector(".selected");
///////-----------------///////////
///////////variables///////////////
///////////////////////////////////

///////////////////////////////////
///////////functions///////////////
///////-----------------///////////
function Update() {
  allPieces = document.querySelectorAll(
    ".bpawn, .brook, .bbishop, .bknight, .bqueen, .bking, .wpawn, .wrook, .wbishop, .wknight, .wqueen, .wking"
  );
  selection = document.querySelector(".selected");
}

function MovePieces(square) {
  allPieces.forEach((piece) => {
    if (piece.classList.contains("selected")) {
      CopyClasses(piece, square);
      if (piece.id !== square.id) piece.classList = [];
      moved = true;
    }
  });
  squares.forEach((square) => {
    square.classList.remove("selected");
    HideLegalMoves(square);
  });
  if (moved === false) {
    ShowLegalMoves(square);
    square.classList.add("selected");
  } else {
    moved = false;
  }
  Update();
}

function CopyClasses(from, to) {
  if (to.id !== from.id) {
    to.classList = [];
    for (let i = 0; i < from.classList.length; i++) {
      to.classList.add(from.classList[i]);
    }
    to.classList.remove("selected");
  }
}

function ShowLegalMoves(piece) {
  if (piece.classList.contains("wpawn")) {
    let legalCoords = LegalWhitePawnMoves(piece);
    for (let i = 0; i < legalCoords.length; i++) {
      document.getElementById(legalCoords[i]).classList.add("legal");
    }
  }
}

function HideLegalMoves(square) {
  square.classList.remove("legal");
}

function LegalWhitePawnMoves(piece) {
  let placement = piece.id;
  let legalChar = placement.charAt(0);
  let legalNum = parseInt(placement.slice(1), 10);
  let legal1 = legalChar + (legalNum + 1);
  let legal2 = legalChar + (legalNum + 2);
  return [legal1, legal2];
}
///////-----------------///////////
///////////functions///////////////
///////////////////////////////////

///////////////////////////////////
/////////////events////////////////
///////-----------------///////////
squares.forEach((square) => {
  square.addEventListener("click", () => {
    MovePieces(square);
  });
});
///////-----------------///////////
/////////////events////////////////
///////////////////////////////////
