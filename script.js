const ball = document.getElementById('ball');
const player = document.getElementById('player');
const gameArea = document.getElementById('pong-game');
const gameOverScreen = document.createElement('div');

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
let scoreTimer;

let collisionSteps = 10;

// Create the game over screen
gameOverScreen.id = 'game-over-screen';
gameOverScreen.style.position = 'absolute';
gameOverScreen.style.top = '0';
gameOverScreen.style.left = '0';
gameOverScreen.style.width = '100%';
gameOverScreen.style.height = '100%';
gameOverScreen.style.backgroundColor = 'rgba(0, 0, 0, 0.75)';
gameOverScreen.style.color = 'white';
gameOverScreen.style.display = 'flex';
gameOverScreen.style.justifyContent = 'center';
gameOverScreen.style.alignItems = 'center';
gameOverScreen.style.fontSize = '20px';
gameOverScreen.style.display = 'none';
document.body.appendChild(gameOverScreen);


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

    let dx = playerX - ballX;
    let dy = playerY - ballY;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 3) {

        let moveX = (dx / distance) * ballSpeed / collisionSteps;
        let moveY = (dy / distance) * ballSpeed /collisionSteps;

        ballX = Math.max(0, Math.min(gameArea.clientWidth - ball.clientWidth, ballX + moveX));
        ballY = Math.max(0, Math.min(gameArea.clientHeight - ball.clientHeight, ballY + moveY));


    }
    else {
        gameOver();
    }


}

function movePlayer() {
    if (isGameOver) {
        gameOver();
        return;
    }





    playerX += playerXDirection;
    playerY += playerYDirection;

    if (playerY <= 0 || playerY >= gameArea.clientHeight - player.clientHeight) {
        playerYDirection *= -1;
    }
    if (playerX <= 0 || playerX >= gameArea.clientWidth - player.clientWidth) {
        playerXDirection *= -1;
    }

    // Update player position
    player.style.left = playerX + 'px';
    player.style.top = playerY + 'px';

    requestAnimationFrame(movePlayer);
}
/*function moveBall() {
    if (isGameOver) {
        return; // Stop the ball movement when the game is over
    }

    ballX += ballXDirection;
    ballY += ballYDirection;

    // Collision with top or bottom
    if (ballY <= 0 || ballY >= gameArea.clientHeight - ball.clientHeight) {
        ballYDirection *= -1;
    }

    let hitPaddle1 = ballX <= (paddle1.clientWidth + paddle1.offsetLeft) &&
        ballY + ball.clientHeight >= paddle1.offsetTop &&
        ballY <= (paddle1.offsetTop + paddle1.clientHeight);

    let hitPaddle2 = ballX + ball.clientWidth >= paddle2.offsetLeft &&
        ballY + ball.clientHeight >= paddle2.offsetTop &&
        ballY <= (paddle2.offsetTop + paddle2.clientHeight);

    if (hitPaddle1 || hitPaddle2) {
        ballXDirection *= -1; // Reverse the ball's horizontal direction
    } else if (ballX < 0 || ballX > gameArea.clientWidth - ball.clientWidth) {
        // If the ball passes beyond the game area without hitting a paddle
        gameOver(ballX < 0); // Pass true if ball missed the ball
        return; // Exit the function to stop the game
    }

    // Update ball position
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';

    // Simple AI for paddle2
    if (paddle2Y + paddle2.clientHeight / 2 < ballY) {
        paddle2Y += paddleSpeed_AI;
    } else {
        paddle2Y -= paddleSpeed_AI;
    }

    paddle2.style.top = paddle2Y + 'px';


    requestAnimationFrame(moveBall);
}
*/

function startScoreTimer() {
    scoreTimer = setInterval(function() {
        score++;
        ballSpeed = Math.sqrt(score) / 2;
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
    gameOverScreen.textContent = "Man you suck. Score: " + score;
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
    move();
    startScoreTimer();
}


function moveBallTowardsPlayer() {
    const dx = playerX - ballX;
    const dy = playerY - ballY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 5) {
        const moveX = (dx / distance) * ballSpeed;
        const moveY = (dy / distance) * ballSpeed;

        ballX = Math.max(0, Math.min(gameArea.clientWidth - ball.clientWidth, ballX + moveX));
        ballY = Math.max(0, Math.min(gameArea.clientHeight - ball.clientHeight, ballY + moveY));

        ball.style.left = ballX + 'px';
        ball.style.top = ballY + 'px';
    }
    else {
        gameOver();
    }

    requestAnimationFrame(moveBallTowardsPlayer);
}



document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowUp':
            playerYDirection -= 1; //= Math.max(-ballSpeed - 3, playerYDirection - 1);
            break;
        case 'ArrowDown':
            playerYDirection += 1; //= Math.min(ballSpeed + 3, playerYDirection + 1);
            break;
        case 'ArrowLeft':
            playerXDirection -= 1; //= Math.max(-ballSpeed - 3, playerXDirection - 1);
            break;
        case 'ArrowRight':
            playerXDirection += 1; //= Math.min(ballSpeed + 3, playerXDirection + 1);
            break;
    }
});

document.addEventListener('click', function(event) {
    if(isGameOver) {
        restartGame()
    }
});

move();
startScoreTimer();
