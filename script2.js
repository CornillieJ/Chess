"use strict";

///////////////////////////////////
///////////variables///////////////
///////-----------------///////////
let initialTdClasses = [];
const table = document.querySelector("table");
const tableCells = document.querySelectorAll("td");
tableCells.forEach((cell) => {
  initialTdClasses.push({ element: cell, class: cell.className });
});
let allPieces = document.querySelectorAll(
  ".bpawn, .brook, .bbishop, .bknight, .bqueen, .bking, .wpawn, .wrook, .wbishop, .wknight, .wqueen, .wking"
);
let whitePieces = document.querySelectorAll(
  ".wpawn, .wrook, .wbishop, .wknight, .wqueen, .wking"
);

let blackPieces = document.querySelectorAll(
  ".bpawn, .brook, .bbishop, .bknight, .bqueen, .bking"
);
let squares = document.querySelectorAll("td");
const centerText = document.querySelector(".center-text");
const whiteText = document.querySelector(".white-text");
const blackText = document.querySelector(".black-text");
const turnText = document.getElementById("turn-text");
const firstKingSide = ["f1", "g1"];
const firstQueenSide = ["b1", "c1", "d1"];
const lastKingSide = ["f8", "g8"];
const lastQueenSide = ["b8", "c8", "d8"];
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
const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
let lastSquare = document.querySelector(".wking");
let isWhiteTurn = true;
let moved = false;
let captures = [];
let lastcolor = "white";
let movedPawnSquare;
///////-----------------///////////
///////////variables///////////////
///////////////////////////////////

///////////////////////////////////
///////////functions///////////////
///////-----------------///////////
function GetClickedPieceName(squareparam) {
  let found = 0;
  piecesArray.forEach((piece) => {
    if (squareparam.classList.contains(piece)) found = piece;
  });
  return found;
}
function GetClickedPieceColor(clickedPieceName) {
  if (clickedPieceName)
    return clickedPieceName.charAt(0) == "w" ? "white" : "black";
  else return 0;
}
//////
function ResetSelected() {
  lastSquare.classList.remove("selected");
}
////
function ShowSelected(squareparam, clickedPiece) {
  if (clickedPiece) {
    squareparam.classList.add("selected");
    lastSquare = squareparam;
  }
}
//////
function ResetLegalAndPromotion() {
  squares.forEach((square) => {
    square.classList.remove("legal");
    square.classList.remove("promotion");
  });
}
/////
function ShowLegal(legalMovesArray) {
  legalMovesArray.forEach((legalID) => {
    document.getElementById(legalID).classList.add("legal");
  });
}
////

function ResetCaptures() {
  captures.forEach((id) => {
    document.getElementById(id).classList.remove("capture");
  });
  captures = [];
}
/////
function ShowCaptures() {
  captures.forEach((id) => {
    document.getElementById(id).classList.add("capture");
  });
}
/////
function ShowWPromotion(wPawnMovesArray) {
  wPawnMovesArray.forEach((move) => {
    if (parseInt(move.slice(1), 10) == 8) {
      document.getElementById(move).classList.add("promotion");
    }
  });
}
function ShowBPromotion(bPawnMovesArray) {
  bPawnMovesArray.forEach((move) => {
    if (parseInt(move.slice(1), 10) == 1)
      document.getElementById(move).classList.add("promotion");
  });
}
////
function PromotePawn(squareparam) {
  let color = "white";
  if (parseInt(squareparam.id.slice(1), 10) == 1) color = "black";
  if (color == "white") {
    squareparam.classList.remove("wpawn");
    squareparam.classList.add("wqueen");
  } else {
    squareparam.classList.remove("bpawn");
    squareparam.classList.add("bqueen");
  }
}
///////
//////
/////

////
function GetMovesArray(square, clickedPieceName) {
  let movesArray = [];
  let char = square.id.charAt(0);
  let num = parseInt(square.id.slice(1), 10);
  let index = letters.indexOf(char);
  switch (clickedPieceName) {
    case "wpawn":
      movesArray = GetWPawnMoves(square, char, num, index);
      break;
    case "bpawn":
      movesArray = GetBPawnMoves(square, char, num, index);
      break;
    case "wrook":
      movesArray = GetWRookMoves(char, num, index);
      break;
    case "brook":
      movesArray = GetBRookMoves(char, num, index);
      break;
    case "wknight":
      movesArray = GetWKnightMoves(char, num, index);
      break;
    case "bknight":
      movesArray = GetBKnightMoves(char, num, index);
      break;
    case "wbishop":
      movesArray = GetWBishopMoves(char, num, index);
      break;
    case "bbishop":
      movesArray = GetBBishopMoves(char, num, index);
      break;
    case "wqueen":
      movesArray = GetWQueenMoves(char, num, index);
      break;
    case "bqueen":
      movesArray = GetBQueenMoves(char, num, index);
      break;
    case "wking":
      movesArray = GetWKingMoves(char, num, index);
      break;
    case "bking":
      movesArray = GetBKingMoves(char, num, index);
      break;
  }
  return movesArray;
}
//////////////////////////////////////////////////////////////////////////////////////////
function filterMovesForAllPieces(array) {
  let filteredArray = array;
  array.forEach((id) => {
    const currentsquare = document.getElementById(id);
    if (
      currentsquare.classList.contains("white") ||
      currentsquare.classList.contains("black")
    )
      filteredArray = array.filter((move) => move !== id);
  });
  return filteredArray;
}
function filterMovesForWhitePieces(array) {
  let filteredArray = array;
  array.forEach((id) => {
    const currentsquare = document.getElementById(id);
    whitePiecesArray.forEach((piece) => {
      if (currentsquare.classList.contains(piece))
        filteredArray = array.filter((move) => move !== id);
    });
  });
  return filteredArray;
}
///
function FindfirstWhitePiece(array) {
  array.forEach((id) => {
    const currentsquare = document.getElementById(id);
    if (currentsquare.classList.contains("white")) return id;
  });
}
////
function filterMovesForBlackPieces(array) {
  let filteredArray = array;
  array.forEach((id) => {
    const currentsquare = document.getElementById(id);
    blackPiecesArray.forEach((piece) => {
      if (currentsquare.classList.contains(piece))
        filteredArray = array.filter((move) => move !== id);
    });
  });
  return filteredArray;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function GetBaseBishopMoves(legalChar, legalNum, index, color) {
  const enemyColor = color == "white" ? "black" : "white";
  let legalMoves = [];
  let tempArray1 = [];
  let tempArray2 = [];
  for (let i = index + 1, j = 1; i < letters.length; i++, j++) {
    if (legalNum + j <= 8) {
      const id = letters[i] + (legalNum + j);
      const element = document.getElementById(id);
      if (element.classList.contains(color)) break;
      if (element.classList.contains(enemyColor)) {
        tempArray1.push(id); //topright
        captures.push(id);
        break;
      }
      tempArray1.push(id); //topright
    }
  }
  for (let i = index + 1, j = 1; i < letters.length; i++, j++) {
    if (legalNum - j > 0) {
      const id = letters[i] + (legalNum - j);
      const element = document.getElementById(id);
      if (element.classList.contains(color)) break;
      if (element.classList.contains(enemyColor)) {
        tempArray2.push(id); //bottomright
        captures.push(id);
        break;
      }
      tempArray2.push(id); //bottomright
    }
  }
  legalMoves = legalMoves.concat(tempArray1, tempArray2);
  tempArray1 = [];
  tempArray2 = [];
  for (let i = index - 1, j = 1; i >= 0; i--, j++) {
    if (legalNum + j <= 8) {
      const id = letters[i] + (legalNum + j);
      const element = document.getElementById(id);
      if (element.classList.contains(color)) break;
      if (element.classList.contains(enemyColor)) {
        tempArray1.push(id); //topLeft
        captures.push(id);
        break;
      }
      tempArray1.push(id); //topleft
    }
  }
  for (let i = index - 1, j = 1; i >= 0; i--, j++) {
    if (legalNum - j > 0) {
      const id = letters[i] + (legalNum - j);
      const element = document.getElementById(id);
      if (element.classList.contains(color)) break;
      if (element.classList.contains(enemyColor)) {
        tempArray2.push(id); //bottomLeft
        captures.push(id);
        break;
      }
      tempArray2.push(id); //bottomleft
    }
  }
  legalMoves = legalMoves.concat(tempArray1, tempArray2);
  return legalMoves;
}

//////////////////////////////////////////////////////////////////////////////////////////////////
function GetBaseRookMoves(char, num, color) {
  const legalMoves = [];
  const charIndex = letters.indexOf(char);
  const leftRookLetters = letters.slice(0, charIndex);
  const rightRookLetters = letters.slice(charIndex + 1);
  const enemyColor = color == "white" ? "black" : "white";
  for (let i = leftRookLetters.length - 1; i >= 0; i--) {
    if (
      document
        .getElementById(leftRookLetters[i] + num)
        .classList.contains(color)
    )
      break;
    if (
      document
        .getElementById(leftRookLetters[i] + num)
        .classList.contains(enemyColor)
    ) {
      captures.push(leftRookLetters[i] + num);
      legalMoves.push(leftRookLetters[i] + num);
      break;
    }
    legalMoves.push(leftRookLetters[i] + num);
  }
  for (let i = 0; i < rightRookLetters.length - 1; i++) {
    if (
      document
        .getElementById(rightRookLetters[i] + num)
        .classList.contains(color)
    )
      break;
    if (
      document
        .getElementById(rightRookLetters[i] + num)
        .classList.contains(enemyColor)
    ) {
      captures.push(rightRookLetters[i] + num);
      legalMoves.push(rightRookLetters[i] + num);
      break;
    }
    legalMoves.push(rightRookLetters[i] + num);
  }
  for (let i = num - 1; i > 0; i--) {
    if (document.getElementById(char + i).classList.contains(color)) break;
    if (document.getElementById(char + i).classList.contains(enemyColor)) {
      captures.push(char + i);
      legalMoves.push(char + i);
      break;
    }
    legalMoves.push(char + i);
  }
  for (let i = num + 1; i <= 8; i++) {
    if (document.getElementById(char + i).classList.contains(color)) break;
    if (document.getElementById(char + i).classList.contains(enemyColor)) {
      captures.push(char + i);
      legalMoves.push(char + i);
      break;
    }
    legalMoves.push(char + i);
  }
  return legalMoves;
}
////////////////////////////////////////////////////////////////////////////////////////
function getBaseKnightMoves(char, num, index, color) {
  let legalMoves = [];
  if (index + 2 < 8 && num + 1 <= 8)
    legalMoves.push(letters[index + 2] + (num + 1));
  if (index - 2 >= 0 && num + 1 <= 8)
    legalMoves.push(letters[index - 2] + (num + 1));
  if (index + 2 < 8 && num - 1 > 0)
    legalMoves.push(letters[index + 2] + (num - 1));
  if (index - 2 >= 0 && num - 1 > 0)
    legalMoves.push(letters[index - 2] + (num - 1));
  if (index + 1 < 8 && num + 2 <= 8)
    legalMoves.push(letters[index + 1] + (num + 2));
  if (index - 1 >= 0 && num + 2 <= 8)
    legalMoves.push(letters[index - 1] + (num + 2));
  if (index + 1 < 8 && num - 2 > 0)
    legalMoves.push(letters[index + 1] + (num - 2));
  if (index - 1 >= 0 && num - 2 > 0)
    legalMoves.push(letters[index - 1] + (num - 2));
  return filterLegalMoves(legalMoves, color);
}
/////////////////////////////////////////////////////////

function GetBaseKingMoves(char, num, index, color) {
  let legalMoves = [];
  if (index + 1 < 8) legalMoves.push(letters[index + 1] + num);
  if (index - 1 > 0) legalMoves.push(letters[index - 1] + num);
  if (num + 1 <= 8) legalMoves.push(char + (num + 1));
  if (num - 1 > 0) legalMoves.push(char + (num - 1));
  if (index + 1 < 8 && num + 1 <= 8)
    legalMoves.push(letters[index + 1] + (num + 1));
  if (index + 1 < 8 && num - 1 > 0)
    legalMoves.push(letters[index + 1] + (num - 1));
  if (index - 1 > 0 && num + 1 <= 8)
    legalMoves.push(letters[index - 1] + (num + 1));
  if (index - 1 > 0 && num - 1 > 0)
    legalMoves.push(letters[index - 1] + (num - 1));
  return filterLegalMoves(legalMoves, color);
}

//////////////////////////////////////////////////////////////////////
function filterLegalMoves(legalMoves, color) {
  const enemyColor = color == "white" ? "black" : "white";
  legalMoves.forEach((move) => {
    const element = document.getElementById(move);
    if (element.classList.contains(color))
      legalMoves = legalMoves.filter((id) => id != move);
    if (element.classList.contains(enemyColor)) captures.push(move);
  });
  return legalMoves;
}

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
function GetWPawnMoves(squareparam, char, num, index) {
  let wPawnMoves = [];
  if (num == 2) {
    wPawnMoves.push(char + (num + 1));
    wPawnMoves.push(char + (num + 2));
  } else if (num != 0) {
    wPawnMoves.push(char + (num + 1));
  }
  wPawnMoves = filterMovesForAllPieces(wPawnMoves);
  let leftSideID, rightSideID;
  if (index > 0) {
    leftSideID = letters[index - 1] + (num + 1);
    if (
      document.getElementById(leftSideID).classList.contains("black") ||
      document
        .getElementById(leftSideID)
        .classList.contains("en-passant-invisible")
    ) {
      captures.push(leftSideID);
      wPawnMoves.push(leftSideID);
    }
  }
  if (index < 7) {
    rightSideID = letters[index + 1] + (num + 1);
    if (
      document.getElementById(rightSideID).classList.contains("black") ||
      document
        .getElementById(rightSideID)
        .classList.contains("en-passant-invisible")
    ) {
      captures.push(rightSideID);
      wPawnMoves.push(rightSideID);
    }
  }
  return wPawnMoves;
}
//////////---------------------------------------------------------------------
function GetBPawnMoves(square, char, num, index) {
  let bPawnMoves = [];
  if (num == 7) {
    bPawnMoves.push(char + (num - 1));
    bPawnMoves.push(char + (num - 2));
  } else if (num != 0) {
    bPawnMoves.push(char + (num - 1));
  }
  bPawnMoves = bPawnMoves.filter(
    (move) => !piecesArray.some((piece) => move.includes(piece))
  );
  bPawnMoves = filterMovesForAllPieces(bPawnMoves);
  let leftSideID, rightSideID;
  if (index > 0) {
    leftSideID = letters[index - 1] + (num - 1);
    if (
      document.getElementById(leftSideID).classList.contains("white") ||
      document
        .getElementById(leftSideID)
        .classList.contains("en-passant-invisible")
    ) {
      captures.push(leftSideID);
      bPawnMoves.push(leftSideID);
    }
  }
  if (index < 7) {
    rightSideID = letters[index + 1] + (num - 1);
    if (
      document.getElementById(rightSideID).classList.contains("white") ||
      document
        .getElementById(rightSideID)
        .classList.contains("en-passant-invisible")
    ) {
      captures.push(rightSideID);
      bPawnMoves.push(rightSideID);
    }
  }
  return bPawnMoves;
}
function GetWRookMoves(char, num, index) {
  let wRookMoves = GetBaseRookMoves(char, num, "white");
  return wRookMoves;
}
//////////---------------------------------------------------------------------
function GetBRookMoves(char, num, index) {
  let bRookMoves = GetBaseRookMoves(char, num, "black");
  return bRookMoves;
}
//////////---------------------------------------------------------------------
function GetWKnightMoves(char, num, index) {
  let wKnightMoves = getBaseKnightMoves(char, num, index, "white");
  return wKnightMoves;
}
//////////---------------------------------------------------------------------
function GetBKnightMoves(char, num, index) {
  let bKnightMoves = getBaseKnightMoves(char, num, index, "black");
  return bKnightMoves;
}
//////////---------------------------------------------------------------------
function GetWBishopMoves(char, num, index) {
  let wBishopMoves = GetBaseBishopMoves(char, num, index, "white");
  return wBishopMoves;
}
//////////---------------------------------------------------------------------
function GetBBishopMoves(char, num, index) {
  let bBishopMoves = GetBaseBishopMoves(char, num, index, "black");
  return bBishopMoves;
}
//////////---------------------------------------------------------------------
function GetWQueenMoves(char, num, index) {
  let wQueenMoves = GetBaseBishopMoves(char, num, index, "white");
  wQueenMoves = wQueenMoves.concat(GetBaseRookMoves(char, num, "white"));
  return wQueenMoves;
}
//////////---------------------------------------------------------------------
function GetBQueenMoves(char, num, index) {
  let bQueenMoves = GetBaseBishopMoves(char, num, index, "black");
  bQueenMoves = bQueenMoves.concat(GetBaseRookMoves(char, num, "black"));
  return bQueenMoves;
}
//////////---------------------------------------------------------------------
function GetWKingMoves(char, num, index) {
  let wKingMoves = GetBaseKingMoves(char, num, index, "white");
  return wKingMoves;
}
//////////---------------------------------------------------------------------
function GetBKingMoves(char, num, index) {
  let bKingMoves = GetBaseKingMoves(char, num, index, "black");
  return bKingMoves;
}
/////////----------------------------------------------------------------------
function ResetEnPassantHelper() {
  let num = !isWhiteTurn ? 3:6;
  for (let i = 0; i < 8; i++) {
    const element = document.getElementById(letters[i] + num)
    element.classList.remove("en-passant-invisible");
  }
}
/////////----------------------------------------------------------------------
function ShowEnPassantHelper(lastSquare, squareparam) {
  let char = lastSquare.id.charAt(0);
  if (
    lastSquare.classList.contains("wpawn") &&
    lastSquare.id.charAt(1) == "2" &&
    squareparam.id.charAt(1) == "4"
  ) {
    document.getElementById(char + 3).classList.add("en-passant-invisible");
    movedPawnSquare = squareparam;
  }
  if (
    lastSquare.classList.contains("bpawn") &&
    lastSquare.id.charAt(1) == "7" &&
    squareparam.id.charAt(1) == "5"
  ) {
    document.getElementById(char + 6).classList.add("en-passant-invisible");
    movedPawnSquare = squareparam;
  }
}
//////////---------------------------------------------------------------------

function MovePieces(lastSquare, squareparam) {
  ShowEnPassantHelper(lastSquare, squareparam);
  if (squareparam.classList.contains("en-passant-invisible")) {
    movedPawnSquare.classList = [];
  }
  squareparam.classList = lastSquare.classList;
  lastSquare.classList = [];
  ResetEnPassantHelper();
}
///////-----------------///////////
///////////functions///////////////
///////////////////////////////////

squares.forEach((square) => {
  square.addEventListener("click", () => {
    let clickedPieceName = GetClickedPieceName(square);
    let clickedPieceColor = GetClickedPieceColor(clickedPieceName);
    ResetSelected();
    if (
      (isWhiteTurn && clickedPieceColor == "white") ||
      (!isWhiteTurn && clickedPieceColor == "black")
    ) {
      ResetSelected();
      ResetLegalAndPromotion();
      ResetCaptures();
      ShowSelected(square, clickedPieceName);
      const legalMoves = GetMovesArray(square, clickedPieceName);
      ShowLegal(legalMoves);
      ShowCaptures();
      if (clickedPieceName == "wpawn") ShowWPromotion(legalMoves);
      if (clickedPieceName == "bpawn") ShowBPromotion(legalMoves);
      moved = false;
    }
    if (
      square.classList.contains("legal") ||
      square.classList.contains("capture")
    ) {
      if (square.classList.contains("promotion")) {
        MovePieces(lastSquare, square);
        PromotePawn(square);
      } else {
        MovePieces(lastSquare, square);
      }
      moved = true;
      isWhiteTurn = !isWhiteTurn;
      ResetLegalAndPromotion();
    }
    if (moved || clickedPieceName == 0) {
      ResetLegalAndPromotion();
      ResetCaptures();
      ResetSelected();
    }
    lastcolor = clickedPieceColor;
  });
});

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
