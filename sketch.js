var gameState = 0;
var database;
var playerCount = 0;
//creates ground
var ground;
var upperGround;
//creates players, properties and starts game
var form, player;
var allPlayers;
var playerImg;
var plrs, p1, p2, p3, p4;
var game;
var lives1Img, lives2Img, lives3Img;
var hitbox;
var x, y;
//creates obstacles
var rock, rockImg;

function preload() {
  lives1Img = loadImage("./assets/lives.png");
  lives2Img = loadImage("./assets/lives2.png");
  lives3Img = loadImage("./assets/lives3.png");

  playerImg = loadImage("./assets/squareCharacter.png");
  rockImg = loadImage("./assets/rock.png");
}

function setup() {
  createCanvas(800,400);

  database = firebase.database();
  

  ground = new Ground(400, 325, 800, 150);
  upperGround = new Ground(400, 265, 800, 30);
  
  game = new Game();
  game.start();
  
  
  //hitbox = createSprite(x, y - 2, 50, 50);
}

function draw() {
  background(173, 216, 230);  
  drawSprites();
  
  ground.display(rgb(54, 34, 4));
  upperGround.display(rgb(19, 80, 0));
  
  if (gameState === 1) {
    //calls functions to create obstacles
    createRocks();
  }

  if (playerCount === 4) {
    gameState = 1;
  }

  if (gameState === 1) {
    game.play();
  }

  if (gameState === 2) {
    game.end();
  }

  if (gameState === 3) {
    game.congratulate();
  }

  /*hitbox.x = x;
  hitbox.y = y - 2;
  hitbox.visible = false;

  if (hitbox.isTouching(ground)) {
    game.canJump();
  } else {
    game.cannotJump();
  }*/
}

function createRocks() {
  if (frameCount % 100 === 0) {
    rock = createSprite(800, 230, 50, 50);
    rock.addImage("rock", rockImg);
    rock.scale = 0.07;
    
    rock.velocityX = -4;

    if (rock.x < 0) {
      rock.lifetime(-1);
    }

    if(gameState === 2 || gameState === 3) {
      rock.velocityX = 0;
      if (gameState === 3) {
        rock.lifetime(-1);
      }
    }
  }
}