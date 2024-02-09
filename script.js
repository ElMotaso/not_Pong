



function startNewGame() {
    player = new Ball("player",0, true, true, false, 0, gameArea.clientWidth / 2, gameArea.clientHeight / 2, 0, 0);
    hunter = new Ball("hunter",0, false, false, true, 0, gameArea.clientWidth / 2, gameArea.clientHeight / 2 - 75, 0, 0);
    villain = new Ball("villain",25, false, true, false, 0, gameArea.clientWidth / 2, gameArea.clientHeight / 2 + 75, 0, 0);
    klatscher = new Ball("klatscher",50, true, false, false, 0, gameArea.clientWidth / 2 - 75, gameArea.clientHeight / 2, 2, 0.6);
    unknown = new Ball("unknown",75, true, true, true, 0, gameArea.clientWidth / 2 + 75, gameArea.clientHeight / 2, -2, 0.6);
    food = new Ball("food",0, false, false, false, 0, 100, 100, 0, 0);

    klatscher.resetSize();
    unknown.resetSize();

    isGameOver = false;
    gameOverScreen.style.display = 'none';
    score = 0;
    hunterScore = 0;

    balls = [player, hunter, villain, klatscher, unknown, food];

    setup();
    moveFood();
    clearInterval(scoreTimer);
    startScoreTimer();
    gameLoop();
}

function gameLoop() {
    for (let i = 0; i < collisionSteps; i++) {
        for (const ball of balls) {
            if (!isGameOver) {
                ball.move()
            }
        }
    }
    if (!isGameOver) {
        requestAnimationFrame(gameLoop)
    }
}

function setup() {
    for (const ball of balls) {
        ball.place();
    }
}


function startScoreTimer() {
    scoreTimer = setInterval(function() {
        score++;
        hunterScore++;
        hunter.speed = Math.sqrt(hunterScore)/2;
        villain.speed = Math.sqrt(hunterScore)/2;
        updateScore();
    }, 1000);
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
    let index = Math.floor(Math.random() * messages.length);
    return messages[index];
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
    let index = Math.floor(Math.random() * messages.length);
    return messages[index];
}


function moveFood() {
    let foodElement = document.getElementById(food.id)
    food.xPos = Math.floor(Math.random() * (gameArea.clientWidth - foodElement.clientWidth));
    food.yPos = Math.floor(Math.random() * (gameArea.clientHeight - foodElement.clientHeight));
    food.place();
}

function toggleMute() {
    const music = document.getElementById("background-music");
    const icon = document.getElementById("mute-icon");
    music.muted = !music.muted;
    icon.textContent = music.muted ? 'volume_off' : 'volume_up';
}

document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowUp':
            player.yDirection -= speedIncrement;
            break;
        case 'ArrowDown':
            player.yDirection += speedIncrement;
            break;
        case 'ArrowLeft':
            player.xDirection -= speedIncrement;
            break;
        case 'ArrowRight':
            player.xDirection += speedIncrement;
            break;
    }
});

document.addEventListener('click', function(event) {
    if(isGameOver) {
        startNewGame()
    }
});

startNewGame();
