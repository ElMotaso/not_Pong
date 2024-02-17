function startClassic() {
    modesToGame();
    setMode('classic');
    start();
}
function startChill() {
    modesToGame();
    setMode('chill');
    start();
}
function startOverball() {
    modesToGame();
    setMode('overball');
    start();
}

function start(mode) {
    const menu = document.getElementById('menu');
    const game = document.getElementById('pong-game');
    menu.style.display = 'none';
    game.style.display = 'flex';
    startNewGame(mode);
}

function modesToGame() {
    const modes = document.getElementById('modes-menu');
    const game = document.getElementById('pong-game');
    modes.style.display = 'none';
    game.style.display = 'flex';
}

function menuToModes() {
    const menu = document.getElementById('menu');
    const modes = document.getElementById('modes-menu');
    menu.style.display = 'none';
    modes.style.display = 'flex';
}

function gameToMenu() {
    const menu = document.getElementById('menu');
    const game = document.getElementById('pong-game');
    menu.style.display = 'flex';
    game.style.display = 'none';
}
function modesToMenu() {
    const menu = document.getElementById('menu');
    const modes = document.getElementById('modes-menu');
    menu.style.display = 'flex';
    modes.style.display = 'none';
}

function menuToStats() {
    const menu = document.getElementById('menu');
    const stats = document.getElementById('stats-menu');

    const highScoreClassic = document.getElementById(
        'highscoreClassic');
    const highScoreChill = document.getElementById('highscoreChill');
    const highScoreOverball = document.getElementById(
        'highscoreOverball');
    highScoreClassic.innerText = 'Classic: ' + classicHighScore;
    highScoreChill.innerText = 'Chill: ' + chillHighScore;
    highScoreOverball.innerText = 'Overball: ' + overballHighScore;
    menu.style.display = 'none';
    stats.style.display = 'flex';
}

function statsToMenu() {
    const menu = document.getElementById('menu');
    const stats = document.getElementById('stats-menu');
    menu.style.display = 'flex';
    stats.style.display = 'none';
}