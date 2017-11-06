//Variables to remove Magic Numbers
var CANVAS_WIDTH = 1010;
var CANVAS_TOP = 30;
var CANVAS_HEIGHT = 140;
var CANVAS_BOTTOM = 383;
var CANVAS_RIGHT = 950;
var CANVAS_LEFT = -30;
var PLAYER_SPEED = 35;
var ENEMYPATH_TOP = 184;
var ENEMYPATH_BOTTOM = 40;
var TOP_ENEMY_SPEED = 350;

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    this.sprite = "arcade-images/enemy-zombie.png";
    //collision
    this.width = 30;
    this.height = 20;
};

var Sprite = function() {
    if (enemy.speed >= 300)
        sprite = "arcade-images/enemy-zombie.png"
    if (enemy.speed <= 300)
        sprite = "arcade-images/enemy-bug.png"
}


// Update the enemys position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.updatePosition(dt);
};

// make enemies loop to left side of canvas after reaching canvas.width
Enemy.prototype.updatePosition = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for all computers.
    this.x += this.speed * dt;

    // make enemies loop to left side of canvas after reaching canvas.width
    if (this.x >= CANVAS_WIDTH) {
        this.x = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = "arcade-images/char-scott.png";
    //collision
    this.width = 30;
    this.height = 80;

};


// Now instantiate your objects.
// Place the player object in a variable called player

Player.prototype.update = function() {

    //detect collision on canvas border
    borderCollision(this);

    //detect collision on enemies
    detectCollision(this);

    //Level Up Collision
    LevelUp(this);
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    displayLifeLevel(life, gameLevel);
};


//KeyPress Function

Player.prototype.handleInput = function(keyPress) {
    if (keyPress == "left") {
        player.x -= player.speed;
    }
    if (keyPress == "up") {
        player.y -= player.speed;
    }
    if (keyPress == "right") {
        player.x += player.speed;
    }
    if (keyPress == "down") {
        player.y += player.speed;
}
    console.log("keyPress is: " + keyPress);
};

//Arrow Button Functions

function UpArrow() {
        player.y -= player.speed;
    }
function LeftArrow() {
        player.x -= player.speed;
    }
function RightArrow() {
        player.x += player.speed;
    }
function DownArrow() {
        player.y += player.speed;
}


// Function to display player"s Life
var displayLifeLevel = function() {
    var canvas = document.getElementsByTagName("canvas");
    LifeLevelDiv.setAttribute('class', 'lifelevel');
    // add player Life and level to div element created
    LifeLevelDiv.innerHTML = "Life: " + life +
        " | " + "Level: " + gameLevel;
    document.body.appendChild(LifeLevelDiv);
};

// check if player runs into left, bottom, or right canvas walls
// prevent player from moving beyond canvas wall boundaries

var borderCollision = function() {

    if (player.y > CANVAS_BOTTOM) {
        player.y = CANVAS_BOTTOM;
    }
    if (player.x > CANVAS_RIGHT) {
        player.x = CANVAS_RIGHT;
    }
    if (player.x < CANVAS_LEFT) {
        player.x = CANVAS_LEFT;
    }
};

// check for collision between enemy and player

var detectCollision = function() {
    allEnemies.forEach(function(enemy) {
        if (player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.height + player.y > enemy.y) {

            console.log("collided");
            player.x = (CANVAS_WIDTH / 2);
            player.y = CANVAS_BOTTOM;
            life -= 1
        }
    });
};

// check for player reaching top of canvas and winning the game
// if player wins, add 1 to the Life and level

var LevelUp = function() {

    if (player.y + CANVAS_TOP <= 0) {

        player.x = (CANVAS_WIDTH / 2);
        player.y = CANVAS_BOTTOM;
        console.log("Level Completed!");

        gameLevel += 1;

        console.log("Level: " + gameLevel);
       
        //Increase number of enemies based on player"s level   
        increaseDifficulty(gameLevel);

    }
};

// Pass Life as an argument to the increaseDifficulty function
// Increase number of enemies based on player"s level
var increaseDifficulty = function(numEnemies) {
    // remove all previous enemies on canvas
    allEnemies.length = 0;

    // load new set of enemies
    for (var i = 1; i <= numEnemies; i++) {
        var enemy = new Enemy(Math.random() * (CANVAS_LEFT + 700), Math.random() * (ENEMYPATH_TOP + ENEMYPATH_BOTTOM), Math.random() * (350 - 50 + 1) + 50);

        allEnemies.push(enemy);
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// Enemy randomly placed vertically within section of canvas
// Declare new Life and gameLevel variables to store Life and level
var allEnemies = [];
var player = new Player((CANVAS_WIDTH / 2), CANVAS_BOTTOM, PLAYER_SPEED);
var life = 1;
var gameLevel = 1;
var LifeLevelDiv = document.createElement("div");
var enemy = new Enemy(Math.random() * (CANVAS_LEFT + 700), Math.random() * (ENEMYPATH_TOP + ENEMYPATH_BOTTOM), Math.random() * (350 - 50 + 1) + 50);

allEnemies.push(enemy);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don"t need to modify this.
document.addEventListener("keyup", function(e) {
    var allowedKeys = {
        37: "left",
        38: "up",
        39: "right",
        40: "down",
        16: "shift"
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

