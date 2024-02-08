const hunter = document.getElementById('hunter');
const player = document.getElementById('player');
const villain = document.getElementById('villain');
const food = document.getElementById('food');
const gameArea = document.getElementById('pong-game');
const gameOverScreen = document.getElementById('game-over-screen')

let hunterSpeed;
let hunterX;
let hunterY;
let hunterXDirection;
let hunterYDirection;


let villainSpeed;
let villainX;
let villainY;
let villainXDirection;
let villainYDirection;

let playerX;
let playerY;
let playerXDirection;
let playerYDirection;

let isGameOver = false;
let score;
let hunterScore;
let highScore = localStorage.getItem('highScore') || 0;
let losingMessageIndex = parseInt(localStorage.getItem('losingMessageIndex'), 10) || 0;
let winningMessageIndex = parseInt(localStorage.getItem('winningMessageIndex'), 10) || 0;
let scoreTimer;

let foodX;
let foodY;

let collisionSteps = 10;
let speedIncrement = 0.5;


function startGame() {
    gameOverScreen.style.display = 'none';
    hunterSpeed = 0;
    hunterX = gameArea.clientWidth / 2;
    hunterY = gameArea.clientHeight / 2 - 75;
    hunterXDirection = 0;
    hunterYDirection = 0;

    villainSpeed = 0;
    villainX = gameArea.clientWidth / 2;
    villainY = gameArea.clientHeight / 2 + 75;
    villainXDirection = 0;
    villainYDirection = 0;

    playerX = gameArea.clientWidth / 2;
    playerY = gameArea.clientHeight / 2;
    playerXDirection = 0;
    playerYDirection = 0;
    isGameOver = false;
    score = 0;
    hunterScore = 0;
    moveFood();
    move();
    startScoreTimer();
}


function move() {
    if (isGameOver) {
        gameOver();
        return;
    }

    for (let i = 0; i < collisionSteps; i++) {
        collisionCheck();
    }

    hunter.style.left = hunterX + 'px';
    hunter.style.top = hunterY + 'px';
    player.style.left = playerX + 'px';
    player.style.top = playerY + 'px';
    villain.style.left = villainX + 'px';
    console.log(2, villainX)
    villain.style.top = villainY + 'px';


    requestAnimationFrame(move);

}


function collisionCheck() {

    // player
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
    const hunterCenterX = hunterX + hunter.clientWidth / 2;
    const hunterCenterY = hunterY + hunter.clientHeight / 2;
    const villainCenterX = villainX + villain.clientWidth / 2;
    const villainCenterY = villainY + villain.clientHeight / 2
    const foodCenterX = foodX + food.clientWidth / 2;
    const foodCenterY = foodY + food.clientHeight / 2;

    let dx = playerCenterX - foodCenterX;
    let dy = playerCenterY - foodCenterY;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance <= (player.clientWidth / 2 + food.clientWidth / 2)) {
        score += 10;
        hunterScore = Math.max(0, hunterScore - 5);
        moveFood();
    }


    dx = playerCenterX - hunterCenterX;
    dy = playerCenterY - hunterCenterY;
    distance = Math.sqrt(dx * dx + dy * dy);

    if (distance <= (player.clientWidth / 2 + hunter.clientWidth / 2)) {
        gameOver();
    } else {
        let moveX = (dx / distance) * hunterSpeed / collisionSteps;
        let moveY = (dy / distance) * hunterSpeed / collisionSteps;

        hunterX += moveX;
        hunterY += moveY;
    }


    dx = foodCenterX - villainCenterX;
    dy = foodCenterY - villainCenterY;
    distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < (villain.clientWidth / 2 + food.clientWidth / 2)) {
        moveFood();
        hunterScore += 5;
    }

    let moveX = (dx / distance) * villainSpeed / collisionSteps;
    let moveY = (dy / distance) * villainSpeed / collisionSteps;

    villainX += moveX;
    villainY += moveY;

}


function startScoreTimer() {
    scoreTimer = setInterval(function() {
        score++;
        hunterScore++;
        hunterSpeed = Math.sqrt(hunterScore)/2; //Math.max(speedIncrement, Math.sqrt(hunterScore)/2);
        villainSpeed = hunterSpeed * 0.8;
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






function moveFood() {
    foodX = Math.floor(Math.random() * (gameArea.clientWidth - 30) + 15);
    foodY = Math.floor(Math.random() * (gameArea.clientHeight - 30) + 15);
    food.style.left = foodX + 'px';
    food.style.top = foodY + 'px';
}


document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowUp':
            playerYDirection -= speedIncrement; //= Math.max(-hunterSpeed - 3, playerYDirection - 1);
            break;
        case 'ArrowDown':
            playerYDirection += speedIncrement; //= Math.min(hunterSpeed + 3, playerYDirection + 1);
            break;
        case 'ArrowLeft':
            playerXDirection -= speedIncrement; //= Math.max(-hunterSpeed - 3, playerXDirection - 1);
            break;
        case 'ArrowRight':
            playerXDirection += speedIncrement; //= Math.min(hunterSpeed + 3, playerXDirection + 1);
            break;
    }
});

document.addEventListener('click', function(event) {
    if(isGameOver) {
        startGame()
    }
});


startGame();
