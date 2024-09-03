let playerCards = [];
let playerSum = 0;
let houseCards = [];
let houseSum = 0;
let hasBlackjack = false;
let isAlive = false;
let message = "";

let playerCardsEl = document.getElementById("player-cards");
let playerSumEl = document.getElementById("player-sum");
let houseCardsEl = document.getElementById("house-cards");
let houseSumEl = document.getElementById("house-sum");
let messageEl = document.getElementById("message");

let startBtn = document.getElementById("start-btn");
let newCardBtn = document.getElementById("new-card-btn");
let standBtn = document.getElementById("stand-btn");

function getRandomCard() {
    let randomCard = Math.floor(Math.random() * 13) + 1;
    if (randomCard > 10) {
        return 10;
    } else if (randomCard === 1) {
        return 11;
    } else {
        return randomCard;
    }
}

function startGame() {
    isAlive = true;
    hasBlackjack = false;

    // Reset player and house hands
    playerCards = [getRandomCard(), getRandomCard()];
    houseCards = [getRandomCard(), getRandomCard()];

    playerSum = playerCards.reduce((a, b) => a + b, 0);
    houseSum = houseCards.reduce((a, b) => a + b, 0);

    newCardBtn.disabled = false;
    standBtn.disabled = false;
    startBtn.style.display = "none"; // Hide the start button

    renderGame();
}

function renderGame() {
    playerCardsEl.textContent = "Player Cards: " + playerCards.join(" - ");
    playerSumEl.textContent = "Player Sum: " + playerSum;
    houseCardsEl.textContent = "House Cards: " + houseCards.join(" - ");
    houseSumEl.textContent = "House Sum: " + houseSum;

    if (playerSum === 21) {
        message = "Player got Blackjack!";
        hasBlackjack = true;
        newCardBtn.disabled = true;
        standBtn.disabled = true;
        playHouseTurn();
    } else if (playerSum > 21) {
        message = "Player is out of the game!";
        isAlive = false;
        newCardBtn.disabled = true;
        standBtn.disabled = true;
        playHouseTurn();
    } else {
        message = "Do you want to draw a new card or stand?";
    }
    messageEl.textContent = message;
}

function newCard() {
    if (isAlive && !hasBlackjack) {
        let card = getRandomCard();
        playerSum += card;
        playerCards.push(card);
        renderGame();

        if (playerSum > 21) {
            playHouseTurn();
        }
    }
}

function stand() {
    if (isAlive) {
        message = "Player stands. House's turn.";
        messageEl.textContent = message;
        newCardBtn.disabled = true;
        standBtn.disabled = true;
        playHouseTurn();
    }
}

function playHouseTurn() {
    while (houseSum < 17) {
        let card = getRandomCard();
        houseSum += card;
        houseCards.push(card);
    }

    houseCardsEl.textContent = "House Cards: " + houseCards.join(" - ");
    houseSumEl.textContent = "House Sum: " + houseSum;

    determineWinner();
}

function determineWinner() {
    if (houseSum > 21) {
        message = "House busts! Player wins!";
    } else if (houseSum === playerSum) {
        message = "It's a tie!";
    } else if (playerSum > 21) {
        message = "House wins!";
    } else if (playerSum > houseSum || houseSum > 21) {
        message = "Player wins!";
    } else {
        message = "House wins!";
    }

    messageEl.textContent = message;
    newCardBtn.disabled = true;
    standBtn.disabled = true;
    startBtn.style.display = "inline-block"; // Show the start button again
    isAlive = false;
}

document.getElementById("start-btn").addEventListener("click", startGame);
newCardBtn.addEventListener("click", newCard);
standBtn.addEventListener("click", stand);
