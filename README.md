Python Script Setup:

Extract Files: Extract the downloaded file on your desktop. This extraction will create a folder named "ChessGame".

Open Command Prompt:

Navigate to the directory containing the Python script:
1. cd Desktop\ChessGame\ChessGameScript
Set Up Virtual Environment:
2. python -m venv venv
Activate Virtual Environment:
3. .\venv\Scripts\activate
Install the required packages listed in "requirements.txt":
4. pip install -r requirements.txt
Run Flask Application:
5. python FlaskApp.py


Extension Installation for Chrome:

Open Chrome:

Launch Google Chrome and click on the three dots in the upper right corner to access the menu.
Navigate to Extensions Management:

From the menu, select "Extensions" to open the Extensions page.
Enable Developer Mode:

In the upper right corner of the Extensions page, toggle the switch for "Developer mode" to enable it.
Load Unpacked Extension:

Click on the "Load unpacked" button that appears on the left side of the Extensions page.
Navigate to the "ChessGameExtension" folder within the "ChessGame" folder on your desktop and select it.
Click "Select Folder" to import the extension.

Usage of the Windows Batch Script:

1. Edit the Script:

Open the batch script file (run_flask.bat) with Notepad.
Replace the placeholder path with the actual path to the "ChessGameScript" folder. (example: C:\Users\username\Desktop\ChessGame\ChessGameScript)
You can find the path by opening the folder, and in the address bar at the top, you'll see the directory path.
Save the changes after updating the path.
2. Run the Script:

Double-click the batch script file (start flask.bat) to execute it.
If everything is configured correctly, a Command Prompt window should appear with the application running.
Note: Ensure that Python 3.9 is installed on your system before running the script. If it's not installed, you can download and install it from the Microsoft Store.

Using the Script:

Open the Lichess website (only works on lichess) and start a game against the computer or another opponent.
Once the game starts, click on the installed extension icon.
The recommended move will be displayed after each move made in the game.
To keep the extension open continuously without closing when interacting with the game, right-click on the extension and select "Inspect". This will prevent it from closing.
Note: The extension displays the best move after each move, regardless of whether you are playing as black or white. Data from the page is scraped every 0.5 seconds, ensuring real-time updates of moves.
