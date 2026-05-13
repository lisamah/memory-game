const board = document.getElementById('game-board')!;

const cards = ["cup", "golbat", "onigiri", "radio", "stego", "katze"];
let gameCards = [...cards, ...cards]; // Create pairs of cards

gameCards.sort(() => Math.random() - 0.5); // Shuffle the cards

let firstCard: HTMLElement | null = null;
let secondCard: HTMLElement | null = null; // Track the second card
let isChecking = false; // Prevent flipping more than 2 cards

function createBoard() {
    gameCards.forEach((symbol) => {
        const cardElement = document.createElement('div'); // Create a div
        cardElement.classList.add('card'); // Add class to the div
        const img = document.createElement('img');
        img.src = `src/assets/${symbol}.png`; // Set the src to the image
        img.alt = symbol; // Set the alt to the symbol
        cardElement.dataset.symbol = symbol; // Store the symbol
        cardElement.innerText = '?'; // Set question mark on the card

        cardElement.addEventListener('click', () => flipCard(cardElement, img)); // Add event listener to flipCard function

        board.appendChild(cardElement); // Add the card to the game board
    });
}

function flipCard(card: HTMLElement, img: HTMLElement) {
    if (isChecking || card.innerText !== "?") return; // Ignore if checking or already flipped

    card.innerHTML = img.outerHTML!; // Flip the card to show the symbol
    card.classList.add(card.dataset.symbol!); // Add symbol as CSS class

    if (!firstCard) {
        firstCard = card;
    } else {
        secondCard = card;
        checkMatch();
    } // Check for a match after flipping the second card
}

function checkMatch() {
    if (!firstCard || !secondCard) return;

    isChecking = true; // Lock further flips

    if (firstCard.dataset.symbol === secondCard.dataset.symbol /* If the symbols match, keep them flipped */) {
        firstCard = null;
        secondCard = null;
        isChecking = false; // Unlock flipping
        checkWin();
    } else {
        setTimeout(() => {
            firstCard!.classList.remove(firstCard!.dataset.symbol!);
            secondCard!.classList.remove(secondCard!.dataset.symbol!);
            firstCard!.innerText = "?";
            secondCard!.innerText = "?";
            firstCard = null;
            secondCard = null;
            isChecking = false; // Unlock flipping
        }, 1000);
    } // If the symbols do not match, flip them back after delay
}

function checkWin() {
    const allFlipped = [...document.querySelectorAll('.card')].every(
        card => (card as HTMLElement).innerText === '?' === false
    );
    if (allFlipped) {
        document.getElementById('endscreen')!.classList.remove('hidden');
    }
}

function resetGame() {
    document.getElementById('endscreen')!.classList.add('hidden');
    firstCard = null;
    secondCard = null;
    isChecking = false;
    board.innerHTML = ''; // Clear the board
    gameCards.sort(() => Math.random() - 0.5); // Reshuffle
    createBoard();
}

document.querySelectorAll('.reset').forEach(btn => {
    btn.addEventListener('click', resetGame);
});

createBoard();