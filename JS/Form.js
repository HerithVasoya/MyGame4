class Form {
    constructor() {
        this.input = createInput("").attribute("placeholder", "Enter your username");
        this.playButton = createButton("Play");
        this.titleImg = createImg("./assets/title.png", "game title");
        this.reset = createButton('Reset');
        this.greeting = createElement('h2');
    }

    setElementsPosition() {
        this.titleImg.position(20, 10);
        this.input.position(width / 2 - 110, height / 2 - 80);
        this.playButton.position(width / 2 - 100, height / 2 - 20);
    }

    setElementsStyle() {
        this.titleImg.class("gameTitle");
        this.input.class("customInput");
        this.playButton.class("customButton");
    }
    
    hide() {
        this.playButton.hide();
        this.input.hide();
        this.greeting.hide()
    }
    
    handleMousePressed() {
        this.playButton.mousePressed(() => {
            this.input.hide();
            this.playButton.hide();
            this.titleImg.hide();
            playerCount += 1;
            player.name = this.input.value();
            player.index = playerCount;
            player.addPlayer();
            console.log(playerCount)
            player.updateCount(playerCount);
            this.greeting.html("Waiting for more players to join...");
            this.greeting.position(200, 150);
        });

        this.reset.mousePressed(() => {
              database.ref("/").set({
                playerCount: 0,
                gameState: 0,
                players: {},
              });
              window.location.reload();
            });
    }

    display() {
        this.setElementsPosition();
        this.setElementsStyle();
        this.handleMousePressed();

        this.reset.mousePressed(()=>{
            player.updateCount(0);
            game.update(0);
        });
    }
    
}