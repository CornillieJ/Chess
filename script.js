"use strict";

///////////////////////////////////
///////////variables///////////////
///////-----------------///////////
let allPieces = document.querySelectorAll(
  ".bpawn, .brook, .bbishop, .bknight, .bqueen, .bking, .wpawn, .wrook, .wbishop, .wknight, .wqueen, .wking"
);
let squares = document.querySelectorAll("td");
const blackPiecesArray = [
"bpawn",
"brook",
"bbishop",
"bknight",
"bqueen",
"bking"
];
const whitePiecesArray = [
"wpawn",
"wrook",
"wbishop",
"wknight",
"wqueen",
"wking"];
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
const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
let previousId = 0;
let selected = 0;
///////-----------------///////////
///////////variables///////////////
///////////////////////////////////

///////////////////////////////////
///////////functions///////////////
///////-----------------///////////
function haveCommonClass(element1, element2) {
  const classList1 = element1.classList;
  const classList2 = element2.classList;

  for (const className of classList1) {
    if (classList2.contains(className)) {
      return true;
    }
  }
  return false;
}

function Update() {
  allPieces = document.querySelectorAll(
    ".bpawn, .brook, .bbishop, .bknight, .bqueen, .bking, .wpawn, .wrook, .wbishop, .wknight, .wqueen, .wking"
  );
  selection = document.querySelector(".selected");
}

function selectPieces(squares, square) {
  if (previousId !== 0) {
    squares.forEach((square) => {
      HideLegalMoves(square);
    });
    selected = 0;
  }
  if (moved === false) {
    square.classList.add("selected");
    selected = 1;
    ShowLegalMoves(square);
    previousId = square.id;
  } else {
    moved = false;
  }
}

// function MovePieces(square) {
//   allPieces.forEach((piece) => {
//     if (piece.classList.contains("selected")) {
//       CopyClasses(piece, square);
//       if (piece.id !== square.id) piece.classList = [];
//       moved = true;
//     }
//   });
//   selectPieces(squares, square);
//   Update();
// }
function IsMoveLegal(to) {
  if (to.classList.contains("legal")) return true;
  else return false;
}

function MovePieces(square) {
  let isMoveLegal = IsMoveLegal(square);
  let previous = (previousId !== 0)? document.getElementById(previousId) : undefined;
  if (isMoveLegal) {
    CopyClasses(previous, square);
    previous.classList = [];
    moved = true;
  } else {
    selected = 0;
    (previousId !== 0)? previous.classList.remove("selected") : undefined;
  }
  square.classList.remove("selected");
  selectPieces(squares, square);
  Update();
}


function CopyClasses(from, to) {
  to.classList = [];
  for (let i = 0; i < from.classList.length; i++) {
    to.classList.add(from.classList[i]);
  }
}

function HideLegalMoves(square) {
  square.classList.remove("legal");
}

function ShowLegalMoves(piece) {
  if (piece.classList.contains("wpawn")) PawnMoves(piece, "white", "Show");
  if (piece.classList.contains("bpawn")) PawnMoves(piece, "black", "Show");
  if (piece.classList.contains("wrook")) PawnMoves(piece, "white", "Show");
  if (piece.classList.contains("brook")) PawnMoves(piece, "black", "Show");
  if (piece.classList.contains("wbishop")) PawnMoves(piece, "white", "Show");
  if (piece.classList.contains("bbishop")) PawnMoves(piece, "black", "Show");
  if (piece.classList.contains("wknight")) PawnMoves(piece, "white", "Show");
  if (piece.classList.contains("bknight")) PawnMoves(piece, "black", "Show");
  if (piece.classList.contains("wqueen")) PawnMoves(piece, "white", "Show");
  if (piece.classList.contains("bqueen")) PawnMoves(piece, "black", "Show");
  if (piece.classList.contains("wking")) PawnMoves(piece, "white", "Show");
  if (piece.classList.contains("bking")) PawnMoves(piece, "black", "Show");
}

// function HideLegalMoves(piece) {
//   if(piece.classList.contains('wpawn')) PawnMoves(piece,"white",'Hide');
//   if(piece.classList.contains('bpawn')) PawnMoves(piece,"black",'Hide');
// }

function PawnMoves(input, color, showHide) {
  let legalCoords = LegalPawnMoves(input, color);
  legalCoords = CheckForOwnPieces(legalCoords, color);
  for (let i = 0; i < legalCoords.length; i++) {
    if (showHide == "Show") {
      document.getElementById(legalCoords[i]).classList.add("legal");
    }
    if (showHide == "Hide")
      document.getElementById(legalCoords[i]).classList.remove("legal");
  }
}
function CheckForOwnPieces(legalArray, color){
  let checkedArray = []
  for (let i = 0; i < legalArray.length; i++) {
    const squareToCheck= document.getElementById(legalArray[i]);
    let vacantSpot = true;
    if(color === 'white'){
      for (let j = 0; j < whitePiecesArray.length; j++) {
        if (squareToCheck.classList.contains(whitePiecesArray[j])) {
          vacantSpot = false;
          break;
        }
      }
    }
    if(color === 'black'){
      for (let j = 0; j < blackPiecesArray.length; j++) {
        if (squareToCheck.classList.contains(blackPiecesArray[j])) {
          vacantSpot = false;
          break;
        }
      }
    }
    if (vacantSpot) checkedArray.push(legalArray[i]);
  }
  return checkedArray;
}
function LegalPawnMoves(piece, color) {
  let placement = piece.id;
  let legalChar = placement.charAt(0);
  let legalNum = parseInt(placement.slice(1), 10);
  if (color === "white") {
    switch (legalNum) {
      case 2:
        let legal1 = legalChar + (legalNum + 1);
        let legal2 = legalChar + (legalNum + 2);
        return [legal1, legal2];
      case 8:
        return [legalChar + legalNum];
      default:
        return [legalChar + (legalNum + 1)];
    }
  }
  if (color === "black") {
    switch (legalNum) {
      case 7:
        let legal1 = legalChar + (legalNum - 1);
        let legal2 = legalChar + (legalNum - 2);
        return [legal1, legal2];
      case 1:
        return [legalChar + legalNum];
      default:
        return [legalChar + (legalNum - 1)];
    }
  }
}

function LegalRookMoves(piece, color) {
  let placement = piece.id;
  let legalChar = placement.charAt(0);
  let legalNum = parseInt(placement.slice(1), 10);
  const legalMoves = [];
  const filteredLetters = letters.filter((letter) => letter !== legalChar);
  const filteredNumbers = numbers.filter((number) => number !== legalNum);
  for (let i = 0; i < filteredLetters.length; i++) {
    legalMoves[i] = filteredLetters[i] + legalNum;
  }
  for (let i = 0; i < filteredNumbers.length; i++) {
    legalMoves[i + filteredLetters.length] = legalChar + filteredNumbers[i];
  }
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
