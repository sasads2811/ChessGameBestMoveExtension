chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log("Message received in background from content:", message);
  if (message.type === "movesScraped") {
    if (message.moves) {
      // Send moves data to Python server
      fetch("http://127.0.0.1:5000/api/make_move", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ moves: message.moves }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json(); // Parse JSON response
        })
        .then((data) => {
          console.log("Response from Python server:", data);

          // Send a response to the popup script
          chrome.runtime.sendMessage(
            {
              type: "popupMessage",
              moves: data.moves,
              error: data.error,
            },
          );

          chrome.storage.sync.set({ best_move: data.moves}, function () {
            console.log("Best move saved to storage.");
          });
        })
        .catch((error) => {
          console.error("Error sending moves to Python server:", error);
        });
    }
  }
});
