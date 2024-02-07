const ball = document.getElementById('ball');
const player = document.getElementById('player');
const food = document.getElementById('food');
const gameArea = document.getElementById('pong-game');
const gameOverScreen = document.getElementById('game-over-screen')

let ballSpeed = 0;
let ballX = gameArea.clientWidth / 2;
let ballY = gameArea.clientHeight / 2 - 50;
let ballXDirection = 0;
let ballYDirection = 0;

let playerSpeed = 3;
let playerX = gameArea.clientWidth / 2;
let playerY = gameArea.clientHeight / 2 + 50;
let playerXDirection = 0;
let playerYDirection = 0;

let isGameOver = false;
let score = 0;
let ballScore = 0;
let highScore = localStorage.getItem('highScore') || 0;
let losingMessageIndex = parseInt(localStorage.getItem('losingMessageIndex'), 10) || 0;
let winningMessageIndex = parseInt(localStorage.getItem('winningMessageIndex'), 10) || 0;
let scoreTimer;

let foodX
let foodY

let collisionSteps = 10;
let speedIncrement = 0.5;


function startGame() {
    startScoreTimer();
    moveFood();
}
function move() {
    if (isGameOver) {
        gameOver();
        return;
    }

    for (let i = 0; i < collisionSteps; i++) {
        collisionCheck();
    }

    // Update player position
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';
    player.style.left = playerX + 'px';
    player.style.top = playerY + 'px';


    requestAnimationFrame(move);

}


function collisionCheck() {

    playerX += playerXDirection / collisionSteps;
    playerY += playerYDirection / collisionSteps;

    if (playerY <= 0 || playerY >= gameArea.clientHeight - player.clientHeight) {
        playerYDirection *= -1;
    }
    if (playerX <= 0 || playerX >= gameArea.clientWidth - player.clientWidth) {
        playerXDirection *= -1;
    }

    const playerCenterX = playerX + player.clientWidth / 2;
    const playerCenterY = playerY + player.clientHeight / 2;
    const foodCenterX = foodX + food.clientWidth / 2;
    const foodCenterY = foodY + food.clientHeight / 2;

    let dx = playerCenterX - foodCenterX;
    let dy = playerCenterY - foodCenterY;
    let distance = Math.sqrt(dx * dx + dy * dy);

    // Now using radii for circular collision detection
    if (distance < (player.clientWidth / 2 + food.clientWidth / 2)) {
        score += 10;
        ballScore = Math.max(0, ballScore - 5);
        moveFood();
    }

    dx = playerCenterX - (ballX + ball.clientWidth / 2);
    dy = playerCenterY - (ballY + ball.clientHeight / 2);
    distance = Math.sqrt(dx * dx + dy * dy);

    if (distance <= (player.clientWidth / 2 + ball.clientWidth / 2)) {
        gameOver();
    } else {
        let moveX = (dx / distance) * ballSpeed / collisionSteps;
        let moveY = (dy / distance) * ballSpeed / collisionSteps;

        ballX += moveX;
        ballY += moveY;
    }


}


function startScoreTimer() {
    scoreTimer = setInterval(function() {
        score++;
        ballScore++;
        ballSpeed = Math.sqrt(ballScore)/2; //Math.max(speedIncrement, Math.sqrt(ballScore)/2);
        updateScore();
    }, 1000); // Increase score every second
}

function updateScore() {
    document.getElementById('score').innerText = 'Score: ' + score;
}

function stopScoreTimer() {
    clearInterval(scoreTimer);
}

function gameOver() {
    isGameOver = true;
    stopScoreTimer();
    gameOverScreen.style.display = 'flex'; // Show the game over screen
    if(score < highScore){
        gameOverScreen.innerHTML = losingMessage() + "<br>Score: " + score + "<br>" +
            "Highscore: " + highScore;
    } else {
        gameOverScreen.innerHTML = winningMessage() + "<br>New highscore: " + score;
        highScore = score;
        localStorage.setItem('highScore', highScore);
    }

}

function losingMessage() {
    const messages = [
        "Better luck next time!",
        "So close.",
        "I'm sure you'll get it.",
        "That could have been better.",
        "That attempt didn't quite hit the mark",
        "At least you tried.",
        "Have you ever played this game before?",
        "Maybe this game is a tad too hard for you.",
        "Did you understand the rules of this game?",
        "Sometimes practice won't make perfect.",
        "Why even play at this point?",
        "My grandma has a higher score."
    ]
    //let index = Math.floor(Math.random() * messages.length);
    let message = messages[losingMessageIndex];

    // Increment the index for next time
    losingMessageIndex++;

    // Reset the index if it exceeds the number of messages
    if (losingMessageIndex >= messages.length) {
        losingMessageIndex = 0;
    }

    // Update the index in localStorage for persistence
    localStorage.setItem('losingMessageIndex', losingMessageIndex);

    // Return the selected message
    return message;
}

function winningMessage() {
    const messages = [
        "Great start!",
        "There were a few close calls, but you did it!",
        "Living life to the fullest.",
        "Does this make you happy?",
        "You should go outside more often.",
        "Don't you have any hobbies?",
        "Sunlight's free, ever thought of trying it?",
        "Ever wonder what productivity feels like?",
        "What are your friends doing tonight?"
    ]
    //let index = Math.floor(Math.random() * messages.length);
    let message = messages[winningMessageIndex];

    // Increment the index for next time
    winningMessageIndex++;

    // Reset the index if it exceeds the number of messages
    if (winningMessageIndex >= messages.length) {
        winningMessageIndex = 0;
    }

    // Update the index in localStorage for persistence
    localStorage.setItem('losingMessageIndex', winningMessageIndex);

    // Return the selected message
    return message;
}


function restartGame() {
    gameOverScreen.style.display = 'none';
    ballSpeed = 0;
    ballX = gameArea.clientWidth / 2;
    ballY = gameArea.clientHeight / 2 - 50;
    ballXDirection = 0;
    ballYDirection = 0;

    playerSpeed = 3;
    playerX = gameArea.clientWidth / 2;
    playerY = gameArea.clientHeight / 2 + 50;
    playerXDirection = 0;
    playerYDirection = 0;
    isGameOver = false;
    score = 0;
    ballScore = 0;
    move();
    startGame();
}



function moveFood() {
    foodX = Math.floor(Math.random() * (gameArea.clientWidth - 30) + 15);
    foodY = Math.floor(Math.random() * (gameArea.clientHeight - 30) + 15);
    food.style.left = foodX + 'px';
    food.style.top = foodY + 'px';
}



document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowUp':
            playerYDirection -= speedIncrement; //= Math.max(-ballSpeed - 3, playerYDirection - 1);
            break;
        case 'ArrowDown':
            playerYDirection += speedIncrement; //= Math.min(ballSpeed + 3, playerYDirection + 1);
            break;
        case 'ArrowLeft':
            playerXDirection -= speedIncrement; //= Math.max(-ballSpeed - 3, playerXDirection - 1);
            break;
        case 'ArrowRight':
            playerXDirection += speedIncrement; //= Math.min(ballSpeed + 3, playerXDirection + 1);
            break;
    }
});

document.addEventListener('click', function(event) {
    if(isGameOver) {
        restartGame()
    }
});

move();
startGame()
