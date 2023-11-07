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
let moved = false;
let selection = document.querySelector(".selected");
const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
let previousId = 0;
let capture = [];
let isWhiteTurn = true;
let wcheck = false;
let bcheck = false;
let checked = false;
let whiteWinCheck = 0;
let blackWinCheck = 0;
let wNowhereToGo = false;
let bNowhereToGo = false;
let switched = false;
let isWCastlingPossibleH = true;
let isWCastlingPossibleA = true;
let isBCastlingPossibleH = true;
let isBCastlingPossibleA = true;
let kingName;
let clicked;
let doneCheckingForMoves;
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
function CheckWhichPieceAndAdjustVariables(previous) {
  if (previous.classList.contains("wking")) kingName = "wking";
  if (previous.classList.contains("bking")) kingName = "bking";
  if (previous.classList.contains("warook")) isWCastlingPossibleA = false;
  if (previous.classList.contains("whrook")) isWCastlingPossibleH = false;
  if (previous.classList.contains("barook")) isBCastlingPossibleA = false;
  if (previous.classList.contains("bhrook")) isBCastlingPossibleH = false;
}
function MovePieces(square) {
  HideCaptureMoves();
  let isMoveLegal = IsMoveLegal(square);
  let previous =
    previousId !== 0 ? document.getElementById(previousId) : undefined;
  if (isMoveLegal) {
    isWhiteTurn = !isWhiteTurn;
    kingName = 0;
    CheckWhichPieceAndAdjustVariables(previous);
    CopyClasses(previous, square);
    previous.classList = [];
    moved = true;
    Castling(kingName, square);
    showToMoveText(isWhiteTurn);
    if (isPlayer2) SwitchBoard();
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
  whiteWinCheck = false;
  blackWinCheck = false;
  // squares.forEach((square) => {
  //   if (square.classList.contains("bking")) whiteWinCheck = false;
  //   if (square.classList.contains("wking")) blackWinCheck = false;
  // });
  if (wcheck) {
    if (wNowhereToGo) blackWinCheck = true;
  }
  if (bcheck) {
    if (bNowhereToGo) whiteWinCheck = true;
  }
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
  from.classList = [];
}

function HideLegalMoves(square) {
  square.classList.remove("legal");
}
function ChangeLegalMovesIfCheck(piece, movesArray, showingCheck) {
  const filteredLegalMoves = [];
  if ((piece === clicked) & !showingCheck) {
    if (isWhiteTurn && wcheck) {
      for (let i = 0; i < movesArray.length; i++) {
        const tempCheckElement = document.getElementById(movesArray[i]);
        let tempclasslist = tempCheckElement.classlist;
        if (tempCheckElement.classList.contains("attacker")){
          filteredLegalMoves.push(movesArray[i]);
          break;
        }
        tempCheckElement.classList = piece.classList;
        allPieces.forEach((piece2) => {
          if (piece2.classList.contains("wking"))
            if (!CheckForCheck(piece2, "", true, true, true))
              filteredLegalMoves.push(movesArray[i]);
        });
        tempCheckElement.classList = tempclasslist;
        doneCheckingForMoves = true;
      }
      return filteredLegalMoves;
    }
  }
  if (!isWhiteTurn && bcheck) {
  } else return movesArray;
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
function ShowCheck(color, fixingCheck, showingCheck) {
  wNowhereToGo = false;
  bNowhereToGo = false;
  allPieces.forEach((piece) => {
    piece.classList.remove("attacker");
    if (piece.classList.contains("wking")) {
      watchKingMoves("wking", piece, showingCheck);
      {
        wcheck = CheckForCheck(piece, "", true, true, fixingCheck);
        if (wcheck) {
          piece.classList.add("check");
        }
        if (!wcheck) {
          piece.classList.remove("check");
        }
      }
    }
    if (piece.classList.contains("bking")) {
      watchKingMoves("bking", piece, showingCheck);
      {
        bcheck = CheckForCheck(piece, "", true, true, fixingCheck);
        if (bcheck) {
          piece.classList.add("check");
        }
        if (!bcheck) {
          piece.classList.remove("check");
        }
      }
    }
  });
  if (color === "white") return wcheck;
  if (color === "black") return bcheck;
}
function CheckForCheck(
  square,
  colorOverride,
  checking,
  attacked,
  fixingCheck,
  castlingcheck
) {
  if (colorOverride == "white" || colorOverride === "black") checking = true;
  if (square.classList.contains("wking") || colorOverride === "white") {
    if (CheckCheck(square, "wpawn", "bpawn", checking, attacked, fixingCheck))
      return true;
    if (
      CheckCheck(
        square,
        "wrook",
        "brook",
        checking,
        attacked,
        fixingCheck,
        castlingcheck
      )
    )
      return true;
    if (
      CheckCheck(
        square,
        "wbishop",
        "bbishop",
        checking,
        attacked,
        fixingCheck,
        castlingcheck
      )
    )
      return true;
    if (
      CheckCheck(
        square,
        "wknight",
        "bknight",
        checking,
        attacked,
        fixingCheck,
        castlingcheck
      )
    )
      return true;
    if (
      CheckCheck(
        square,
        "wqueen",
        "bqueen",
        checking,
        attacked,
        fixingCheck,
        castlingcheck
      )
    )
      return true;
    if (
      CheckCheck(
        square,
        "king",
        "bking",
        checking,
        attacked,
        fixingCheck,
        castlingcheck
      )
    )
      return true;
  }
  if (square.classList.contains("bking") || colorOverride === "black") {
    if (
      CheckCheck(
        square,
        "bpawn",
        "wpawn",
        checking,
        attacked,
        fixingCheck,
        castlingcheck
      )
    )
      return true;
    if (
      CheckCheck(
        square,
        "brook",
        "wrook",
        checking,
        attacked,
        fixingCheck,
        castlingcheck
      )
    )
      return true;
    if (
      CheckCheck(
        square,
        "bbishop",
        "wbishop",
        checking,
        attacked,
        fixingCheck,
        castlingcheck
      )
    )
      return true;
    if (
      CheckCheck(
        square,
        "bknight",
        "wknight",
        checking,
        attacked,
        fixingCheck,
        castlingcheck
      )
    )
      return true;
    if (
      CheckCheck(
        square,
        "bqueen",
        "wqueen",
        checking,
        attacked,
        fixingCheck,
        castlingcheck
      )
    )
      return true;
    if (
      CheckCheck(
        square,
        "king",
        "wking",
        checking,
        attacked,
        fixingCheck,
        castlingcheck
      )
    )
      return true;
  }
  return false;
}

function CheckCheck(
  square,
  movetype,
  pieceToCheckFor,
  checking,
  attacked,
  fixingCheck,
  castlingcheck
) {
  const toCheckArray = GetLegalMoves(
    square,
    movetype,
    checking,
    fixingCheck,
    castlingcheck
  );
  for (let i = 0; i < toCheckArray.length; i++) {
    const toCheck = document.getElementById(toCheckArray[i]);
    if (toCheck.classList.contains(pieceToCheckFor)) {
      if (attacked) toCheck.classList.add("attacker");
      return true;
    }
  }
  return false;
}
function watchKingMoves(pieceName, input, showHide, showingCheck) {
  let legalCoords = GetLegalMoves(input, pieceName, showingCheck, true);
  if (pieceName === "wking" && legalCoords.length === 0) {
    wNowhereToGo = true;
  } else if (pieceName === "bking" && legalCoords.length === 0) {
    bNowhereToGo = true;
  }
}

function Moves(pieceName, input, showHide) {
  let legalCoords = GetLegalMoves(input, pieceName);
  for (let i = 0; i < legalCoords.length; i++) {
    if (showHide == "Show") {
      document.getElementById(legalCoords[i]).classList.add("legal");
    }
    if (showHide == "Hide")
      document.getElementById(legalCoords[i]).classList.remove("legal");
  }
}

function GetLegalMoves(
  input,
  pieceName,
  checking,
  fixingCheck,
  showingCheck,
  castlingcheck
) {
  switch (pieceName) {
    case "wpawn":
    case "bpawn":
      const legalPawnMoves = LegalPawnMoves(
        input,
        pieceName,
        checking,
        fixingCheck
      );
      if (!doneCheckingForMoves)
        return ChangeLegalMovesIfCheck(input, legalPawnMoves, showingCheck);
      return legalPawnMoves;
    case "wrook":
    case "brook":
      const legalRookMoves = LegalRookMoves(
        input,
        pieceName,
        checking,
        fixingCheck
      );
      if (!doneCheckingForMoves)
        return ChangeLegalMovesIfCheck(input, legalRookMoves, showingCheck);
      return legalRookMoves;
    case "wbishop":
    case "bbishop":
      const legalBishopMoves = LegalBishopMoves(input, pieceName, checking);
      if (!doneCheckingForMoves)
        return ChangeLegalMovesIfCheck(input, legalBishopMoves, showingCheck);
      return legalBishopMoves;
    case "wknight":
    case "bknight":
      const legalKnightMoves = LegalKnightMoves(
        input,
        pieceName,
        checking,
        fixingCheck
      );
      if (!doneCheckingForMoves)
        return ChangeLegalMovesIfCheck(input, legalKnightMoves, showingCheck);
      return legalKnightMoves;
    case "wqueen":
    case "bqueen":
      const legalQueenMoves = LegalQueenMoves(
        input,
        pieceName,
        checking,
        fixingCheck
      );
      if (!doneCheckingForMoves)
        return ChangeLegalMovesIfCheck(input, legalQueenMoves, showingCheck);
      return legalQueenMoves;
    case "wking":
      let tempWKing = LegalKingMoves(input, pieceName, checking);
      tempWKing = RemoveStepIntoCheck(tempWKing, pieceName, "white");
      return tempWKing;
    case "bking":
      let tempBKing = LegalKingMoves(input, pieceName, checking);
      tempBKing = RemoveStepIntoCheck(tempBKing, pieceName, "black");
      return tempBKing;
    case "king":
      return LegalKingMoves(input, pieceName, checking);
    default:
      break;
  }
}
function RemoveStepIntoCheck(array, pieceName, colorOverride) {
  let toReturn = [];
  for (let i = 0; i < array.length; i++) {
    const element = document.getElementById(array[i]);
    if (!CheckForCheck(element, colorOverride, true, false, false, true))
      toReturn.push(array[i]);
  }
  return toReturn;
}
function LegalPawnMoves(piece, pieceName, checking) {
  let placement = piece.id;
  let legalChar = placement.charAt(0);
  let legalNum = parseInt(placement.slice(1), 10);
  let index = letters.indexOf(legalChar);
  let arrayforchecking = [];
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
            arrayforchecking.push(leftFrontId);
            if (!checking) capture.push(leftFrontId);
          }
        }
      }
      if (rightFrontId != 0) {
        rightFront = document.getElementById(rightFrontId);
        for (let i = 0; i < blackPiecesArray.length; i++) {
          if (rightFront.classList.contains(blackPiecesArray[i])) {
            legalMoves.push(rightFrontId);
            arrayforchecking.push(leftFrontId);
            if (!checking) capture.push(rightFrontId);
          }
        }
      }
    }
    if (legalNum === 2) {
      let legal1 = legalChar + (legalNum + 1);
      let legal2 = legalChar + (legalNum + 2);
      let isLegal2occupied = false;
      const legal2square = document.getElementById(legal2);
      for (let i = 0; i < piecesArray.length; i++) {
        if(legal2square.classList.contains(piecesArray[i])) 
          isLegal2occupied = true;
      }
      if(isLegal2occupied)legalMoves.push(legal1);
      else legalMoves.push(legal1, legal2);
    } else if (legalNum === 8) legalMoves.push(legalChar + legalNum);
    else legalMoves.push(legalChar + (legalNum + 1));
    if (checking) {
      return GetTrueMoves(
        "wpawn",
        legalChar,
        legalNum,
        index,
        arrayforchecking,
        checking
      );
    } else
      return GetTrueMoves(
        "wpawn",
        legalChar,
        legalNum,
        index,
        legalMoves,
        checking
      );
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
            if (!checking) capture.push(leftFrontId);
          }
        }
      }
      if (rightFrontId != 0) {
        rightFront = document.getElementById(rightFrontId);
        for (let i = 0; i < whitePiecesArray.length; i++) {
          if (rightFront.classList.contains(whitePiecesArray[i])) {
            legalMoves.push(rightFrontId);
            if (!checking) capture.push(rightFrontId);
          }
        }
      }
    }
    if (legalNum === 7) {
      let legal1 = legalChar + (legalNum - 1);
      let legal2 = legalChar + (legalNum - 2);
      let isLegal2occupied = false;
      const legal2squareB = document.getElementById(legal2);
      for (let i = 0; i < piecesArray.length; i++) {
        if(legal2squareB.classList.contains(piecesArray[i])) 
          isLegal2occupied = true;
      }      
      if(isLegal2occupied)legalMoves.push(legal1);
      else legalMoves.push(legal1, legal2);
    } else if (legalNum === 1) legalMoves.push(legalChar + legalNum);
    else legalMoves.push(legalChar + (legalNum - 1));
    return GetTrueMoves(
      pieceName,
      legalChar,
      legalNum,
      index,
      legalMoves,
      checking
    );
  }
}

function LegalRookMoves(piece, pieceName, checking) {
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

  return GetTrueMoves(
    pieceName,
    legalChar,
    legalNum,
    index,
    legalMoves,
    checking
  );
}

function LegalBishopMoves(piece, pieceName, checking, fixingCheck) {
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
  return GetTrueMoves(
    pieceName,
    legalChar,
    legalNum,
    index,
    legalMoves,
    checking
  );
}

function LegalQueenMoves(piece, pieceName, checking) {
  let rookPartName;
  let bishopPartName;
  if (pieceName.charAt(0) === "w") {
    rookPartName = "wrook";
    bishopPartName = "wbishop";
  } else {
    rookPartName = "brook";
    bishopPartName = "bbishop";
  }
  // const rookPart = LegalRookMoves(piece, rookPartName, checking);
  const legalMoves = [
    ...LegalRookMoves(piece, rookPartName, checking),
    ...LegalBishopMoves(piece, bishopPartName, checking),
  ];
  return legalMoves;
}

function LegalKingMoves(piece, pieceName, checking) {
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
  return GetTrueMoves(
    pieceName,
    legalChar,
    legalNum,
    index,
    legalMoves,
    checking
  );
}

function LegalKnightMoves(piece, pieceName, checking) {
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
  return GetTrueMoves(
    pieceName,
    legalChar,
    legalNum,
    index,
    legalMoves,
    checking
  );
}

function GetTrueMoves(
  pieceName,
  pieceChar,
  pieceNum,
  index,
  legalMoves,
  checking
) {
  const pieceForCheck = document.getElementById(pieceChar + pieceNum);
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
              if (!checking) capture.push(leftRook[i]);
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
              if (!checking) capture.push(rightRook[i]);
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
              if (!checking) capture.push(frontRook[i]);
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
              if (!checking) capture.push(backRook[i]);
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
              if (!checking) capture.push(topRight[i]);
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
              if (!checking) capture.push(bottomRight[i]);
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
              if (!checking) capture.push(topLeft[i]);
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
              if (!checking) capture.push(bottomLeft[i]);
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
              if (!checking) capture.push(legalMoves[i]);
          }
        }
      }
      return CheckForOwnPieces(legalMoves, pieceName, checking);
      break;
    case "wqueen":
    case "bqueen":
      break;
    case "king":
      for (let i = 0; i < legalMoves.length; i++) {
        for (let j = 0; j < piecesArray.length; j++) {
          const kingElement = document.getElementById(legalMoves[i]);
          if (kingElement.classList.contains(piecesArray[j])) {
            if (piecesArray[j].charAt(0) !== pieceName.charAt(0))
              if (!checking) capture.push(legalMoves[i]);
          }
        }
      }
      return CheckForOwnPieces(legalMoves, pieceName, checking);
    case "wking":
    case "bking":
      for (let i = 0; i < legalMoves.length; i++) {
        const kingElement = document.getElementById(legalMoves[i]);
        for (let j = 0; j < piecesArray.length; j++) {
          if (kingElement.classList.contains(piecesArray[j])) {
            if (piecesArray[j].charAt(0) !== pieceName.charAt(0))
              if (!checking) capture.push(legalMoves[i]);
          }
        }
      }
      AddCastling(pieceName, legalMoves, true);
      return CheckForOwnPieces(legalMoves, pieceName);
      break;
    default:
      break;
  }
}
function AddCastling(pieceName, legalMoves, checking) {
  if (pieceName === "wking" && isWCastlingPossibleH) {
    if (IsSpaceFreeForCastling(firstKingSide, whitePiecesArray, checking))
      legalMoves.push("g1");
  }
  if (pieceName === "wking" && isWCastlingPossibleA) {
    if (IsSpaceFreeForCastling(firstQueenSide, whitePiecesArray, checking))
      legalMoves.push("c1");
  }
  if (pieceName === "bking" && isBCastlingPossibleH) {
    if (IsSpaceFreeForCastling(lastKingSide, blackPiecesArray, checking))
      legalMoves.push("g8");
  }
  if (pieceName === "bking" && isBCastlingPossibleA) {
    if (IsSpaceFreeForCastling(lastQueenSide, blackPiecesArray, checking))
      legalMoves.push("c8");
  }
}

function IsSpaceFreeForCastling(sideArray, piecesArray, checking) {
  let castlingAllowed = true;
  for (let i = 0; i < sideArray.length; i++) {
    const sideSquare = document.getElementById(sideArray[i]);
    for (let j = 0; j < piecesArray.length; j++) {
      {
        if (sideSquare.classList.contains(piecesArray[j]))
          castlingAllowed = false;
      }
    }
    let colorOverride = piecesArray[0].charAt(0) === "w" ? "white" : "black";
    if (CheckForCheck(sideSquare, colorOverride, true, false, false))
      castlingAllowed = false;
  }
  return castlingAllowed;
}

function Castling(pieceName, square) {
  let rookCastling;
  let rookCastlingNew;
  if (pieceName === "bking") {
    if (previousId === "e8" && square.id === "c8" && isBCastlingPossibleA) {
      rookCastling = document.getElementById("a8");
      rookCastlingNew = document.getElementById("d8");
      CopyClasses(rookCastling, rookCastlingNew);
    } else if (
      previousId === "e8" &&
      square.id === "g8" &&
      isBCastlingPossibleH
    ) {
      rookCastling = document.getElementById("h8");
      rookCastlingNew = document.getElementById("f8");
      CopyClasses(rookCastling, rookCastlingNew);
    }
    isBCastlingPossibleH = false;
    isBCastlingPossibleA = false;
  }
  if (pieceName === "wking") {
    if (previousId === "e1" && square.id === "c1" && isWCastlingPossibleA) {
      rookCastling = document.getElementById("a1");
      rookCastlingNew = document.getElementById("d1");
      CopyClasses(rookCastling, rookCastlingNew);
    } else if (
      previousId === "e1" &&
      square.id === "g1" &&
      isWCastlingPossibleH
    ) {
      rookCastling = document.getElementById("h1");
      rookCastlingNew = document.getElementById("f1");
      CopyClasses(rookCastling, rookCastlingNew);
    }
    isWCastlingPossibleH = false;
    isWCastlingPossibleA = false;
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

function Reset() {
  if (switched) SwitchBoard();
  initialTdClasses.forEach((tdInfo) => {
    tdInfo.element.className = tdInfo.class;
  });
  showToMoveText(isWhiteTurn);
  moved = false;
  previousId = 0;
  capture = [];
  isWhiteTurn = true;
  wcheck = false;
  bcheck = false;
  checked = false;
  whiteWinCheck = 0;
  blackWinCheck = 0;
  switched = false;
  isWCastlingPossibleH = true;
  isWCastlingPossibleA = true;
  isBCastlingPossibleH = true;
  isBCastlingPossibleA = true;
  kingName = 0;
  clicked = 0;
  doneCheckingForMoves = 0;
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
///////-----------------///////////
///////////functions///////////////
///////////////////////////////////

///////////////////////////////////
/////////////events////////////////
///////-----------------///////////
squares.forEach((square) => {
  square.addEventListener("click", () => {
    clicked = square;
    MovePieces(square);
    doneCheckingForMoves = true;
    ShowCheck("", false, true);
    checkWin();
    doneCheckingForMoves = false;
  });
});

document.addEventListener("keydown", function (e) {
  if (e.key === "r" || e.key === "R") {
    Reset();
  }
  if (e.key === "f" || e.key === "F") {
    SwitchBoard();
  }
});

///////-----------------///////////
/////////////events////////////////
///////////////////////////////////
