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
let squares = document.querySelectorAll("td");
const centerText = document.querySelector(".center-text");
const whiteText = document.querySelector(".white-text");
const blackText = document.querySelector(".black-text");
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
let capture = [];
let isWhiteTurn = true;
let check = false;
let checked = false;
let whiteWinCheck = 0;
let blackWinCheck = 0;
let switched = false;
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
function showToMoveText(isWhiteTurn) {
  if (isWhiteTurn) {
    whiteText.classList.remove("invisible");
    blackText.classList.add("invisible");
  } else {
    blackText.classList.remove("invisible");
    whiteText.classList.add("invisible");
  }
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
  }
  if (moved === false) {
    if (isWhiteTurn) {
      if (square.classList.contains("white")) {
        square.classList.add("selected");
        ShowLegalMoves(square);
        previousId = square.id;
      }
    } else {
      if (square.classList.contains("black")) {
        square.classList.add("selected");
        ShowLegalMoves(square);
        previousId = square.id;
      }
    }
  } else {
    moved = false;
  }
}

function IsMoveLegal(to) {
  if (to.classList.contains("legal")) return true;
  else return false;
}

function MovePieces(square) {
  HideCaptureMoves();
  let isMoveLegal = IsMoveLegal(square);
  let previous =
    previousId !== 0 ? document.getElementById(previousId) : undefined;
  if (isMoveLegal) {
    isWhiteTurn = !isWhiteTurn;
    CopyClasses(previous, square);
    previous.classList = [];
    moved = true;
    showToMoveText(isWhiteTurn);
    checkWin();
  if(isPlayer2) SwitchBoard();
  } else {
    previousId !== 0 ? previous.classList.remove("selected") : undefined;
  }
  square.classList.remove("selected");
  capture = [];
  selectPieces(squares, square);
  ShowCaptureMoves();
  Update();
}
function checkWin() {
  whiteWinCheck = true;
  blackWinCheck = true;
  squares.forEach((square) => {
    if (square.classList.contains("bking")) whiteWinCheck = false;
    if (square.classList.contains("wking")) blackWinCheck = false;
  });
  if (whiteWinCheck) {
    centerText.textContent = "White Wins";
    win.classList.remove("invisible");
    overlay.classList.remove("invisible");
  }
  if (blackWinCheck) {
    centerText.textContent = "Black Wins";
    win.classList.remove("invisible");
    overlay.classList.remove("invisible");
  }
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
  if (piece.classList.contains("wpawn")) Moves("wpawn", piece, "Show");
  if (piece.classList.contains("bpawn")) Moves("bpawn", piece, "Show");
  if (piece.classList.contains("wrook")) Moves("wrook", piece, "Show");
  if (piece.classList.contains("brook")) Moves("brook", piece, "Show");
  if (piece.classList.contains("wbishop")) Moves("wbishop", piece, "Show");
  if (piece.classList.contains("bbishop")) Moves("bbishop", piece, "Show");
  if (piece.classList.contains("wknight")) Moves("wknight", piece, "Show");
  if (piece.classList.contains("bknight")) Moves("bknight", piece, "Show");
  if (piece.classList.contains("wqueen")) Moves("wqueen", piece, "Show");
  if (piece.classList.contains("bqueen")) Moves("bqueen", piece, "Show");
  if (piece.classList.contains("wking")) Moves("wking", piece, "Show");
  if (piece.classList.contains("bking")) Moves("bking", piece, "Show");
}
function ShowCaptureMoves() {
  if (capture.length > 0) {
    for (let i = 0; i < capture.length; i++) {
      document.getElementById(capture[i]).classList.add("capture");
    }
  }
}
function HideCaptureMoves() {
  if (capture.length > 0) {
    for (let i = 0; i < capture.length; i++) {
      document.getElementById(capture[i]).classList.remove("capture");
    }
  }
}
function ShowCheck() {
  squares.forEach((square) => {
    check = false;
    if (square.classList.contains("wking")) {
      CheckCheck(square, "wpawn", "bpawn");
      CheckCheck(square, "wrook", "brook");
      CheckCheck(square, "wbishop", "bbishop");
      CheckCheck(square, "wknight", "bknight");
      CheckCheck(square, "wqueen", "bqueen");
    }
    if (square.classList.contains("bking")) {
      CheckCheck(square, "bpawn", "wpawn");
      CheckCheck(square, "brook", "wrook");
      CheckCheck(square, "bbishop", "wbishop");
      CheckCheck(square, "bknight", "wknight");
      CheckCheck(square, "bqueen", "wqueen");
    }
    if (!check) {
      square.classList.remove("check");
    }
  });
}

function CheckCheck(square, movetype, pieceToCheckFor) {
  const toCheckArray = GetLegalMoves(square, movetype);
  for (let i = 0; i < toCheckArray.length; i++) {
    const toCheck = document.getElementById(toCheckArray[i]);
    if (toCheck.classList.contains(pieceToCheckFor)) {
      check = 1;
      square.classList.add("check");
    }
  }
  if (!check) {
    square.classList.remove("check");
  }
}

function Moves(pieceName, input, showHide) {
  let legalCoords = GetLegalMoves(input, pieceName);
  // let legalCoords = LegalPawnMoves(input);
  // legalCoords = CheckForOwnPieces(legalCoords);
  for (let i = 0; i < legalCoords.length; i++) {
    if (showHide == "Show") {
      document.getElementById(legalCoords[i]).classList.add("legal");
    }
    if (showHide == "Hide")
      document.getElementById(legalCoords[i]).classList.remove("legal");
  }
}

function GetLegalMoves(input, pieceName) {
  switch (pieceName) {
    case "wpawn":
    case "bpawn":
      return LegalPawnMoves(input, pieceName);
    case "wrook":
    case "brook":
      return LegalRookMoves(input, pieceName);
    case "wbishop":
    case "bbishop":
      return LegalBishopMoves(input, pieceName);
    case "wknight":
    case "bknight":
      return LegalKnightMoves(input, pieceName);
    case "wqueen":
    case "bqueen":
      return LegalQueenMoves(input, pieceName);
    case "wking":
    case "bking":
      return LegalKingMoves(input, pieceName);
    default:
      break;
  }
}
// function IsCheck(arrayString, color) {
//   if (color === "white") {
//     if (arrayString === "wking") {
//       wCheck = true;
//     }
//   }
//   if (color === "black") {
//     if (arrayString === "bking") {
//       bCheck = true;
//     }
//   }
// }
function LegalPawnMoves(piece, pieceName) {
  let placement = piece.id;
  let legalChar = placement.charAt(0);
  let legalNum = parseInt(placement.slice(1), 10);
  let index = letters.indexOf(legalChar);
  const legalMoves = [];
  let color = pieceName.charAt(0) === "w" ? "white" : "black";
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
          if (leftFront.classList.contains(blackPiecesArray[i])) {
            legalMoves.push(leftFrontId);
            capture.push(leftFrontId);
          }
        }
      }
      if (rightFrontId != 0) {
        rightFront = document.getElementById(rightFrontId);
        for (let i = 0; i < blackPiecesArray.length; i++) {
          if (rightFront.classList.contains(blackPiecesArray[i])) {
            legalMoves.push(rightFrontId);
            capture.push(rightFrontId);
          }
        }
      }
    }
    if (legalNum === 2) {
      let legal1 = legalChar + (legalNum + 1);
      let legal2 = legalChar + (legalNum + 2);
      legalMoves.push(legal1, legal2);
    } else if (legalNum === 8) legalMoves.push(legalChar + legalNum);
    else legalMoves.push(legalChar + (legalNum + 1));
    return GetTrueMoves("wpawn", legalChar, legalNum, index, legalMoves);
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
          if (leftFront.classList.contains(whitePiecesArray[i])) {
            legalMoves.push(leftFrontId);
            capture.push(leftFrontId);
          }
        }
      }
      if (rightFrontId != 0) {
        rightFront = document.getElementById(rightFrontId);
        for (let i = 0; i < whitePiecesArray.length; i++) {
          if (rightFront.classList.contains(whitePiecesArray[i])) {
            legalMoves.push(rightFrontId);
            capture.push(rightFrontId);
          }
        }
      }
    }
    if (legalNum === 7) {
      let legal1 = legalChar + (legalNum - 1);
      let legal2 = legalChar + (legalNum - 2);
      legalMoves.push(legal1, legal2);
    } else if (legalNum === 1) legalMoves.push(legalChar + legalNum);
    else legalMoves.push(legalChar + (legalNum - 1));
    return GetTrueMoves(pieceName, legalChar, legalNum, index, legalMoves);
  }
}

function LegalRookMoves(piece, pieceName) {
  let placement = piece.id;
  let legalChar = placement.charAt(0);
  let legalNum = parseInt(placement.slice(1), 10);
  let index = letters.indexOf(legalChar);
  const legalMoves = [];
  const filteredLetters = letters.filter((letter) => letter !== legalChar);
  const filteredNumbers = numbers.filter((number) => number !== legalNum);
  for (let i = 0; i < filteredLetters.length; i++) {
    legalMoves.push(filteredLetters[i] + legalNum);
  }
  for (let i = 0; i < filteredNumbers.length; i++) {
    legalMoves.push(legalChar + filteredNumbers[i]);
  }

  return GetTrueMoves(pieceName, legalChar, legalNum, index, legalMoves);
}

function LegalBishopMoves(piece, pieceName) {
  const placement = piece.id;
  let legalChar = placement.charAt(0);
  let legalNum = parseInt(placement.slice(1), 10);
  let index = letters.indexOf(legalChar);
  const legalMoves = [];
  let tempArray1 = [];
  let tempArray2 = [];
  for (let i = index + 1, j = 1; i < letters.length; i++, j++) {
    if (legalNum + j <= 8) tempArray1.push(letters[i] + (legalNum + j)); //topright
    if (legalNum - j > 0) tempArray2.push(letters[i] + (legalNum - j)); //bottomright
  }
  legalMoves.push(tempArray1, tempArray2);
  tempArray1 = [];
  tempArray2 = [];
  for (let i = index - 1, j = 1; i >= 0; i--, j++) {
    if (legalNum + j <= 8) tempArray1.push(letters[i] + (legalNum + j)); //topleft
    if (legalNum - j > 0) tempArray2.push(letters[i] + (legalNum - j)); //bottomleft
  }
  legalMoves.push(tempArray1, tempArray2);
  return GetTrueMoves(pieceName, legalChar, legalNum, index, legalMoves);
}

function LegalQueenMoves(piece, pieceName) {
  let rookPartName;
  let bishopPartName;
  if (pieceName.charAt(0) === "w") {
    rookPartName = "wrook";
    bishopPartName = "wbishop";
  } else {
    rookPartName = "brook";
    bishopPartName = "bbishop";
  }
  const rookPart = LegalRookMoves(piece, rookPartName);
  const legalMoves = [
    ...LegalRookMoves(piece, rookPartName),
    ...LegalBishopMoves(piece, bishopPartName),
  ];
  return legalMoves;
}

function LegalKingMoves(piece, pieceName) {
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
  return GetTrueMoves(pieceName, legalChar, legalNum, index, legalMoves);
}

function LegalKnightMoves(piece, pieceName) {
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
  return GetTrueMoves(pieceName, legalChar, legalNum, index, legalMoves);
}

function GetTrueMoves(pieceName, pieceChar, pieceNum, index, legalMoves) {
  switch (pieceName) {
    case "wpawn":
      const frontNumWPawn = pieceNum === 8 ? 8 : pieceNum + 1;
      const frontWPawn = document.getElementById(pieceChar + frontNumWPawn);
      for (let i = 0; i < piecesArray.length; i++) {
        if (frontWPawn.classList.contains(piecesArray[i])) {
          let result = legalMoves.filter((coord) => coord !== frontWPawn.id);
          return result.filter(
            (coord) => coord !== pieceChar + (frontNumWPawn + 1)
          );
        }
      }
      return legalMoves;
      break;
    case "bpawn":
      const frontNumBPawn = pieceNum === 8 ? 8 : pieceNum - 1;
      const frontBPawn = document.getElementById(pieceChar + frontNumBPawn);
      for (let i = 0; i < piecesArray.length; i++) {
        if (frontBPawn.classList.contains(piecesArray[i])) {
          let result = legalMoves.filter((coord) => coord !== frontBPawn.id);
          return result.filter(
            (coord) => coord !== pieceChar + (frontNumBPawn - 1)
          );
        }
      }
      return legalMoves;
      break;
    case "wrook":
    case "brook":
      //
      //TODO: make this function
      //
      let rookResult = [];
      const horizontalRook = legalMoves.slice(0, 7);
      const leftRook = horizontalRook.slice(0, index);
      const rightRook = horizontalRook.slice(index);
      const vertical = legalMoves.slice(7);
      const frontRook = vertical.slice(pieceNum - 1);
      const backRook = vertical.slice(0, pieceNum - 1);
      let isWallLeft = false;
      let isFirst = true;
      for (let i = leftRook.length - 1; i >= 0; i--) {
        const leftRookelement = document.getElementById(leftRook[i]);
        for (let j = 0; j < piecesArray.length; j++) {
          if (leftRookelement.classList.contains(piecesArray[j])) {
            if (isFirst && piecesArray[j].charAt(0) !== pieceName.charAt(0)) {
              rookResult.push(leftRook[i]);
              capture.push(leftRook[i]);
            }
            isFirst = 0;
            isWallLeft = true;
          }
        }
        if (!isWallLeft) rookResult.push(leftRook[i]);
      }
      let isWallRight = false;
      isFirst = true;
      for (let i = 0; i < rightRook.length; i++) {
        const rightRookelement = document.getElementById(rightRook[i]);
        for (let j = 0; j < piecesArray.length; j++) {
          if (rightRookelement.classList.contains(piecesArray[j])) {
            if (isFirst && piecesArray[j].charAt(0) !== pieceName.charAt(0)) {
              rookResult.push(rightRook[i]);
              capture.push(rightRook[i]);
            }
            isFirst = 0;
            isWallRight = true;
          }
        }
        if (!isWallRight) rookResult.push(rightRook[i]);
      }
      let isWallFront = false;
      isFirst = true;
      for (let i = 0; i < frontRook.length; i++) {
        const FrontRookelement = document.getElementById(frontRook[i]);
        for (let j = 0; j < piecesArray.length; j++) {
          if (FrontRookelement.classList.contains(piecesArray[j])) {
            if (isFirst && piecesArray[j].charAt(0) !== pieceName.charAt(0)) {
              rookResult.push(frontRook[i]);
              capture.push(frontRook[i]);
            }
            isFirst = 0;
            isWallFront = true;
          }
        }
        if (!isWallFront) rookResult.push(frontRook[i]);
      }
      let isWallBack = false;
      isFirst = true;
      for (let i = backRook.length - 1; i >= 0; i--) {
        const BackRookelement = document.getElementById(backRook[i]);
        for (let j = 0; j < piecesArray.length; j++) {
          if (BackRookelement.classList.contains(piecesArray[j])) {
            if (isFirst && piecesArray[j].charAt(0) !== pieceName.charAt(0)) {
              rookResult.push(backRook[i]);
              capture.push(backRook[i]);
            }
            isFirst = 0;
            isWallBack = true;
          }
        }
        if (!isWallBack) rookResult.push(backRook[i]);
      }
      return rookResult;
      break;
    //
    //  end rook part to make function
    //
    case "wbishop":
    case "bbishop":
      const topRight = legalMoves[0];
      const bottomRight = legalMoves[1];
      const topLeft = legalMoves[2];
      const bottomLeft = legalMoves[3];
      const bishopResult = [];
      //topright
      let isWallBishop = false;
      let isFirstBishop = true;
      for (let i = 0; i < topRight.length; i++) {
        const topRightelement = document.getElementById(topRight[i]);
        for (let j = 0; j < piecesArray.length; j++) {
          if (topRightelement.classList.contains(piecesArray[j])) {
            if (
              isFirstBishop &&
              piecesArray[j].charAt(0) !== pieceName.charAt(0)
            ) {
              bishopResult.push(topRight[i]);
              capture.push(topRight[i]);
            }
            isFirstBishop = 0;
            isWallBishop = true;
          }
        }
        if (!isWallBishop) bishopResult.push(topRight[i]);
      }
      //bottomright
      isWallBishop = false;
      isFirstBishop = true;
      for (let i = 0; i < bottomRight.length; i++) {
        const bottomRightelement = document.getElementById(bottomRight[i]);
        for (let j = 0; j < piecesArray.length; j++) {
          if (bottomRightelement.classList.contains(piecesArray[j])) {
            if (
              isFirstBishop &&
              piecesArray[j].charAt(0) !== pieceName.charAt(0)
            ) {
              bishopResult.push(bottomRight[i]);
              capture.push(bottomRight[i]);
            }
            isFirstBishop = 0;
            isWallBishop = true;
          }
        }
        if (!isWallBishop) bishopResult.push(bottomRight[i]);
      }
      //topleft
      isWallBishop = false;
      isFirstBishop = true;
      for (let i = 0; i < topLeft.length; i++) {
        const topLeftelement = document.getElementById(topLeft[i]);
        for (let j = 0; j < piecesArray.length; j++) {
          if (topLeftelement.classList.contains(piecesArray[j])) {
            if (
              isFirstBishop &&
              piecesArray[j].charAt(0) !== pieceName.charAt(0)
            ) {
              bishopResult.push(topLeft[i]);
              capture.push(topLeft[i]);
            }
            isFirstBishop = 0;
            isWallBishop = true;
          }
        }
        if (!isWallBishop) bishopResult.push(topLeft[i]);
      }
      //bottomleft
      isWallBishop = false;
      isFirstBishop = true;
      for (let i = 0; i < bottomLeft.length; i++) {
        const bottomLeftelement = document.getElementById(bottomLeft[i]);
        for (let j = 0; j < piecesArray.length; j++) {
          if (bottomLeftelement.classList.contains(piecesArray[j])) {
            if (
              isFirstBishop &&
              piecesArray[j].charAt(0) !== pieceName.charAt(0)
            ) {
              bishopResult.push(bottomLeft[i]);
              capture.push(bottomLeft[i]);
            }
            isFirstBishop = 0;
            isWallBishop = true;
          }
        }
        if (!isWallBishop) bishopResult.push(bottomLeft[i]);
      }

      return bishopResult;
      break;
    case "wknight":
    case "bknight":
      for (let i = 0; i < legalMoves.length; i++) {
        for (let j = 0; j < piecesArray.length; j++) {
          const knightElement = document.getElementById(legalMoves[i]);
          if (knightElement.classList.contains(piecesArray[j])) {
            if (piecesArray[j].charAt(0) !== pieceName.charAt(0))
              capture.push(legalMoves[i]);
          }
        }
      }
      return CheckForOwnPieces(legalMoves, pieceName);
      break;
    case "wqueen":
    case "bqueen":
      break;
    case "wking":
    case "bking":
      for (let i = 0; i < legalMoves.length; i++) {
        for (let j = 0; j < piecesArray.length; j++) {
          const kingElement = document.getElementById(legalMoves[i]);
          if (kingElement.classList.contains(piecesArray[j])) {
            if (piecesArray[j].charAt(0) !== pieceName.charAt(0))
              capture.push(legalMoves[i]);
          }
        }
      }
      return CheckForOwnPieces(legalMoves, pieceName);
      break;
    default:
      break;
  }
}

function CheckForOwnPieces(legalArray, pieceName) {
  let checkedArray = [];
  let color = pieceName.charAt(0) === "w" ? "white" : "black";
  for (let i = 0; i < legalArray.length; i++) {
    const squareToCheck = document.getElementById(legalArray[i]);
    let vacantSpot = true;
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

function ResetAllTdsToInitialState() {
  if(switched) SwitchBoard();
  initialTdClasses.forEach((tdInfo) => {
    tdInfo.element.className = tdInfo.class;
  });
  isWhiteTurn = true;
  showToMoveText(isWhiteTurn);
}

function SwitchBoard() {
  if(!switched){
    table.classList.remove('rotated-full');
    tableCells.forEach(cell=>{cell.classList.remove('rotated-full-cells');});
    table.classList.add('rotated');
    tableCells.forEach(cell=>{cell.classList.add('rotated-cells');});

    // table.style.transform = "rotate(180deg)";
    // tableCells.forEach(cell=>{cell.style.transform = "rotate(180deg)";});
    switched = true;
  }
  else{
    table.classList.add('rotated-full');
    tableCells.forEach(cell=>{cell.classList.add('rotated-full-cells');});
    table.classList.remove('rotated');
    tableCells.forEach(cell=>{cell.classList.remove('rotated-cells');});
    // table.style.transform = "none";
    // tableCells.forEach(cell=>{cell.style.transform = "none";});
    switched = false;
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
    ShowCheck();
  });
});

document.addEventListener("keydown", function (e) {
  if (e.key === "r" || e.key === "R") {
    ResetAllTdsToInitialState();
  }
  if (e.key === "f" || e.key === "F") {
    SwitchBoard();
  }
});

///////-----------------///////////
/////////////events////////////////
///////////////////////////////////
