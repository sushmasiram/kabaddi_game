var database;

var form;
var game, gameState = 0;
var allPlayers, player, playerCount = 0;

var player1_sprite, player1_animation;
var player2_sprite, player2_animation;
var playerSprites = [];

var player1_score = 0, player2_score = 0;
var player1_name = "", player2_name = "";
var player1_position, player2_position;

function preload()
{
  player1_animation = loadAnimation("assests/player1a.png", "assests/player1b.png", "assests/player1a.png");
  player2_animation = loadAnimation("assests/player2a.png", "assests/player2b.png", "assests/player2a.png");
}

function setup()
{
  createCanvas(600, 600);

  database = firebase.database();

  Form.isReset = false;

  game = new Game();
  game.getState();
  game.join();

  textSize(20);
}

function draw()
{
  background("#004225");

  game.getState();

  drawLines();
  drawSprites();

  fill("white");
  strokeWeight(1);
  stroke("white");

  if(playerCount === 2 && gameState === 0)
  {
    gameState = 1;
    game.update(gameState);
  }

  if(gameState === 1)
  {
    game.start();
  }

  if(gameState === 2)
  {
    text("RED RIDE", 270, 250);
    game.redPlay();
  }

  if(gameState === 3)
  {
    text("YELLOW RIDE", 250, 250);
    game.yellowPlay();
  }

  if(gameState === 4)
  {
    text("RED WON", 270, 250);
  }

  if(gameState === 5)
  {
    text("RED LOST", 270, 250);
  }

  if(gameState === 6)
  {
    text("YELLOW WON", 250, 250);
  }

  if(gameState === 7)
  {
    text("YELLOW LOST", 250, 250);
  }

  if(Form.isReset || gameState > 3)
  {
    strokeWeight(0);
    text("Click on Reset and reload the page to play again !", 100, 150);
  }

  strokeWeight(1);
  if(player.name === player1_name && player.name !== "")
  {
    stroke("#F3D3A5");
    fill("#F3D3A5");
  }
  else
  {
    stroke("white");
    fill("white");
  }
  text("RED : " + player1_score, 170, 25);
  text(player1_name, 170, 60);

  if(player.name === player2_name && player.name !== "")
  {
    stroke("#F3D3A5");
    fill("#F3D3A5");
  }
  else
  {
    stroke("white");
    fill("white");
  }
  text("YELLOW : " + player2_score, 360, 25);
  text(player2_name, 360, 60);
}

function drawLines()
{
  strokeWeight(4);
  for(var i = 0; i <= height; i = i + 20)
  {
    stroke("black");
    line (width/2, i, width/2, i + 10);

    stroke("#e1ad01");
    line (100, i, 100, i + 10);

    stroke("red");
    line (width - 100, i, width - 100, i + 10);
  }
}