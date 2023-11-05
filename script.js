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
let capture = [];
let IsWhiteTurn=true;
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
  HideCaptureMoves();
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
  capture = [];
  selectPieces(squares, square);
  ShowCaptureMoves();
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
  if (piece.classList.contains("wpawn")) Moves("wpawn", piece, "white", "Show");
  if (piece.classList.contains("bpawn")) Moves("bpawn", piece, "black", "Show");
  if (piece.classList.contains("wrook")) Moves("wrook", piece, "white", "Show");
  if (piece.classList.contains("brook")) Moves("brook", piece, "black", "Show");
  if (piece.classList.contains("wbishop"))
    Moves("wbishop", piece, "white", "Show");
  if (piece.classList.contains("bbishop"))
    Moves("bbishop", piece, "black", "Show");
  if (piece.classList.contains("wknight"))
    Moves("wknight", piece, "white", "Show");
  if (piece.classList.contains("bknight"))
    Moves("bknight", piece, "black", "Show");
  if (piece.classList.contains("wqueen"))
    Moves("wqueen", piece, "white", "Show");
  if (piece.classList.contains("bqueen"))
    Moves("bqueen", piece, "black", "Show");
  if (piece.classList.contains("wking")) Moves("wking", piece, "white", "Show");
  if (piece.classList.contains("bking")) Moves("bking", piece, "black", "Show");
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

// function HideLegalMoves(piece) {
//   if(piece.classList.contains('wpawn')) PawnMoves(piece,"white",'Hide');
//   if(piece.classList.contains('bpawn')) PawnMoves(piece,"black",'Hide');
// }

function Moves(pieceName, input, color, showHide) {
  let legalCoords = GetLegalMoves(input, color, pieceName);
  // let legalCoords = LegalPawnMoves(input, color);
  // legalCoords = CheckForOwnPieces(legalCoords, color);
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
    case "wpawn":
    case "bpawn":
      return LegalPawnMoves(input, color, pieceName);
    case "wrook":
    case "brook":
      return LegalRookMoves(input, color, pieceName);
    case "wbishop":
    case "bbishop":
      return LegalBishopMoves(input, color, pieceName);
    case "wknight":
    case "bknight":
      return LegalKnightMoves(input, color, pieceName);
    case "wqueen":
    case "bqueen":
      return LegalQueenMoves(input, color, pieceName);
    case "wking":
    case "bking":
      return LegalKingMoves(input, color, pieceName);
    default:
      break;
  }
}

function LegalPawnMoves(piece, color, pieceName) {
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
    return StopMovement("wpawn", legalChar, legalNum, index, legalMoves);
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
    return StopMovement(pieceName, legalChar, legalNum, index, legalMoves);
  }
}

function LegalRookMoves(piece, color, pieceName) {
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

  return StopMovement(pieceName, legalChar, legalNum, index, legalMoves);
}

function LegalBishopMoves(piece, color, pieceName) {
  const placement = piece.id;
  let legalChar = placement.charAt(0);
  let legalNum = parseInt(placement.slice(1), 10);
  let index = letters.indexOf(legalChar);
  const legalMoves = [];
  let tempArray1=[];
  let tempArray2=[];
  for (let i = index + 1, j = 1; i < letters.length; i++, j++) {
    if (legalNum + j <= 8) tempArray1.push(letters[i] + (legalNum + j)); //topright
    if (legalNum - j > 0) tempArray2.push(letters[i] + (legalNum - j)); //bottomright
  }
  legalMoves.push(tempArray1, tempArray2);
  tempArray1=[];
  tempArray2=[];
  for (let i = index - 1, j = 1; i >= 0; i--, j++) {
    if (legalNum + j <= 8) tempArray1.push(letters[i] + (legalNum + j)); //topleft
    if (legalNum - j > 0) tempArray2.push(letters[i] + (legalNum - j)); //bottomleft
  }
  legalMoves.push(tempArray1, tempArray2);
  return StopMovement(pieceName, legalChar, legalNum, index, legalMoves);
}

function LegalQueenMoves(piece, color, pieceName) {
  let rookPartName;
  let bishopPartName;
  if (pieceName.charAt(0) === "w") {
    rookPartName = "wrook";
    bishopPartName = "wbishop";
  } else {
    rookPartName = "brook";
    bishopPartName = "bbishop";
  }
  const rookPart = LegalRookMoves(piece, color, rookPartName);
  console.log(rookPart);
  const legalMoves = [
    ...LegalRookMoves(piece, color, rookPartName),
    ...LegalBishopMoves(piece, color, bishopPartName),
  ];
  return legalMoves;
}

function LegalKingMoves(piece, color, pieceName) {
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
  return StopMovement(pieceName, legalChar, legalNum, index, legalMoves);
}

function LegalKnightMoves(piece, color, pieceName) {
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
  return StopMovement(pieceName, legalChar, legalNum, index, legalMoves);
}
function StopMovement(pieceName, pieceChar, pieceNum, index, legalMoves) {
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
      //begin rook wall check TODO: make this function AND TODO: make possible to take
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
      const topRight =legalMoves[0];
      const bottomRight =legalMoves[1];
      const topLeft =legalMoves[2];
      const bottomLeft =legalMoves[3];
      const bishopResult =[];
      //topright
      let isWallBishop = false;
      let isFirstBishop = true;
      for (let i = 0; i < topRight.length ; i++) {
        const topRightelement = document.getElementById(topRight[i]);
        for (let j = 0; j < piecesArray.length; j++) {
          if (topRightelement.classList.contains(piecesArray[j])) {
            if (isFirstBishop && piecesArray[j].charAt(0) !== pieceName.charAt(0)) {
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
      for (let i = 0; i < bottomRight.length ; i++) {
        const bottomRightelement = document.getElementById(bottomRight[i]);
        for (let j = 0; j < piecesArray.length; j++) {
          if (bottomRightelement.classList.contains(piecesArray[j])) {
            if (isFirstBishop && piecesArray[j].charAt(0) !== pieceName.charAt(0)) {
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
      for (let i = 0; i < topLeft.length ; i++) {
        const topLeftelement = document.getElementById(topLeft[i]);
        for (let j = 0; j < piecesArray.length; j++) {
          if (topLeftelement.classList.contains(piecesArray[j])) {
            if (isFirstBishop && piecesArray[j].charAt(0) !== pieceName.charAt(0)) {
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
      for (let i = 0; i < bottomLeft.length ; i++) {
        const bottomLeftelement = document.getElementById(bottomLeft[i]);
        for (let j = 0; j < piecesArray.length; j++) {
          if (bottomLeftelement.classList.contains(piecesArray[j])) {
            if (isFirstBishop && piecesArray[j].charAt(0) !== pieceName.charAt(0)) {
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
