const board = document.getElementById('game-board')!;

const cards = ["apple", "banana", "cherry", "grape", "orange", "pear"];
let gameCards = [...cards, ...cards]; // Create pairs of cards

gameCards.sort(() => Math.random() - 0.5); // Shuffle the cards

let firstCard: HTMLElement | null = null;
let secondCard: HTMLElement | null = null; // Track the second card

function createBoard() {
    gameCards.forEach((symbol) => {
        const cardElement = document.createElement('div'); // Create a div
        cardElement.classList.add('card'); // Add class to the div
        cardElement.dataset.symbol = symbol; // Store the symbol
        cardElement.innerText = '?'; // Set question mark on the card

        cardElement.addEventListener('click', () => flipCard(cardElement)); // Add event listener to flipCard function

        board.appendChild(cardElement); // Add the card to the game board
    });
};

function flipCard(card: HTMLElement) {
  if (card.innerText !== "?") return; // Ignore if the card is already flipped

  card.innerText = card.dataset.symbol!; // Flip the card to show the symbol

  if (!firstCard) {
    firstCard = card;
  } else {
    secondCard = card;
    checkMatch();
  } // Check for a match after flipping the second card
}

function checkMatch() {
  if (!firstCard || !secondCard) return;

  if (firstCard.dataset.symbol === secondCard.dataset.symbol /* If the symbols match, keep them flipped */) {
    firstCard = null;
    secondCard = null;
  } else {
    setTimeout(() => {
      firstCard!.innerText = "?";
      secondCard!.innerText = "?";
      firstCard = null;
      secondCard = null;
    }, 1000);
  } // If the symbols do not match, flip them back after delay
}

createBoard();