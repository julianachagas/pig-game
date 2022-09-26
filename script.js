'use strict';

const switchPlayer = () => {
  // reset current score
  document.querySelector('.player--active .current-score').textContent = 0;
  // add active class to the next player
  const players = document.querySelectorAll('.player');
  players.forEach(player => {
    player.classList.toggle('player--active');
  });
};

const rollDice = () => {
  const currentScoreElement = document.querySelector(
    '.player--active .current-score'
  );
  let currentScore = +currentScoreElement.textContent;
  // generate random dice roll
  const diceRoll = Math.floor(Math.random() * 6 + 1);
  // display dice image
  const diceImgContainer = document.querySelector('.dice');
  diceImgContainer.classList.remove('hidden');
  diceImgContainer.firstElementChild.src = `img/dice-${diceRoll}.png`;
  // if 1, switch to next player
  if (diceRoll === 1) {
    switchPlayer();
    return;
  }
  // if not, add dice roll to current score
  currentScore += diceRoll;
  // display current score
  currentScoreElement.textContent = currentScore;
};

const disableButtons = () => {
  document.querySelector('.btn--roll').setAttribute('disabled', '');
  document.querySelector('.btn--hold').setAttribute('disabled', '');
};

const holdScore = () => {
  const totalScoreElement = document.querySelector('.player--active .score');
  let totalScore = +totalScoreElement.textContent;
  const currentScore = +document.querySelector('.player--active .current-score')
    .textContent;
  totalScore += currentScore;
  totalScoreElement.textContent = totalScore;
  if (totalScore >= 100) {
    const currentPlayer = document.querySelector('.player--active');
    currentPlayer.classList.add('player--winner');
    currentPlayer.classList.remove('player--active');
    // disable buttons
    disableButtons();
    return;
  }
  switchPlayer();
};

const newGame = () => {
  document.querySelector('.dice').classList.add('hidden');
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => button.removeAttribute('disabled'));
  const players = document.querySelectorAll('.player');
  players.forEach((player, index) => {
    player.classList.remove('player--winner');
    // set all scores to 0
    player.querySelector('.score').textContent = 0;
    player.querySelector('.current-score').textContent = 0;
    // set player 1 as the active player
    if (index === 0) player.classList.add('player--active');
  });
};

// Event Listeners

document.querySelector('.btn--roll').addEventListener('click', rollDice);

document.querySelector('.btn--hold').addEventListener('click', holdScore);

document.querySelector('.btn--new').addEventListener('click', newGame);
