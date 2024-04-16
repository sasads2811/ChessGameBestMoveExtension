import json
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import chess

# Load configuration from file
config_path = './config.json'

# Initialize Flask app
app = Flask(__name__)

# Load configuration from JSON file
with open(config_path, 'r') as f:
    config = json.load(f)

# Enable CORS
CORS(app)

# Global variables
previous_moves = []
best_move = None
error = ''

# Function to generate FEN notation from moves
def generate_fen_from_moves(moves):
    board = chess.Board()
    try:
        for move in moves:
            board.push_san(move)
        return board.fen()
    except Exception as e:
        return None

# Function to get the best move from Stockfish API
def get_best_move_from_stockfish_api(fen):
    url = "https://chess-stockfish-16-api.p.rapidapi.com/chess/api"
    headers = {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": config.get("X-RapidAPI-Key"),
        "X-RapidAPI-Host": config.get("X-RapidAPI-Host")
    }
    payload = {
        "fen": fen
    }
    response = requests.post(url, headers=headers, data=payload)
    if response.status_code == 200:
        data = response.json()
        best_move = data.get("bestmove")
        return best_move
    else:
        print("Error:", response.status_code)
        return None

# Route for making a move
@app.route('/api/make_move', methods=['POST'])
def make_move():
    global previous_moves, best_move, error
    moves = request.json.get('moves')
    first_move = False

    # Check if it's the first move
    if len(moves) == 0:
        first_move = True

    # Check if moves have changed or it's the first move
    if moves != previous_moves or first_move:
        previous_moves = moves

        # Generate FEN representation from moves
        if not first_move:
            fen = generate_fen_from_moves(moves)
        else:
            fen = chess.Board().fen()

        if not fen:
            print('Cannot generate FEN from these moves')
            error = 'Cannot generate FEN from these moves'

        # Get the best move from Stockfish API
        best_move_solved = get_best_move_from_stockfish_api(fen)
        if best_move_solved:
            best_move = best_move_solved
            error = ''
        else:
            print("Failed to get the best move from Stockfish API.")
            error = "Failed to get the best move from Stockfish API!"

    # Print and return best move and error
    print('Best move:', best_move)
    print('Error:', error)
    return jsonify({'moves': best_move, 'error': error})

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
