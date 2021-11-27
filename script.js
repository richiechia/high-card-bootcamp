// Please implement exercise logic here
// // Set timeout pre-class
// const wowParagraph = document.createElement('p');
// wowParagraph.innerText = 'Click here!';
// document.body.appendChild(wowParagraph);

// const doLater = () => {
//   wowParagraph.innerText = `cool! ${Math.random()}`;
// };

// const myNewMain = (event) => {
//   console.log('Hey wow my new function!');
//   setTimeout(doLater, 1000);
// };

// wowParagraph.addEventListener('click', myNewMain);

// console.log('setTimeout! - 1');
// const delayInMilliseconds = 1000; // this is one second
// console.log('setTimeout! - 2');
// const doLater1 = () => {
//   console.log('setTimeout! - 3');
// };
// setTimeout(doLater1, delayInMilliseconds);
// console.log('setTimeout! - 4');

// console.log('setTimeout! - 5');

// ////////////////// Helper Functions ////////////////////////

const getRandomIndex = (max) => Math.floor(Math.random() * max);

// Shuffle the cards
const shuffleDeck = (cardDeck) => {
  // Loop over card deck
  let currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    const randomIndex = getRandomIndex(cardDeck.length);
    // Random card and Current Card
    const randomCard = cardDeck[randomIndex];
    const currentCard = cardDeck[currentIndex];
    // Swap positions with current position with random position;
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex += 1;
  }
  return cardDeck;
};
// "♥️", "♦️", "♣️", "♠️"
const generateDeck = () => {
  const deck = []; // Empty array for deck
  const suits = ['spade', 'heart', 'clubs', 'diamonds']; // 4 suits
  const suitSymbol = ['♠️', '♥️', '♣️', '♦️'];
  const ranks = [...Array(13).keys()]; // Generates 13 numbers, from 0 to 12
  const name = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'];// ;
  const displayName = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  for (let i = 0; i < suits.length; i += 1) {
    const suit1 = suits[i]; // Allow the suit to go through the loop
    const suitSymbol1 = suitSymbol[i];
    let color1;
    if (suitSymbol1 == suitSymbol[0] || suitSymbol1 == suitSymbol[2]) {
      color1 = 'black';
    } else {
      color1 = 'red';
    }

    let j = 0;
    while (j < ranks.length) {
      const element = {}; // Initialise / Reset element as empty
      const rank1 = ranks[j] + 1;
      const name1 = name[j];
      const displayName1 = displayName[j];

      element.suitSymbol = suitSymbol1; // Assign element with suit symbol
      element.suit = suit1; // Assign element with suit
      element.name = name1; // Assign element with name
      element.displayName = displayName1; // Assign display name
      element.color = color1; // Assign color
      element.rank = rank1; // Assign element with rank

      deck.push(element); // Put element inside array

      j += 1;
    }
  }
  // console.log(`No of cards is: ${noOfCards}`);
  console.log(deck);
  return deck;
};

// Create a helper function for output to abstract complexity of
// DOM manipulation away from game logic
const output = (message) => {
  gameInfo.innerText = message;
};

/// /////////////////////////// Global callbacks /////////////////////////////////////
const deck = shuffleDeck(generateDeck());

// Player 1 starts
let playersTurn = 1;

// Use let for player1Card object
let player1Card;

// Create 2 buttons
const player1Button = document.createElement('button');

const player2Button = document.createElement('button');

// Create game info div as global value
// fill game info div with starting instructions
const gameInfo = document.createElement('div');

// List of cards for each player
const playerCards = [];
let cardsDrawn = 0;
let canClick = true;

/// ///////////////// Player Action Callbacks ////////////////

const player1Click = () => {
  if (playersTurn === 1 && canClick === true) {
    canClick = false;
    setTimeout(() => { player1Card = deck.pop();
      // Push rank card into dictionary
      playerCards[0].rank.push(player1Card.rank);
      const cardElement = createCard(player1Card);
      // Clear in case not first round
      // cardContainer1.innerHTML = '';
      // Append the card element to card container
      cardContainer1.appendChild(cardElement);

      // Switch to player 2
      playersTurn = 2;
      canClick = true;
    }, 2000);
  }
};

const player2Click = () => {
  if (playersTurn === 2 && canClick === true) {
    canClick = false;
    setTimeout(() => {
      const player2Card = deck.pop();
      // Push the card into the list of dictionary
      playerCards[1].rank.push(player2Card.rank);
      // Creating the dom element
      const cardElement = createCard(player2Card);
      cardContainer2.appendChild(cardElement);
      playersTurn = 1;
      cardsDrawn += 1;

      // 1st game condition. Check if only draw 1 card
      if (cardsDrawn === 1) {
        if (player1Card.rank > player2Card.rank) {
          output('player 1 wins');
        } else if (player1Card.rank < player2Card.rank) {
          output('player 2 wins');
        } else {
          output('tie');
        }
      }
      // 2nd game condition multiple card
      if (cardsDrawn >= 2) {
        for (let i = 0; i < playerCards.length; i += 1) {
          playerCards[i].highestDiff = highestDifference(playerCards[i].rank);
        }
        if (playerCards[0].highestDiff > playerCards[1].highestDiff) {
          output('player 1 wins');
        } else if (playerCards[0].highestDiff < playerCards[1].highestDiff) {
          output('player 2 wins');
        } else {
          output('tie');
        }
      }
      canClick = true;
      console.log(playerCards);
      console.log(Math.min(...playerCards[0].rank));
    }, 2000);
  }
};

/// /////// Translating HTML to JS DOM Manipulation /////////
// const cardInfo = {
//   suitSymbol: '♦️',
//   suit: 'diamond',
//   name: 'queen',
//   displayName: 'Q',
//   color: 'red',
//   rank: 12,
// };

const playerHand = (playerNumber) => {
  const cardElements = {
    player: `Player ${playerNumber}`,
    cardType: [],
    rank: [],
  };
  playerCards.push(cardElements);
};

const createCard = (cardInfo) => {
  const suit = document.createElement('div');
  suit.classList.add(cardInfo.suit, cardInfo.color);
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement('div');
  name.classList.add('name', cardInfo.color);
  name.innerText = cardInfo.name;

  const card = document.createElement('div');
  card.classList.add('card');

  card.appendChild(name);
  card.appendChild(suit);

  card.id = `Player${playersTurn}_${cardsDrawn + 1}`;

  return card;
};

const highestDifference = (playerCardRank) => {
  // playerCardRank is the list e.g. playerCard[0].rank
  for (let i = 0; i < playerCards.length; i += 1) {
    const minimumValue = Math.min(...playerCardRank);
    const maximumValue = Math.max(...playerCardRank);
    var highestDifference = maximumValue - minimumValue;
  }
  return highestDifference;
};

/// /////////////////// Game Initialisation ////////////////////
let cardContainer1;
let cardContainer2;
let player1Container;
let player2Container;

const initGame = () => {
  player1Container = document.createElement('div');
  player1Container.classList.add('player-1');
  document.body.appendChild(player1Container);

  player2Container = document.createElement('div');
  player2Container.classList.add('player-2');
  document.body.appendChild(player2Container);

  cardContainer1 = document.createElement('div');
  cardContainer1.classList.add('card-container');
  player1Container.appendChild(cardContainer1);

  cardContainer2 = document.createElement('div');
  cardContainer2.classList.add('card-container');
  player2Container.appendChild(cardContainer2);

  player1Button.innerHTML = 'Player 1 Draw';
  player1Container.appendChild(player1Button);

  player2Button.innerHTML = 'Player 2 Draw';
  player2Container.appendChild(player2Button);

  if (playerCards.length === 0) {
    playerHand(1);
    playerHand(2);
  }

  console.log(playerCards);

  player1Button.addEventListener('click', player1Click);
  player2Button.addEventListener('click', player2Click);

  gameInfo.innerText = 'Its player 1 turn. Click to draw a card!';
  document.body.appendChild(gameInfo);
};

initGame();
