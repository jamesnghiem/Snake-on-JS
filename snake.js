var sneky;
var foodie1;
var foodie2;
var foodie3;
var movementVar = 10;
var nom = new Audio('assets/nom.mp3');
var theme = new Audio('assets/snake_theme.mp3');

theme.volume = 0.3;

function setup() {
    frameRate(20);
    createCanvas(850, 850);
    // Initiate Snake + food //
    sneky = new snake();
    foodie1 = new snakeSnacks();
    foodie2 = new snakeSnacks();
    foodie3 = new snakeSnacks();
    theme.play()
}

function draw() {
    background('#222222');
    sneky.update();
    sneky.appear();
    sneky.death();
    nomnomnom(sneky, foodie1);
    nomnomnom(sneky, foodie2);
    nomnomnom(sneky, foodie3);
    fill(getRandomColor());
    rect(foodie1.x, foodie1.y, 10, 10);
    rect(foodie2.x, foodie2.y, 10, 10);
    rect(foodie3.x, foodie3.y, 10, 10);
}

function nomnomnom(snake, food) {
    if (snake.xPos[0] === food.x && snake.yPos[0] === food.y) {
        food.delete();
        snake.powerup();
        nom.play();
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
};

/* Random color generator for food */
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}