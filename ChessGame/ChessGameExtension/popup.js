document.addEventListener("DOMContentLoaded", function () {
  var numberDisplay = document.getElementById("numberDisplay");
  var errorDisplay = document.getElementById("errorDisplay");

  // Function to display moves or error
  function displayMovesOrError(moves, error) {
    if (error) {
      errorDisplay.textContent = "Error: " + error;
      numberDisplay.textContent = null;
    } else if (moves) {
      numberDisplay.textContent =
        moves.substring(0, 2) + "->" + moves.substring(2);
      errorDisplay.textContent = null;
    }
  }

  // Read from storage when the popup is opened
  chrome.storage.sync.get(["best_move"], function (result) {
    console.log("Move retrieved from storage:", result.best_move);
    displayMovesOrError(result.best_move, null);
  });

  // Listen for messages from the background script
  chrome.runtime.onMessage.addListener(function (
    message,
    sender,
    sendResponse
  ) {
    console.log("Message received in popup.js:", message);
    if (message.type === "popupMessage") {
      // Handle the message from the content script
      console.log("Number from content script:", message.moves);
      displayMovesOrError(message.moves, message.error);
    }
  });
});
