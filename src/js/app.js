// API endpoints
const API_URL = 'http://localhost:5000/api';

// State management
let flashcards = [];
let currentCardIndex = 0;

// DOM Elements
const flashcardContainer = document.getElementById('flashcardContainer');
const prevButton = document.getElementById('prevCard');
const nextButton = document.getElementById('nextCard');
const flipButton = document.getElementById('flipCard');
const addCardButton = document.getElementById('addCard');
const viewCardsButton = document.getElementById('viewCards');
const categoryFilter = document.getElementById('categoryFilter');
const addCardModal = document.getElementById('addCardModal');
const cardListModal = document.getElementById('cardListModal');
const addCardForm = document.getElementById('addCardForm');
const cardList = document.getElementById('cardList');

// Modal Functions
function showModal(modal) {
    modal.style.display = 'block';
}

function closeModal(modal) {
    modal.style.display = 'none';
}

function showAddCardModal() {
    showModal(addCardModal);
}

function showCardListModal() {
    showModal(cardListModal);
    displayCardList();
}

// Close modals when clicking outside
window.onclick = (event) => {
    if (event.target === addCardModal || event.target === cardListModal) {
        closeModal(event.target);
    }
};

// Close buttons
document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.onclick = () => {
        closeModal(closeBtn.closest('.modal'));
    };
});

// Fetch flashcards from API
async function fetchFlashcards(category = '') {
    try {
        console.log('Fetching flashcards...');
        const url = category ? `${API_URL}/flashcards?category=${category}` : `${API_URL}/flashcards`;
        console.log('Request URL:', url);
        
        const response = await fetch(url);
        console.log('Response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Received data:', data);
        
        flashcards = data;
        currentCardIndex = 0;
        displayCurrentCard();
    } catch (error) {
        console.error('Detailed error when fetching flashcards:', error);
        flashcardContainer.innerHTML = `
            <div class="error-message">
                <h3>Error loading flashcards</h3>
                <p>Details: ${error.message}</p>
                <button onclick="fetchFlashcards()">Try Again</button>
            </div>
        `;
    }
}

// Create and display flashcard
function createFlashcardElement(cardData) {
    const flashcard = document.createElement('div');
    flashcard.className = 'flashcard';
    
    const front = document.createElement('div');
    front.className = 'flashcard-front';
    front.textContent = cardData.question;
    
    const back = document.createElement('div');
    back.className = 'flashcard-back';
    back.textContent = cardData.answer;
    
    const category = document.createElement('div');
    category.className = 'card-category';
    category.textContent = `Category: ${cardData.category}`;
    
    const difficulty = document.createElement('div');
    difficulty.className = 'card-difficulty';
    difficulty.textContent = `Difficulty: ${cardData.difficulty}`;
    
    front.appendChild(category.cloneNode(true));
    back.appendChild(difficulty);
    
    flashcard.appendChild(front);
    flashcard.appendChild(back);
    
    return flashcard;
}

// Display current flashcard
function displayCurrentCard() {
    flashcardContainer.innerHTML = '';
    const currentCard = flashcards[currentCardIndex];
    if (currentCard) {
        const cardElement = createFlashcardElement(currentCard);
        flashcardContainer.appendChild(cardElement);
        updateNavigationButtons();
    }
}

// Display card list in modal
function displayCardList() {
    cardList.innerHTML = '';
    flashcards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card-list-item';
        cardElement.innerHTML = `
            <h3>${card.question}</h3>
            <p><strong>Category:</strong> ${card.category}</p>
            <p><strong>Difficulty:</strong> ${card.difficulty}</p>
            <div class="card-actions">
                <button onclick="deleteFlashcard(${card.id})">Delete</button>
            </div>
        `;
        cardList.appendChild(cardElement);
    });
}

// Update navigation button states
function updateNavigationButtons() {
    prevButton.disabled = currentCardIndex === 0;
    nextButton.disabled = currentCardIndex === flashcards.length - 1;
}

// Add new flashcard
async function addFlashcard(cardData) {
    try {
        const response = await fetch(`${API_URL}/flashcards`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cardData),
        });
        const newCard = await response.json();
        flashcards.push(newCard);
        currentCardIndex = flashcards.length - 1;
        displayCurrentCard();
        closeModal(addCardModal);
        addCardForm.reset();
    } catch (error) {
        console.error('Error adding flashcard:', error);
        alert('Failed to add flashcard. Please try again.');
    }
}

// Delete flashcard
async function deleteFlashcard(id) {
    if (confirm('Are you sure you want to delete this flashcard?')) {
        try {
            await fetch(`${API_URL}/flashcards/${id}`, {
                method: 'DELETE',
            });
            flashcards = flashcards.filter(card => card.id !== id);
            currentCardIndex = Math.min(currentCardIndex, flashcards.length - 1);
            displayCurrentCard();
            displayCardList();
        } catch (error) {
            console.error('Error deleting flashcard:', error);
            alert('Failed to delete flashcard. Please try again.');
        }
    }
}

// Event Listeners
prevButton.addEventListener('click', () => {
    if (currentCardIndex > 0) {
        currentCardIndex--;
        displayCurrentCard();
    }
});

nextButton.addEventListener('click', () => {
    if (currentCardIndex < flashcards.length - 1) {
        currentCardIndex++;
        displayCurrentCard();
    }
});

flipButton.addEventListener('click', () => {
    const flashcard = document.querySelector('.flashcard');
    if (flashcard) {
        flashcard.classList.toggle('flipped');
    }
});

addCardButton.addEventListener('click', showAddCardModal);
viewCardsButton.addEventListener('click', showCardListModal);

categoryFilter.addEventListener('change', (e) => {
    fetchFlashcards(e.target.value);
});

addCardForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = {
        question: document.getElementById('question').value,
        answer: document.getElementById('answer').value,
        category: document.getElementById('category').value,
        difficulty: document.getElementById('difficulty').value
    };
    addFlashcard(formData);
});

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    fetchFlashcards();
}); 