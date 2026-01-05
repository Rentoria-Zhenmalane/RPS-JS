

// Why create function in script element? Because script element runs when the page is loaded
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

//shortcut to fix the error of null value
//Loads the score from localStorage through getItem.
//convert it back into an object.
//Keep the object outside function/scope to update the score from last time.
//we're using objects because these 3 are related to each other.

/*
if (!score) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };
}
 
-standard syntax. 
-to fix error of null value.
*/

updateScoreElement(); //Updates score on page load.


function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = '';

  if (playerMove === 'Scissors') {
    if (computerMove === 'Rock') {
      result = 'You lose.';
    } else if (computerMove === 'Paper') {
      result = 'You win';
    } else if (computerMove === 'Scissors') {
      result = 'It\'s a tie';
    }

  } else if (playerMove === 'Paper') {
    if (computerMove === 'Rock') {
      result = 'You win';
    } else if (computerMove === 'Paper') {
      result = 'It\'s a tie';
    } else if (computerMove === 'Scissors') {
      result = 'You lose';
    }

  } else if (playerMove === 'Rock') {
    if (computerMove === 'Rock') {
      result = 'It\'s a tie';
    } else if (computerMove === 'Paper') {
      result = 'You lose';
    } else if (computerMove === 'Scissors') {
      result = 'You win';
    }
  }

  if (result === 'You win') {
    score.wins += 1;
  } else if (result === 'You lose') {
    score.losses += 1;
  } else if (result === 'It\'s a tie') {
    score.ties += 1;
  }
  //updates the score

  localStorage.setItem('score', JSON.stringify(score));
  //After updating the score, save it to localStorage(only supports string). So you have to convert it into JSON string.
  //first string is called the NAME('message'), the second is the VALUE('hello')

  updateScoreElement(); //Updates score after each round

  document.querySelector('.js-result')
    .innerHTML = result;

  document.querySelector('.js-move')
    .innerHTML = `YOU: <img src="images/${playerMove}-emoji.png" class="move-icon"> COMPUTER:<img
        src="images/${computerMove}-emoji.png" class="move-icon">`;

}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}


function pickComputerMove() {
  const randomNumber = Math.random(); // Generates random number from 0-1

  let computerMove = ''; //how do we access computerMove outside a function? The answer is to use return statement

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'Rock'
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'Paper'
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'Scissors'
  }
  return computerMove;

  //return 'rock'; // returning a value from a function
  //return; // will return undeifned. However, this will not return anything because we already have a return above. Only the first return will run.
  //console.log('after');

  // Variables that can be accessed anywhere is called Global Variables

  //Scopes ( {} ) help us avoid naming conflicts.  Whatever variables exist inside the scope only exists inside the scope. -->


  //Javascript is case sensitive. Rock is different from rock. Make sure to stay consistent with your naming conventions.


  //7:36:33
}

function handleClick(button, playerMove) {
  playGame(playerMove);

  button.classList.add('clicked');

  setTimeout(() => {
    button.classList.remove('clicked');
  }, 100);


}