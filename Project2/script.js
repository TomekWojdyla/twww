'use strict';

//Selecting DOM elements from HTML:
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const score0Element = document.getElementById('totalscore--0');
const score1Element = document.getElementById('totalscore--1');
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');
const player0NameElement = document.getElementById('name--0');
const player1NameElement = document.getElementById('name--1');

const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnManual = document.querySelector('.btn--manual');

const manual = document.querySelector('.manual');
const overlay = document.querySelector('.overlay');
const btnCloseManual = document.querySelector('.close--manual');

//Variables of game:
let currentScore; //Keeping the value of sum of dice rolls for current player
let activePlayer; //Keeping information which player is curently active: 0 or 1
let totalScores; //Sum of total scores for both players
let playing; //Status of the game - changing upon winning

//FUNCTIONS OF THE GAME

//Game initialization function - starting conditions
const init = function () {
  //Setting the interface appearence
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;
  player0NameElement.textContent = 'Player 1';
  player1NameElement.textContent = 'Player 2';
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  player0Element.classList.add('player--active');
  player1Element.classList.remove('player--active');
  diceElement.classList.add('hidden'); //Hiding dice view in start view

  //Setting the game variables
  playing = true;
  activePlayer = 0;
  currentScore = 0;
  totalScores = [0, 0];
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //Button only works if game is running; if someone win, button is not responsive
    //1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display the dice png
    diceElement.classList.remove('hidden');
    diceElement.src = `./img/dice-${dice}.png`;

    //3. Check for rolled no.1
    if (dice !== 1) {
      //Add dice no. to current score and keep player
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Loose score and switch to next player
      switchPlayer();
    }
  }
});

//Hold button functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    //Button only works if game is running; if someone win, button is not responsive
    //1. Add current score to active player's total score
    totalScores[activePlayer] += currentScore;
    document.getElementById(`totalscore--${activePlayer}`).textContent =
      totalScores[activePlayer];
    //2. Check if player's total score is under 100
    if (totalScores[activePlayer] >= 100) {
      //Finish the game
      playing = false; //Changing status of game - single game ends.
      diceElement.classList.add('hidden'); //Hidding dice img
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner'); //Set winner player CSS class
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active'); //Remove active player CSS class
      document.getElementById(`name--${activePlayer}`).textContent = `P${
        activePlayer + 1
      }: WINNER!`; //Display winner note
    } else {
      //Switch to next player
      switchPlayer();
    }
  }
});

//Switching player at the end of round
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0; //Reset of player's current score to 0
  currentScore = 0; //Reset of current score for any player
  activePlayer = activePlayer === 0 ? 1 : 0; //Changing player
  player0Element.classList.toggle('player--active'); //Shifting active player class
  player1Element.classList.toggle('player--active'); //Shifting active player class
};

//New Game button functionality
btnNew.addEventListener('click', init);

//Manual button functionality - display instructions
btnManual.addEventListener('click', function () {
  manual.classList.remove('hidden');
  overlay.classList.remove('hidden');
  document.getElementById('manualText').innerHTML = `
      <button class="close--manual" onclick="closeManual()">&times;</button>
      <h2 class="name">PIG GAME MANUAL</h2>
      <p class="current-score">1. Player 1 starts the game and rolls the dice.</p>
      <p class="current-score">2. If the number on the dice is different than '1', the number is added to current score.</p>
      <p class="current-score">3. Player can continue rolling the dice or 'Hold' and save current score to his total score.</p>
      <p class="current-score">4. After 'Holding' the score Player 2 takes over the game and starts his turn from current score equal to '0'.</p>
      <p class="current-score">5. If the number on the rolled dice equals '1', player looses his current score and turn.</p>
      <p class="current-score">6. Game finish when first player will reach the total score of 100 points.</p>
      <p class="current-score">7. At any point of the game players can press 'New game' button to start over.</p>
      <h2 class = "name">ENJOY! 😎</h2>
      <img src='./gameLogic/pig-game-flowchart.png' width='100%'></img>`;
});

//Manual modal window close functionality
const closeManual = function () {
  //Hiding Manual modal window by clicking in 'X' icon in modal window
  manual.classList.add('hidden');
  overlay.classList.add('hidden');
  document.getElementById('manualText').innerHTML = '';
};
overlay.addEventListener('click', closeManual); //Hiding Manual modal window by clicking in overlay area

//INITIALIZATION OF THE GAME
init();
