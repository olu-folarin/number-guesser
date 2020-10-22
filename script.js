// 3 guesses total
// must guess between two extremes
// notify the player of number of guesses left
// give d right answer if the guess is wrong
// give the option to restart

// game values
let min = 1, 
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// ui elements
const game = document.getElementById('game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// assign min and max ui
minNum.textContent = min;
maxNum.textContent = max;


// play again event listener
game.addEventListener('mousedown', function(e) {

  // reload the page using the window object
  if(e.target.className === 'play-again') {
    window.location.reload();
  }
})

//listen for guesses
guessBtn.addEventListener('click', function() {
  let guess = parseInt(guessInput.value);//to turn it to a number
  // input validation
  if(isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  } 
  // if won
  if(guess === winningNum) {
    gameOver(true, `${winningNum} is correct, Yo win!`);
  } else {
    // wrong number
    guessesLeft -= 1;
    // see if any guesses are left
    if(guessesLeft === 0) {
      gameOver(false, `Game over, you lost. The correct number was 
      ${winningNum}`)
    } else {
      //game goes on - wrong answer
      // change the border color
      guessInput.style.borderColor = 'red';
      
      // clear the input field
      guessInput.value = '';
      
      // let user know it's the wrong number
      setMessage(`${guess} is wrong. ${guessesLeft} guesses left.`, 'red');
    }
  }
});

// optimize the code
function gameOver(won, msg) {
  let color;
  won === true? color = 'green' : 'red';
  // disable input
  guessInput.disabled = true;
  // set font color
  message.style.color = color;
  // green border for won
  guessInput.style.borderColor = color;
  // let user know they won
  setMessage(msg);

  // play again
  guessBtn.value = 'Play Again';
  // append a class to it
  guessBtn.className += 'play-again';
}


// get winning number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max-min+1) + min);
}

// set message handler
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
