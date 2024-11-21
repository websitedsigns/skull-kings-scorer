Skull King Scoring App

Welcome to the Skull King Scoring App! This app helps you track scores for the Skull King card game in a fun and interactive way. Players can input their bid and the number of tricks they've won each round, and the app will calculate their score, track their best performance, and display the overall best score.

This app is designed with a pirate game show theme, complete with animated pirate ships, treasure chests, and a whimsical user interface.

Features

Track Multiple Players: Support for 2–6 players, each with a name and individual scores.
Score Calculation: Track each player's score each round based on their bid and tricks won.
Best Score Tracking: Record the best score for each player and the overall best score in the game.
Pirate Game Show Theme: Modern, visually appealing design with fun pirate animations and sounds.
Real-Time Updates: Scores are updated dynamically as players submit their results.
Technologies Used

Frontend:
React.js
CSS (Styled components or traditional CSS for styling)
Axios (for API calls)
Backend:
Python (Flask)
Optional: SQLite/PostgreSQL for persistent storage
Design: Pirate game show theme (pirate ships, treasure maps, and animations)
Setup & Installation

To run this project locally, follow these steps:

1. Clone the Repository
git clone https://github.com/your-username/skull-king-scoring-app.git
cd skull-king-scoring-app
2. Frontend Setup (React)
Navigate to the frontend directory and install the necessary dependencies:
cd frontend
npm install
Start the React app:
npm start
This will start the React app on http://localhost:3000.

3. Backend Setup (Flask)
Navigate to the backend directory and set up a Python environment:
cd backend
python -m venv venv
source venv/bin/activate  # For Mac/Linux
venv\Scripts\activate     # For Windows
Install the required Python dependencies:
pip install -r requirements.txt
Start the Flask server:
python app.py
This will start the Flask server on http://localhost:5000.


