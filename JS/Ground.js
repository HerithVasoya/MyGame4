class Ground {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    display(f) {
        rectMode(CENTER);
        fill(f); //fill comes before rect()
        noStroke();
        rect(this.x,this.y, this.width, this.height);
    }
}