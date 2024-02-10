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