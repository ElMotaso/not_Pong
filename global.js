const gameArea = document.getElementById('pong-game');
const gameOverScreen = document.getElementById('game-over-screen')

let collisionSteps = 10;
let speedIncrement = 0.5;
let precentageIncrease = 2;

let mode = "classic";

let player;
let hunter;
let villain;
let klatscher;
let unknown;
let food;

let balls = [];

let isGameOver;
let score;
let scoreTimer;
let hunterScore;
let villainScore;
let classicHighScore = localStorage.getItem('classicHighScore') || 0;
let chillHighScore = localStorage.getItem('chillHighScore') || 0;
let overballHighScore = localStorage.getItem('overballHighScore') || 0;

function getHighScore() {
    if (isClassic()) {
        return classicHighScore;
    } else if (isChill()) {
        return chillHighScore;
    } else if (isOverball()) {
        return overballHighScore;
    }
}

function setHighScore(newHighScore) {
    if (isClassic()) {
        classicHighScore = newHighScore;
        localStorage.setItem('classicHighScore', newHighScore);
    } else if (isChill()) {
        chillHighScore = newHighScore;
        localStorage.setItem('chillHighScore', newHighScore);
    } else if (isOverball()) {
        overballHighScore = newHighScore;
        localStorage.setItem('overballHighScore', newHighScore);
    }
}


function setMode(newMode) {
    mode = newMode;
}

function isClassic() {
    return mode === "classic";
}

function isChill() {
    return mode === "chill";
}

function isOverball() {
    return mode === "overball";
}


function toggleMute() {
    const music = document.getElementById("background-music");
    const iconGame = document.getElementById("mute-icon-game");
    const iconMenu = document.getElementById("mute-icon-menu");
    const iconModes = document.getElementById("mute-icon-menu");

    music.muted = !music.muted;
    iconGame.textContent = music.muted ? 'volume_off' : 'volume_up';
    iconMenu.textContent = music.muted ? 'volume_off' : 'volume_up';
    iconModes.textContent = music.muted ? 'volume_off' : 'volume_up';
}
