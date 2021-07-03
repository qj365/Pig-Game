'use strict';

//Selecting elements
console.log(document.querySelector('player--0'));
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

//function
const setScore0 = function (score) {
    score0El.textContent = score;
    current0El.textContent = score;
};

const setScore1 = function (score) {
    score1El.textContent = score;
    current1El.textContent = score;
};

const initGame = function () {
    scores[0] = 0;
    scores[1] = 0;
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    setScore0(0);
    setScore1(0);
    diceEl.classList.add('hidden');
};

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;

    document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    currentScore = 0;
    activePlayer = activePlayer === 1 ? 0 : 1;
    document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--active');
};

initGame();

//Roll dice
btnRoll.addEventListener('click', function () {
    if (playing) {
        //randomDice
        const randomDice = Math.trunc(Math.random() * 6 + 1);
        console.log(randomDice);

        //Display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${randomDice}.png`;

        //check rolled = 1
        if (randomDice !== 1) {
            currentScore += randomDice;
            document.getElementById(`current--${activePlayer}`).textContent =
                currentScore;
        } else {
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function () {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent =
            scores[activePlayer];

        if (scores[activePlayer] >= 100) {
            playing = false;
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--active');
            diceEl.classList.add('hidden');
        } else {
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', function () {
    initGame();
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
});
