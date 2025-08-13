document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const difficultySelect = document.getElementById('difficulty');
    const guessInput = document.getElementById('guessInput');
    const submitGuessBtn = document.getElementById('submitGuessBtn');
    const resetBtn = document.getElementById('resetBtn');
    const feedbackEl = document.getElementById('feedback');
    const attemptsEl = document.getElementById('attempts');
    const previousGuessesEl = document.getElementById('previousGuesses');
    const instructionsEl = document.querySelector('.instructions');

    // Game State
    let secretNumber;
    let maxNumber;
    let attempts;
    let maxAttempts = 10;
    let previousGuesses = [];
    let isGameOver = false;

    function startGame() {
        // Reset game state
        isGameOver = false;
        attempts = 0;
        previousGuesses = [];
        maxNumber = parseInt(difficultySelect.value);
        secretNumber = Math.floor(Math.random() * maxNumber) + 1;

        // Reset UI
        feedbackEl.textContent = '';
        feedbackEl.className = 'feedback';
        previousGuessesEl.textContent = '';
        guessInput.value = '';
        guessInput.disabled = false;
        submitGuessBtn.disabled = false;
        difficultySelect.disabled = false;
        resetBtn.classList.add('hidden');
        guessInput.focus();
        
        updateInstructions();
        updateAttemptsDisplay();
    }

    function updateInstructions() {
        instructionsEl.textContent = `I've selected a number between 1 and ${maxNumber}. You have ${maxAttempts} attempts.`;
    }

    function updateAttemptsDisplay() {
        const attemptsRemaining = maxAttempts - attempts;
        attemptsEl.textContent = `Attempts remaining: ${attemptsRemaining}`;
    }

    function handleGuess() {
        if (isGameOver) return;

        const userGuess = parseInt(guessInput.value);

        // Input validation
        if (isNaN(userGuess) || userGuess < 1 || userGuess > maxNumber) {
            displayFeedback(`Please enter a valid number between 1 and ${maxNumber}.`, 'error');
            guessInput.value = '';
            return;
        }

        attempts++;
        previousGuesses.push(userGuess);
        previousGuessesEl.textContent = `Previous Guesses: ${previousGuesses.join(', ')}`;

        if (userGuess < secretNumber) {
            displayFeedback('Too low. Try again!', 'info');
        } else if (userGuess > secretNumber) {
            displayFeedback('Too high. Try again!', 'info');
        } else {
            displayFeedback(`Congratulations! You guessed it in ${attempts} attempts. The number was ${secretNumber}.`, 'success');
            endGame();
            return;
        }

        if (attempts >= maxAttempts) {
            displayFeedback(`Game over. The correct number was ${secretNumber}.`, 'error');
            endGame();
        }

        updateAttemptsDisplay();
        guessInput.value = '';
        guessInput.focus();
    }

    function displayFeedback(message, type) {
        feedbackEl.textContent = message;
        feedbackEl.className = `feedback ${type}`; // e.g., 'feedback success'
    }

    function endGame() {
        isGameOver = true;
        guessInput.disabled = true;
        submitGuessBtn.disabled = true;
        difficultySelect.disabled = true;
        resetBtn.classList.remove('hidden');
        resetBtn.focus();
    }

    // Event Listeners
    submitGuessBtn.addEventListener('click', handleGuess);
    resetBtn.addEventListener('click', startGame);
    difficultySelect.addEventListener('change', startGame);

    // Allow submitting with the "Enter" key
    guessInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevents form submission if it were in a form
            submitGuessBtn.click();
        }
    });

    // Initial game start
    startGame();
});
