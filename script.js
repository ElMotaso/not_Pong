const ball = document.getElementById('ball');
const paddle1 = document.getElementById('paddle1');
const paddle2 = document.getElementById('paddle2');
const gameArea = document.getElementById('pong-game');
const ballSpeed = 2;
let ballX = gameArea.clientWidth / 2;
let ballY = gameArea.clientHeight / 2;
let paddleSpeed_AI = 2;
let paddleSpeed_Player = 10;
let ballXDirection = ballSpeed;
let ballYDirection = ballSpeed;
let paddle1Y = gameArea.clientHeight / 2;
let paddle2Y = gameArea.clientHeight / 2;
let paddle1Direction = 0;
let isGameOver = false;
let score = 0;

function moveBall() {
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
        gameOver(ballX < 0); // Pass true if player missed the ball
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

function gameOver(playerMissed) {
    isGameOver = true;
    // Create a game over overlay
    const gameOverScreen = document.createElement('div');
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
    gameOverScreen.textContent = playerMissed ? "It's Pong how tf did you lose?" : "How did you make the AI miss?";
    document.body.appendChild(gameOverScreen);

    // Optionally, add a click event listener to restart the game
    gameOverScreen.addEventListener('click', function() {
        document.body.removeChild(gameOverScreen);
        restartGame(); // Function to reset the game state and start over
    });
}

function restartGame() {
    // Reset game state, ball position, and remove game over screen if present
    isGameOver = false;
    ballX = gameArea.clientWidth / 2;
    ballY = gameArea.clientHeight / 2;
    // Reset other game variables as needed and start the ball movement again
    moveBall();
    // You may also need to reset paddle positions and scores as appropriate
}


function movePaddle1() {
    // Move paddle1 based on direction
    if (paddle1Direction !== 0) {
        paddle1Y += paddleSpeed_Player * paddle1Direction;
        paddle1Y = Math.max(Math.min(paddle1Y, gameArea.clientHeight - paddle1.clientHeight), 0);
        paddle1.style.top = paddle1Y + 'px';
    }
    requestAnimationFrame(movePaddle1);
}

document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowUp':
            paddle1Direction = -1;
            break;
        case 'ArrowDown':
            paddle1Direction = 1;
            break;
    }
});

document.addEventListener('keyup', function(event) {
    switch(event.key) {
        case 'ArrowUp':
        case 'ArrowDown':
            paddle1Direction = 0;
            break;
    }
});

// Event listeners for paddle movement
/*document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowUp':
            paddle1Y = Math.max(paddle1Y - paddleSpeed_Player, 0);
            break;
        case 'ArrowDown':
            paddle1Y = Math.min(paddle1Y + paddleSpeed_Player, gameArea.clientHeight - paddle1.clientHeight);
            break;
    }
    paddle1.style.top = paddle1Y + 'px';
});*/

moveBall();
movePaddle1();
