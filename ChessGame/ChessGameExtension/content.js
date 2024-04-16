// Variable to store the previous moves
let previousMoves = [];

// Function to send moves to the popup script
function sendMovesToPopup() {
  const rm6Element = document.querySelector("body .is2d .round");
  const kwdbElements = rm6Element.getElementsByTagName("kwdb");
  const moves = [];
  for (let i = 0; i < kwdbElements.length; i++) {
    moves.push(kwdbElements[i].innerText);
  }

  // Check if moves have changed since the last call
  if (!arraysAreEqual(moves, previousMoves, kwdbElements)) {
    chrome.runtime.sendMessage({
      type: "movesScraped",
      moves: moves,
    });
    // Update previousMoves to current moves
    previousMoves = moves.slice();
  }
}

// Function to check if two arrays are equal
function arraysAreEqual(arr1, arr2, kwdbElements) {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  if (kwdbElements.length == 0) return false;
  return true;
}

// Send the moves to the popup script initially
sendMovesToPopup();

// Send the moves to the popup script every 0.5 seconds
setInterval(sendMovesToPopup, 500); // 500 milliseconds = 0.5 seconds
