## Chess Game Code Explanation

### Variables and Elements
- `initialTdClasses`: An empty array used to store initial classes of `<td>` elements in a table.
- `table`: Represents the first `<table>` element in the HTML document.
- `tableCells`: Stores all the `<td>` elements within the table.
- `allPieces`: A collection of elements with various class names representing different chess pieces.
- `squares`: A collection of all the `<td>` elements in the chessboard.
- `centerText`, `whiteText`, `blackText`: Variables representing elements in the HTML document with class names used for displaying messages.
- `firstKingSide`, `firstQueenSide`, `lastKingSide`, `lastQueenSide`: Arrays storing positions of pieces on the chessboard.
- `blackPiecesArray` and `whitePiecesArray`: Arrays containing class names for black and white chess pieces, respectively.
- `piecesArray`: An array containing class names for all the chess pieces.
- `moved`: A boolean variable to track whether a piece has been moved.
- `selection`: Represents the currently selected element.
- `letters` and `numbers`: Arrays for chess board coordinates.
- `previousId`: Stores the previous selected square's ID.
- `capture`: An array to store captured pieces.
- `isWhiteTurn`: A boolean indicating whose turn it is.
- Various other variables related to checking for checkmate, castling, and piece movement.

### Functions

#### `watchKingMoves(pieceName, input, showHide)`
- Determines whether a king (either white or black) has legal moves or is in checkmate.
- Calls the `GetLegalMoves` function and checks if the legal moves for the king are empty.
- Sets corresponding "NowhereToGo" flags to true.

#### `Moves(pieceName, input, showHide)`
- Highlights legal moves for a given chess piece on the chessboard.
- Calls the `GetLegalMoves` function and adds the "legal" class to the appropriate squares to indicate where the piece can move.
- The `showHide` parameter controls whether to show or hide the legal moves.

#### `GetLegalMoves(input, pieceName, checking)`
- A central dispatcher for calculating legal moves for different types of chess pieces.
- Takes the piece's name, the input square, and a checking flag.
- Switches based on the piece's name and calls specific functions to determine legal moves.
- Returns an array of legal moves.

#### `RemoveStepIntoCheck(array, pieceName, colorOverride)`
- Checks if a move will put the own king in check.
- Iterates through an array of potential moves and checks if any of them would result in a check.
- Returns an array of moves that do not result in check.

#### `LegalPawnMoves(piece, pieceName, checking)`
- Calculates legal moves for pawn pieces (both white and black) based on their current position.
- Considers forward moves, captures, and special two-step moves for pawns.
- The `checking` parameter is used to determine whether to show legal moves or not.

#### `LegalRookMoves(piece, pieceName, checking)`
- Calculates legal moves for rook pieces (both white and black).
- Considers moves along ranks and files.
- Filters out moves outside the board.
- The `checking` parameter is used to determine whether to show legal moves or not.

#### `LegalBishopMoves(piece, pieceName, checking)`
- Calculates legal moves for bishop pieces (both white and black) based on their current position.
- Considers diagonal moves in four directions: top-right, bottom-right, top-left, and bottom-left.
- Creates arrays `tempArray1` and `tempArray2` to store legal moves in these directions.
- Returns an array of all legal bishop moves by combining these arrays.

#### `LegalQueenMoves(piece, pieceName, checking)`
- Calculates legal moves for queen pieces (both white and black) by combining the legal moves of rooks and bishops.
- Calls `LegalRookMoves` and `LegalBishopMoves` to get the legal moves in the orthogonal and diagonal directions, respectively.
- Combines them into a single array.

#### `LegalKingMoves(piece, pieceName, checking)`
- Calculates legal moves for king pieces (both white and black) based on their current position.
- Considers moves in all eight adjacent squares, including horizontal, vertical, and diagonal moves.
- Returns an array of legal king moves.

#### `LegalKnightMoves(piece, pieceName, checking)`
- Calculates legal moves for knight pieces (both white and black) based on their current position.
- Considers L-shaped moves, where the knight moves two squares in one direction and one square in a perpendicular direction.
- Checks for any pieces that might be captured by the knight's moves.

#### `GetTrueMoves(pieceName, pieceChar, pieceNum, index, legalMoves, checking)`
- Refines the legal moves obtained for different pieces.
- Checks for obstacles or captures and filters the legal moves accordingly.
- The behavior is customized based on the piece's name.

#### `AddCastling(pieceName, legalMoves, checking)`
- Adds castling moves to the legal moves for kings.
- Checks whether castling is possible and, if so, adds the corresponding moves to the `legalMoves` array.

#### `IsSpaceFreeForCastling(sideArray, piecesArray, checking)`
- Checks if the squares required for castling are unoccupied and not under threat.
- Used to determine if castling is a valid option for the king.

#### `Castling(pieceName, square)`
- Handles castling for kings.
- Moves the rook to the appropriate square when castling is performed and updates the castling flags accordingly.

#### `CheckForOwnPieces(legalArray, pieceName)`
- Takes an array of legal move positions and a piece's name as input.
- Checks each position to determine if it's vacant (no piece of the same color is present).
- Filters the legal positions and returns an array containing only the positions where the piece can legally move.

#### `Reset()`
- Used to reset the chessboard and game state.
- Restores the initial classes for each square on the board.
- Shows the side to move (white or black).
- Resets various flags and variables.
- Clears the "capture" array, which keeps track of captured pieces.
- Sets the game to white's turn and resets the castling flags.

#### `SwitchBoard()`
- Used to switch the orientation of the chessboard.
- Adds or removes classes to rotate the board and its cells, creating the appearance of a rotated chessboard.
- A visual feature that allows players to view the board from the opposite side.
- The `switched` flag is used to track the current board orientation.

### Event Listeners

- The code includes event listeners to handle user interactions.
- When a square on the chessboard is clicked (`click` event), it calls the `MovePieces` function to handle piece movement, checks for check situations using `ShowCheck`, and verifies if the game has been won with `checkWin`.
- There is also a global event listener for the `keydown` event. It listens for specific keys:
  - "r" or "R" to reset the game using the `Reset` function.
  - "f" or "F" to switch the orientation of the chessboard using the `SwitchBoard` function. This allows players to rotate the board visually.
