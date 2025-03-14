# Flashcard ML App

A simple flashcard application for learning Machine Learning concepts, built with HTML, CSS, and JavaScript.

## Project Structure

```
.
├── index.html          # Main HTML file
├── src/
│   ├── css/           # CSS styles
│   │   └── styles.css
│   ├── js/            # JavaScript files
│   │   └── app.js
│   └── assets/        # Images and other assets
└── public/            # Public assets and compiled files
```

## Features

- Display flashcards with questions and answers
- Flip cards to reveal answers
- Navigate between cards
- Basic responsive design
- Simple and intuitive UI

## Getting Started

1. Clone the repository
2. Open `index.html` in your web browser
3. Start learning!

## Upcoming Features

- Add new flashcards
- View all cards in a list
- Categories and difficulty levels
- Progress tracking
- AI integration for flashcard generation

## Development

To modify or enhance the application:

1. Edit `src/css/styles.css` for styling changes
2. Edit `src/js/app.js` for functionality changes
3. Edit `index.html` for structure changes

No build process is required - this is a simple static website.


Phase 2: Core Implementation
Front-end Development

Implement a basic UI based on wireframes.
Create components/pages for:
Home: Contains dropdown or category filter, and “Add Card” button.
Flashcard Viewer: Shows the question, toggles the answer on click.
Add/Edit Card: Form to create or edit flashcards.
Back-end & Database

Set up the server (if using a Node.js or Python backend).
Create REST endpoints for:
GET /flashcards (with optional category filter).
POST /flashcards (to add new ones).
PUT /flashcards/:id (to update an existing one).
DELETE /flashcards/:id (to delete).
Implement a simple database schema (tables or collections for flashcards).