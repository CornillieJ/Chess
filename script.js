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
  "bking",
];
const whitePiecesArray = [
  "wpawn",
  "wrook",
  "wbishop",
  "wknight",
  "wqueen",
  "wking",
];
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
  let previous =
    previousId !== 0 ? document.getElementById(previousId) : undefined;
  if (isMoveLegal) {
    CopyClasses(previous, square);
    previous.classList = [];
    moved = true;
  } else {
    selected = 0;
    previousId !== 0 ? previous.classList.remove("selected") : undefined;
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
  if (piece.classList.contains("wpawn")) Moves("pawn", piece, "white", "Show");
  if (piece.classList.contains("bpawn")) Moves("pawn", piece, "black", "Show");
  if (piece.classList.contains("wrook")) Moves("rook", piece, "white", "Show");
  if (piece.classList.contains("brook")) Moves("rook", piece, "black", "Show");
  if (piece.classList.contains("wbishop"))
    Moves("bishop", piece, "white", "Show");
  if (piece.classList.contains("bbishop"))
    Moves("bishop", piece, "black", "Show");
  if (piece.classList.contains("wknight"))
    Moves("knight", piece, "white", "Show");
  if (piece.classList.contains("bknight"))
    Moves("knight", piece, "black", "Show");
  if (piece.classList.contains("wqueen"))
    Moves("queen", piece, "white", "Show");
  if (piece.classList.contains("bqueen"))
    Moves("queen", piece, "black", "Show");
  if (piece.classList.contains("wking")) Moves("king", piece, "white", "Show");
  if (piece.classList.contains("bking")) Moves("king", piece, "black", "Show");
}

// function HideLegalMoves(piece) {
//   if(piece.classList.contains('wpawn')) PawnMoves(piece,"white",'Hide');
//   if(piece.classList.contains('bpawn')) PawnMoves(piece,"black",'Hide');
// }

function Moves(pieceName, input, color, showHide) {
  let legalCoords = GetLegalMoves(input, color, pieceName);
  // let legalCoords = LegalPawnMoves(input, color);
  legalCoords = CheckForOwnPieces(legalCoords, color);
  for (let i = 0; i < legalCoords.length; i++) {
    if (showHide == "Show") {
      document.getElementById(legalCoords[i]).classList.add("legal");
    }
    if (showHide == "Hide")
      document.getElementById(legalCoords[i]).classList.remove("legal");
  }
}

function GetLegalMoves(input, color, pieceName) {
  switch (pieceName) {
    case "pawn":
      return LegalPawnMoves(input, color);
    case "rook":
      return LegalRookMoves(input, color);
    case "bishop":
      return LegalBishopMoves(input, color);
    case "knight":
      return LegalKnightMoves(input, color);
    case "queen":
      return LegalQueenMoves(input, color);
    case "king":
      return LegalKingMoves(input, color);
    default:
      break;
  }
}

function LegalPawnMoves(piece, color) {
  let placement = piece.id;
  let legalChar = placement.charAt(0);
  let legalNum = parseInt(placement.slice(1), 10);
  let index = letters.indexOf(legalChar);
  const legalMoves = [];
  if (color === "white") {
    let leftFrontId = 0;
    let rightFrontId = 0;
    let leftFront;
    let rightFront;
    if (legalNum + 1 <= 8) {
      if (index - 1 > 0) leftFrontId = letters[index - 1] + (legalNum + 1);
      if (index + 1 < 8) rightFrontId = letters[index + 1] + (legalNum + 1);
      if (leftFrontId != 0) {
        leftFront = document.getElementById(leftFrontId);
        for (let i = 0; i < blackPiecesArray.length; i++) {
          if (leftFront.classList.contains(blackPiecesArray[i]))
            legalMoves.push(leftFrontId);
        }
      }
      if (rightFrontId != 0) {
        rightFront = document.getElementById(rightFrontId);
        for (let i = 0; i < blackPiecesArray.length; i++) {
          if (rightFront.classList.contains(blackPiecesArray[i]))
            legalMoves.push(rightFrontId);
        }
      }
    }
      if (legalNum === 2) {
        let legal1 = legalChar + (legalNum + 1);
        let legal2 = legalChar + (legalNum + 2);
        legalMoves.push(legal1, legal2);
      } else if (legalNum === 8) legalMoves.push(legalChar + legalNum);
      else legalMoves.push(legalChar + (legalNum + 1));
  }
  if (color === "black") {
    let leftFrontId = 0;
    let rightFrontId = 0;
    let leftFront;
    let rightFront;
    if (legalNum - 1 > 0) {
      if (index - 1 > 0) leftFrontId = letters[index - 1] + (legalNum - 1);
      if (index + 1 < 8) rightFrontId = letters[index + 1] + (legalNum - 1);
      if (leftFrontId != 0) {
        leftFront = document.getElementById(leftFrontId);
        for (let i = 0; i < whitePiecesArray.length; i++) {
          if (leftFront.classList.contains(whitePiecesArray[i]))
            legalMoves.push(leftFrontId);
        }
      }
      if (rightFrontId != 0) {
        rightFront = document.getElementById(rightFrontId);
        for (let i = 0; i < whitePiecesArray.length; i++) {
          if (rightFront.classList.contains(whitePiecesArray[i]))
            legalMoves.push(rightFrontId);
        }
      }
    }
      if (legalNum === 7) {
        let legal1 = legalChar + (legalNum - 1);
        let legal2 = legalChar + (legalNum - 2);
        legalMoves.push(legal1, legal2);
      } else if (legalNum === 1) legalMoves.push(legalChar + legalNum);
      else legalMoves.push(legalChar + (legalNum - 1));
  }
  return StopMovement("pawn", legalChar, legalNum, index, legalMoves);
}
function LegalRookMoves(piece, color) {
  let placement = piece.id;
  let legalChar = placement.charAt(0);
  let legalNum = parseInt(placement.slice(1), 10);
  const legalMoves = [];
  const filteredLetters = letters.filter((letter) => letter !== legalChar);
  const filteredNumbers = numbers.filter((number) => number !== legalNum);
  for (let i = 0; i < filteredLetters.length; i++) {
    legalMoves.push(filteredLetters[i] + legalNum);
  }
  for (let i = 0; i < filteredNumbers.length; i++) {
    legalMoves.push(legalChar + filteredNumbers[i]);
  }
  return legalMoves;
}

function LegalBishopMoves(piece, color) {
  const placement = piece.id;
  let legalChar = placement.charAt(0);
  let legalNum = parseInt(placement.slice(1), 10);
  let index = letters.indexOf(legalChar);
  const legalMoves = [];
  for (let i = index + 1, j = 1; i < letters.length; i++, j++) {
    if (legalNum - j > 0) legalMoves.push(letters[i] + (legalNum - j));
    if (legalNum + j <= 8) legalMoves.push(letters[i] + (legalNum + j));
  }
  for (let i = index - 1, j = 1; i >= 0; i--, j++) {
    if (legalNum - j > 0) legalMoves.push(letters[i] + (legalNum - j));
    if (legalNum + j <= 8) legalMoves.push(letters[i] + (legalNum + j));
  }
  return legalMoves;
}

function LegalQueenMoves(piece, color) {
  const legalMoves = [
    ...LegalRookMoves(piece, color),
    ...LegalBishopMoves(piece, color),
  ];
  return legalMoves;
}

function LegalKingMoves(piece, color) {
  const legalMoves = [];
  const placement = piece.id;
  const legalChar = placement.charAt(0);
  const legalNum = parseInt(placement.slice(1), 10);
  const index = letters.indexOf(legalChar);

  if (index + 1 < 8) legalMoves.push(letters[index + 1] + legalNum);
  if (index - 1 > 0) legalMoves.push(letters[index - 1] + legalNum);
  if (legalNum + 1 <= 8) legalMoves.push(legalChar + (legalNum + 1));
  if (legalNum - 1 > 0) legalMoves.push(legalChar + (legalNum - 1));
  if (index + 1 < 8 && legalNum + 1 <= 8)
    legalMoves.push(letters[index + 1] + (legalNum + 1));
  if (index + 1 < 8 && legalNum - 1 > 0)
    legalMoves.push(letters[index + 1] + (legalNum - 1));
  if (index - 1 > 0 && legalNum + 1 <= 8)
    legalMoves.push(letters[index - 1] + (legalNum + 1));
  if (index - 1 > 0 && legalNum - 1 > 0)
    legalMoves.push(letters[index - 1] + (legalNum - 1));
  return legalMoves;
}

function LegalKnightMoves(piece, color) {
  const legalMoves = [];
  const placement = piece.id;
  const legalChar = placement.charAt(0);
  const legalNum = parseInt(placement.slice(1), 10);
  const index = letters.indexOf(legalChar);
  if (index + 2 < 8 && legalNum + 1 <= 8)
    legalMoves.push(letters[index + 2] + (legalNum + 1));
  if (index - 2 >= 0 && legalNum + 1 <= 8)
    legalMoves.push(letters[index - 2] + (legalNum + 1));
  if (index + 2 < 8 && legalNum - 1 > 0)
    legalMoves.push(letters[index + 2] + (legalNum - 1));
  if (index - 2 >= 0 && legalNum - 1 > 0)
    legalMoves.push(letters[index - 2] + (legalNum - 1));
  if (index + 1 < 8 && legalNum + 2 <= 8)
    legalMoves.push(letters[index + 1] + (legalNum + 2));
  if (index - 1 >= 0 && legalNum + 2 <= 8)
    legalMoves.push(letters[index - 1] + (legalNum + 2));
  if (index + 1 < 8 && legalNum - 2 > 0)
    legalMoves.push(letters[index + 1] + (legalNum - 2));
  if (index - 1 >= 0 && legalNum - 2 > 0)
    legalMoves.push(letters[index - 1] + (legalNum - 2));
  return legalMoves;
}

function StopMovement(pieceName, pieceChar, pieceNum, index, legalMoves) {
  switch (pieceName) {
    case "pawn":
      const frontNum = pieceNum === 8 ? 8 : pieceNum + 1;
      const front = document.getElementById(pieceChar + frontNum);
      for (let i = 0; i < piecesArray.length; i++) {
        if (front.classList.contains(piecesArray[i])){
          let result = legalMoves.filter(coord => coord !== front.id);
          return result.filter(coord => coord !== (pieceChar+(frontNum+1)));
        }
      }
      return legalMoves;
      break;
    case "rook":
      break;
    case "bishop":
      break;
    case "knight":
      break;
    case "queen":
      break;
    case "king":
      break;
    default:
      break;
  }
}

function CheckForOwnPieces(legalArray, color) {
  let checkedArray = [];
  for (let i = 0; i < legalArray.length; i++) {
    const squareToCheck = document.getElementById(legalArray[i]);
    let vacantSpot = true;
    console.log(legalArray);
    if (color === "white") {
      for (let j = 0; j < whitePiecesArray.length; j++) {
        if (squareToCheck.classList.contains(whitePiecesArray[j])) {
          vacantSpot = false;
          break;
        }
      }
    }
    if (color === "black") {
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
