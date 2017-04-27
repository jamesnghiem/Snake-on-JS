var sneky;
var foodie;
var movementVar = 10;

function setup() {
    frameRate(20);
    createCanvas(850, 850);
    // Initiate Snake + food //
    sneky = new snake();
    foodie = new snakeSnacks();
}

function draw() {
    background('#222222');
    sneky.update();
    sneky.appear();
    sneky.death();
    nomnomnom(sneky, foodie);
    fill('#ff2d35');
    rect(foodie.x, foodie.y, 10, 10);
}

function nomnomnom(snake, food) {
    if (snake.xPos[0] === food.x && snake.yPos[0] === food.y) {
        food.delete();
        snake.powerup();
        print(snake.xPos, snake.yPos);
    }
}

/* Snake Object */
function snake() {
    // Position of snake head //
    this.xPos = [10];
    this.yPos = [10];
    this.xMove = 10;
    this.yMove = 0;

    // Change direction of snake //
    this.changeDir = function (x, y) {
        this.xMove = floor(x * movementVar);
        this.yMove = floor(y * movementVar);
    };

    // Updates snake location based on movement //
    this.update = function (){
        for (i = this.xPos.length - 1; i > 0; i--) {
            this.xPos[i] = this.xPos[i - 1];
            this.yPos[i] = this.yPos[i - 1];
        }
        this.xPos[0] = constrain(this.xPos[0] + this.xMove, -10, 850);
        this.yPos[0] = constrain(this.yPos[0] + this.yMove, -10, 850);
    };

    // Snake Death
    this.death = function() {
        // Death for hitting boundary of cboard
        if (this.xPos[0] < 0 || this.yPos[0] < 0 || this.xPos[0] > 840 || this.yPos[0] > 840) {
            print('ded');
            this.xPos= [10];
            this.yPos = [10];
        // Death for hitting self
        } else for (i = 1; i < this.xPos.length; i++) {
            if (this.xPos[0] === this.xPos[i] && this.yPos[0] === this.yPos[i]) {
                print('ded');
                this.xPos = [10];
                this.yPos = [10];
            }
        }

    };

    // Increases snake length --- after eating food //
    this.powerup = function() {
        if (this.xMove > 0) {                                       // Snake is moving right so add new box to left
            this.xPos.push(this.xPos[this.xPos.length - 1] - 10);
            this.yPos.push(this.yPos[this.yPos.length - 1]);
        } else if (this.xMove < 0) {                                // Snake is moving left so add new box to right
            this.xPos.push(this.xPos[this.xPos.length - 1] + 10);
            this.yPos.push(this.yPos[this.yPos.length -1]);
        } else if (this.yMove < 0) {                                // Snake is moving up so add new box to bottom
            this.xPos.push(this.xPos[this.xPos.length - 1]);
            this.yPos.push(this.yPos[this.yPos.length -1] + 10);
        } else if (this.yMove > 0) {                                // Snake is moving down so add new box to top
            this.xPos.push(this.xPos[this.xPos.length - 1]);
            this.yPos.push(this.yPos[this.yPos.length -1] - 10);
        }
    };


    this.appear = function () {
        for (i = 0; i < this.xPos.length; i++) {
            fill('#ffffff');
            rect(this.xPos[i], this.yPos[i], 10, 10);
        }
    };
}

/* Food Object */
function snakeSnacks() {

    this.x = floor(random(0, 84)) * movementVar;
    this.y = floor(random(0, 84)) * movementVar;

    this.delete = function() {
        this.x = floor(random(0, 84)) * movementVar;
        this.y = floor(random(0, 84)) * movementVar;
    }
}

/* Input commands */
function keyPressed() {
    // snake.x/y condition prevents snake from turning back on itself //
    if (sneky.xMove <= 0 && keyCode === LEFT_ARROW || key === 'A') {
        return sneky.changeDir(-1, 0);
    }
    else if (sneky.xMove >= 0 && keyCode === RIGHT_ARROW || key === 'D') {
        return sneky.changeDir(1, 0);
    }
    else if (sneky.yMove <= 0 && keyCode === UP_ARROW || key === 'W' && sneky.yMove <= 0) {
        return sneky.changeDir(0, -1);
    }
    else if (sneky.yMove >= 0 && keyCode === DOWN_ARROW || key === 'S' && sneky.yMove >= 0) {
        return sneky.changeDir(0, 1);
    }
}