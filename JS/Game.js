class Game {
    constructor() {
      this.playerMoving = false;
      this.jump = true
      this.scale = 0.3;
    }
  
    getState() {
      var gameStateRef = database.ref("gameState");
      gameStateRef.on("value", function(data) {
        gameState = data.val();
      });
    }
    
    update(state) {
      database.ref("/").update({
        gameState: state
      });
    }
  
    async start() {
      if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }

      //adds players
      p1 = createSprite(400, 400, 50, 50);
      p1.addImage("player", playerImg);
      p2 = createSprite(370, 400, 50, 50);
      p2.addImage("player", playerImg);
      p3 = createSprite(739, 400, 50, 50);
      p3.addImage("player", playerImg);
      p4 = createSprite(593, 400, 50, 50);
      p4.addImage("player", playerImg);
      plrs = [p1, p2, p3, p4]
      p1.scale = this.scale;
      p2.scale = this.scale;
      p3.scale = this.scale;
      p4.scale = this.scale;
    }
  
    handleElements() {
      form.hide();
      form.titleImg.position(40, 50);
      form.titleImg.class("gameTitleAfterEffect");
    }
  
    play() {
      this.handleElements();
  
      Player.getPlayersInfo();
  
      if (allPlayers !== undefined) {
        this.showLife();
  
        //index of the array
        var index = 0;

        for (var plr in allPlayers) {
          //add 1 to the index for every loop
          index = index + 1;
  
          //use data form the database to display the cars in x and y direction
          var x = allPlayers[plr].positionX;
          var y = height - allPlayers[plr].positionY;
  
          var currentlife = allPlayers[plr].life;
          var level = allPlayers[plr].level;
          textSize(20);
          text("Level: " + level, 700, 30);
  
          if (currentlife <= 0) {
            gameState = 2
          }
  
          plrs[index - 1].position.x = x;
          plrs[index - 1].position.y = y;
  
          if (index === player.index) {
            stroke(10);
            fill("red");
            ellipse(x - 5, y, 60, 60);
            
  
            if (player.life <= 0) {
              this.playerMoving = false;
            }
  
            // Changing level and spawn position
            if (player.x > 800) {
                level += 1
            }
          }
        }
  
        if (this.playerMoving) {
          player.update();
        }
  
        // handling keyboard events
        this.handlePlayerControls();
  
        if (player.level > 5) {
          gameState = 3;
          player.update();
        }
  
        drawSprites();
      }
    }
  
    showLife() {
      if (player.lives === 3) {
        image(lives3Img, 10, 10, 150, 75);
      } else if (player.lives === 2) {
        image(lives2Img, 10, 10, 150, 75);
      } else if (player.lives === 1) {
        image(lives1Img, 10, 10, 150, 75);
      }
    }
  
    handlePlayerControls() {
      if (player.lives > 0) {
        if (keyIsDown(UP_ARROW) && this.jump) {
          this.playerMoving = true;
          player.positionY += 10;
          player.update();
        }
  
        if (keyIsDown(LEFT_ARROW)) {
          player.positionX -= 5;
          player.update();
        }
  
        if (keyIsDown(RIGHT_ARROW)) {
          player.positionX += 5;
          player.update();
        }
      }
    } 
  
    end() {
      console.log("Game Over");
    }

    congratulate() {
        text("Congratulations for winning </br> Hope you've had fun and thanks for playing", 400, 200); 
    }

    canJump() {
      this.jump = true;
    }

    cannotJump() {
      this.jump = false;
    }
  }
