const gameArea = document.getElementById('pong-game');
const gameOverScreen = document.getElementById('game-over-screen')

let collisionSteps = 10;
let speedIncrement = 0.5;
let precentageIncrease = 20;

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
let highScore = localStorage.getItem('highScore') || 0;


